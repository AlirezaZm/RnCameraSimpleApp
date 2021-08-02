import React from 'react'
import {View , StyleSheet, Text, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import { changeFlashMode, toggleFocusMode, toggleFaceDetection } from '../redux/actions/status'
import {useDispatch,useSelector} from 'react-redux'

const headerActions = () => {
    const dispatch  = useDispatch()
    const flashMode = useSelector(state => state.status.flashType)
    const afMode = useSelector(state => state.status.autoFocus)
    const enebleFaceDetection = useSelector(state => state.status.enableFaceDetection)

    const changeFlashModeFunc = () => {
        if (flashMode === 'auto'){
            dispatch(changeFlashMode('on'))
        }
        else if (flashMode === 'on'){
            dispatch(changeFlashMode('off'))

        }
        else if (flashMode === 'off') {
            dispatch(changeFlashMode('torch'))

        }
        else if (flashMode === 'torch') {
            dispatch(changeFlashMode('auto'))
        }
    }
    const toggleAutoFocusFunc = () => {
        dispatch(toggleFocusMode())
    }
    let color = 'grey'
    if (afMode === 'on'){
         color = 'grey'
    }
    else{
         color = 'white'
    }
    const toggleFaceDetectionFunc = () => {
        dispatch(toggleFaceDetection())
    }
    return (
        <View style = {styles.container}>
                <TouchableOpacity onPress={() => {changeFlashModeFunc()}} style={styles.actionsContainer} activeOpacity={1}>
                    <Icon name='flash' size={24} color='white' />
                    <Text style={styles.primaryText}> Flash mode</Text>
                    <Text style={styles.secondaryText}>{flashMode}</Text>
                </TouchableOpacity>

                <TouchableOpacity disabled = {afMode === 'on' ? true : false}  onPress={() => { toggleAutoFocusFunc() }} style={styles.actionsContainer} activeOpacity={1}>
                    <Icon1 name='image-filter-center-focus' size={24} color='white' />
                    <Text style={styles.primaryText}> Auto Focus</Text>
                    <Text style={[styles.secondaryText , {color:color} ]}>{afMode}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { toggleFaceDetectionFunc() }} style={[styles.actionsContainer , {width:120}]} activeOpacity={1}>
                <Icon1 name='face-recognition' size={24} color='white' />
                    <Text style={styles.primaryText}> Face detection</Text>
                <Text style={[styles.secondaryText]}>{enebleFaceDetection ? 'on' : 'off' }</Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        width : '90%',
        height : 90,
        backgroundColor: 'black',
        flexDirection : 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft:20,
        marginRight: 20,
    },
    actionsContainer: {
       
        width:100,
        height : 80,
        justifyContent:'flex-start',
        alignItems: 'center',
        padding : 2,
        // borderWidth:0.3,
        // borderColor:'rgba(255,255,255,0.5)',
    },
    primaryText: {
        fontSize: 16,
        color : 'white',
        fontWeight: 'bold',
        fontFamily: 'Roboto-LightItalic'
    },
    secondaryText : {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold'
    }
})

export default headerActions