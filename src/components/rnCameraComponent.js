'use strict';
import React, { PureComponent } from 'react';
import RNFS from 'react-native-fs'

import {StyleSheet, Text , View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ActionButtons from './actionButtons'
import HeaderActions from './headerActions'
import {connect} from 'react-redux'
import renderFaces from '../utils/renderFaces'


import { setPointOfInterest, changeFlashMode, setDetectedFace} from '../redux/actions/status'

const PendingView = () => (
    <View
        style={{
            flex: 1,
            backgroundColor: 'lightgreen',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Text>Waiting</Text>
    </View>
);



class rnCameraComponent extends PureComponent {
    constructor(){
        super()
        this.setAlert = this.setAlert.bind(this)
        this. alert = []
    }
        state = {
            cameraType : 'back',
            
        }
    facesDetected = (faces) => {
        this.props.setDetectedFace(faces)
    }

    setAlert = function (alertMessage) {
        this.alert = alertMessage
    }
    renderFaces = () => {
        if (this.props.status.detectedFaces.length !==0 ){
            const faces = this.props.status.detectedFaces
            return (
                < View style={{ position: 'absolute', width: '100%', height: '100%', top: 0, right: 0 }}>
                    {faces.map(face => renderFaces(face , this.setAlert))}
                </View>
            )
        }
       
    }

    getCameraId = async function (camera) {
        console.log(await camera.getAvailablePictureSizes())
    }
    
    render() {
        return (
            <View style={styles.container}>
                <HeaderActions />
                <RNCamera
                    ref = {ref => {
                        this.camera = ref
                    }}
                    style={styles.preview}
                    type={this.state.cameraType}
                    flashMode={this.props.status.flashType}
                    zoom = {this.props.status.zoomValue}
                    autoFocus= {this.props.status.autoFocus}
                    playSoundOnCapture = {true}
                    pictureSize="2560x1920"
                    focusDepth = {this.props.status.focusDepth}
                    exposure = {this.props.status.exposure}
                    whiteBalance = {this.props.status.wb.value}
                    faceDetectionClassifications={RNCamera.Constants.FaceDetection.Classifications.all}
                    // faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
                    onFacesDetected = {({faces}) => {
                        { this.props.status.enableFaceDetection ? this.facesDetected(faces) : null}
                    }}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onTap={(coordinate) => this.props.setPointOfInterest(coordinate) }
                    autoFocusPointOfInterest={this.props.status.pointOfInterest.normalizedPoints}
                    
                >
                    {({ camera, status, recordAudioPermissionStatus }) => {
                        if (status !== 'READY') return <PendingView />;
                        this.getCameraId(camera)

                        return (            
                            <>       
                                {this.props.status.enableFaceDetection && this.alert.map(al => {
                                    return (
                                        <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>{al}</Text>
                                    )
                                })}
                                <ActionButtons
                                onPressCapture = {() => this.takePicture(camera)}
                                onPressChange = {() => this.changeCamera()}
                                onPressStartVideo = {() => this.startVideo(camera)}
                                 onPressStopVideo={() => this.stopVideo(camera)}
                                />
                                    {this.renderFaces()}
                            </>
                        );
                    }}
                </RNCamera>
                

            </View>
        );
    }

    changeCamera = function () {
        if (this.state.cameraType === 'back'){
            this.setState({
                cameraType: 'front'
            })
        }
        else{
            this.setState({
                cameraType: 'back'
            })        
        }
    }
    
    takePicture = async function (camera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        const filePath = data.uri
        const newFilePath = RNFS.ExternalDirectoryPath + '/MytestPhoto.jpg'
        RNFS.moveFile(filePath, newFilePath).then(() => console.log('image transfered!')).catch(err => {
            console.log(err)
        })
    };
    startVideo = async function (camera) {
        const data = await camera.recordAsync()
       
        const filePath = data.uri
        const newFilePath = RNFS.ExternalDirectoryPath + '/MytestPhoto.mp4'
        RNFS.moveFile(filePath, newFilePath).then(() => console.log('image transfered!')).catch(err => {
            console.log(err)
        })
        console.log(data)
    }
    stopVideo = function (camera) {
        camera.stopRecording()

    }

}

   



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});

function mapStateToProps(state) {
    return {
        status : state.status,
    }
}

export default connect(mapStateToProps, {changeFlashMode, setPointOfInterest,setDetectedFace})(rnCameraComponent)