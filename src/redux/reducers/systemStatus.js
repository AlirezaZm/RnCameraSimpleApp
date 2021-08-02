const intialState = {
    flashType: 'auto',
    zoomValue : 0,
    autoFocus : 'on',
    pointOfInterest : {},
    detectedFaces : [],
    enableFaceDetection : false,
    focusDepth : 0 , 
    exposure : -1,
    wb : {},
}

export default (state = intialState, action) => {

    switch (action.type) {
        case 'CHANGEFLASHMOE':
            return {
                ...state , 
                flashType : action.payload
            }
        case 'CHANGEZOOMVALUE':
            return {
                ...state,
                zoomValue : action.payload
            }
        case 'SETPOINTOFINTEREST':
            console.log('gjrgnkl')
            return {
                ...state , 
                pointOfInterest : action.payload,
                autoFocus: 'off'
            }
        case 'TOGGLEFOCUSMODE':
            return {
                ...state , 
                autoFocus : 'on',
                focusDepth:0
            }
        case 'SETDETECTEDFACE':
            return {
                ...state,
                detectedFaces : action.payload
            }
        case 'TOGGLEFACEDETECTION':
            if (state.enableFaceDetection){
                return {
                    ...state,
                    enableFaceDetection: false,
                    detectedFaces: []

                }
            }
            else{
                return {
                    ...state,
                    enableFaceDetection: true,
                    
                }
            }
        case 'SETFOCUSDEPTH':
            return {
                ...state , 
                autoFocus : 'off',
                focusDepth : action.payload
            }
        case 'SETEXPOSURE':
            return {
                ...state,
                exposure : action.payload
            }
        case 'SETWB':
            console.log(action.payload)
            return {
                ...state,
                wb : action.payload
            }
    }
    return state

}