import {Dimensions} from 'react-native'

export const changeFlashMode = (mode) => {
    console.log('change')
    return ({
        type:'CHANGEFLASHMOE',
        payload : mode
    })
}


export const changeZoomValue = (zoomValue) => {
    return({
        type:'CHANGEZOOMVALUE',
        payload : zoomValue
    })
}

export const setPointOfInterest = (coordinate) => {
    const { width, height } = Dimensions.get('window')
    let x = coordinate.x / width
    let y = coordinate.y / height

    const pointOfInterest = {
        normalizedPoints : {
            x , y
        },
        rectPosition : {
            x : coordinate.x,
            y : coordinate.y
        }
    }
    return ({
        type: 'SETPOINTOFINTEREST',
        payload: pointOfInterest
    })
}

export const toggleFocusMode = () => {
    return({
        type:'TOGGLEFOCUSMODE'
    })
}


export const setDetectedFace = (faces) => {
    return({
        type: 'SETDETECTEDFACE',
        payload : faces
    })
}

export const toggleFaceDetection = () => {
    return({
        type : 'TOGGLEFACEDETECTION'
    })
}


export const setDepthFocus = (value) => {
    return({
        type: 'SETFOCUSDEPTH',
        payload : value
    })
}

export const setExposure = (value) => {
    return({
        type: 'SETEXPOSURE',
        payload : value
    })
}

export const setWb = (value,index) => {
    console.log(index)
    return({
        type:'SETWB',
        payload : {value,index}
    })
}
