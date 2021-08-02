import React from 'react'
import {View , TouchableOpacity, StyleSheet} from 'react-native'


const videoCaptureComponent = (props) => {
    const [videoStatus , setVideoStatus] = React.useState('stop')
    const onPressFunc = () =>  {
        if (videoStatus === 'stop'){
            props.onPressStartVideo()
            setVideoStatus('recording')
        }
        else if (videoStatus === 'recording'){
            props.onPressStopVideo()
            setVideoStatus('stop')
        }
    }
    return(
        <View style={styles.container}>
            <TouchableOpacity style={videoStatus === 'stop' ? styles.subContainerStopType : styles.subContainerStartType} onPress={() => {onPressFunc()}}></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        width:70,
        height: 70,
        backgroundColor: 'black',
        borderColor:'white',
        borderWidth: 3,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subContainerStopType: {
        width:'92%',
        height : '92%',
        backgroundColor : 'red',
        borderRadius: 40
    },
    subContainerStartType:{
        width: '50%',
        height: '50%',
        backgroundColor: 'red',
    }
})

export default videoCaptureComponent