import React from 'react'
import {View,TouchableOpacity,StyleSheet,Text,Animated,FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import {useDispatch,useSelector} from 'react-redux'

import { changeZoomValue, setDepthFocus, setExposure, setWb } from '../redux/actions/status'
import { WB } from '../assets/constants/constant' 
import Slider from '@react-native-community/slider';
import VideoCaptureComponent from './videoCaptureComponent'

const MAXPANELHEIGHT = 70

const actionButtons = (props) => {
    let animHeight = React.useRef(new Animated.Value(toggled ? MAXPANELHEIGHT : 0)).current
    const [toggled , setToggled] = React.useState(false)
    const [sliderType , setSliderType] = React.useState('hidden') // It can be hidden, focus depth , exposure
    const dispatch = useDispatch()
    const exposure = useSelector(state => state.status.exposure)
    const wb = useSelector(state => state.status.wb)

    const changeZoomValueFunc = (value) => {
        dispatch(changeZoomValue(value))
    }
    const toggleAdjustPanel = () => {
        if (!toggled){
            Animated.spring(
                animHeight,
                {
                    toValue: MAXPANELHEIGHT,
                    duration: 1000,
                    useNativeDriver: false
                }
            ).start();
            setToggled(true)
        }
        else{
            Animated.timing(
                animHeight,
                {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: false
                }
            ).start();
            setToggled(false)
        }
        
    }
    const buttonRotate = animHeight.interpolate({
        inputRange: [0, 60],
        outputRange: ['0deg', '180deg'],
        extrapolate: 'clamp',
    });
    const setFocusDepthFunc = (value) => {
        dispatch(setDepthFocus(value))
    }
    const setExposureFunc = (value) => {
        dispatch(setExposure(value))
    }
    const setWbFunc = (value,index) => {
        dispatch(setWb(value,index))
    }
    return (
        <View style={{ width: '100%',alignItems:'center', justifyContent: 'center' ,backgroundColor:'rgba(0,0,0,0.5)'}}>
            <SliderRender
                sliderType={sliderType}
                exposure={exposure} 
                setFocusDepthFunc={setFocusDepthFunc}
                setExposureFunc={setExposureFunc} 
                setWbFunc={setWbFunc}
                wb={wb}
            />
            <View style={{backgroundColor:'white',bottom:100}}>
            </View>
                    <Animated.View style={[styles.adjustButtonMainContainer , {height:animHeight}]}>
                <PanelRender sliderType={sliderType}  setSliderType={setSliderType} />
                    </Animated.View> 
            <Animated.View style={{ top: 5, transform: [{ rotate: buttonRotate }] }}>
                <TouchableOpacity  onPress={() => toggleAdjustPanel()}>
                    <Icon2 name='arrow-up-drop-circle' size={35} color='white' />
                </TouchableOpacity>
            </Animated.View>
            
            <View style={{flexDirection:'row' , alignItems:'center' }}>
                <Text style={{ color: 'white', fontSize: 19 }}>-</Text>
                <Slider
                    style={{ width: '60%', height: 70 }}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="white"
                    onValueChange={(value) => changeZoomValueFunc(value)}
                />
                <Text style={{color:'white' , fontSize:19}}>+</Text>
            </View>
            <View style={{flexDirection:'row' , justifyContent:'space-between',alignItems:'center',width:'90%',marginBottom:20}}>
                <VideoCaptureComponent  onPressStartVideo = {props.onPressStartVideo} onPressStopVideo = {props.onPressStopVideo}/>

                <TouchableOpacity onPress={() => props.onPressCapture()} style={[styles.capture , {width:80,height:80}]}>
                    <Icon name='camera' size={25} color='white' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.onPressChange()} style={styles.capture}>
                    <Icon1 name='exchange' size={25} color='white' />
                </TouchableOpacity>

            </View>
         </View>
    )


}
//function
const chooseSlider = (type, sliderType, setSliderType) => {
    if (type === 'focusDepth'){
        if (sliderType === 'focusDepth'){
            setSliderType('hidden')
        }
        else{
            setSliderType('focusDepth')
        }
    }

    if (type === 'exposure') {
        if (sliderType === 'exposure') {
            setSliderType('hidden')
        }
        else {
            setSliderType('exposure')
        }
    }

    if (type === 'whiteBalance') {
        if (sliderType === 'whiteBalance') {
            setSliderType('hidden')
        }
        else {
            setSliderType('whiteBalance')
        }
    }

}
// component
const PanelRender = ({sliderType,setSliderType}) => {
    return(
        <>
            <TouchableOpacity activeOpacity={1} style={styles.adjustButtonItemContainer} onPress={() => chooseSlider('focusDepth', sliderType, setSliderType)}>
                <Text style={{ color: sliderType === 'focusDepth' ? '#7AD7F0'  : 'white' , fontWeight:'bold'  }}>Focus Depth</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={styles.adjustButtonItemContainer} onPress={() => chooseSlider('exposure', sliderType, setSliderType)}>
                <Text style={{ color: sliderType === 'exposure' ? '#7AD7F0' : 'white', fontWeight: 'bold' }}>Exposure</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={styles.adjustButtonItemContainer} onPress={() => chooseSlider('whiteBalance', sliderType, setSliderType)}>
                <Text style={{ color: sliderType === 'whiteBalance' ? '#7AD7F0' : 'white', fontWeight: 'bold' }}>White Balance</Text>
            </TouchableOpacity>
        </>
    )
}
const SliderRender = ({
    sliderType, 
    exposure,
    setFocusDepthFunc, 
    setExposureFunc, 
    setWbFunc,
    wb
    }) => {
    return (
        <>
            {sliderType === 'hidden' && (null)}
            {sliderType === 'focusDepth' && (
            <View style={styles.sliderContainer}>
                    <Text style={{ color: 'white', fontSize: 15 }}>(0)</Text>
                    <Slider
                        style={{ width: '80%' , left:'10%' }}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="white"
                        onValueChange={(value) => { setFocusDepthFunc(value)}}
                    />
                    <Text style={{ color: 'white', fontSize: 15 }}>(1)</Text>
            </View>
            )}
            {sliderType === 'exposure' && (
                <View style={[styles.sliderContainer]}>
                    <TouchableOpacity onPress={() => setExposureFunc(-1) }>
                        <Text style={{ color: exposure === -1 ? '#7AD7F0' : 'white' ,marginRight:'2%'}}>Auto</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 15 }}>(0)</Text>
                    <Slider
                        style={{ width: '70%', left: '15%' }}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="white"
                        onValueChange={(value) => { setExposureFunc(value) }}
                    />
                    <Text style={{ color: 'white', fontSize: 15 }}>(1)</Text>
                </View>
            )}
            {sliderType === 'whiteBalance' && (
                <View style={[styles.sliderContainer]}>
                    <FlatList
                        ref={ref => {
                            flatListRef = ref;  
                        }}
                    horizontal
                    data={WB}
                    keyExtractor = {(item) =>  item}
                    renderItem = {({item,index}) => {
                        const FlatListOnPressFunc = ({index}) => {
                            flatListRef.scrollToIndex({ index: index, viewPosition : '0.5'})
                            setWbFunc(item,index)
                        } 
                        return(
                            <TouchableOpacity activeOpacity = {1} style={styles.wbItemContainer} onPress={() => FlatListOnPressFunc({index})}>
                                <Text style={{ color: index === wb.index ? '#7AD7F0' : 'white' }} numberOfLines={1}>{item}</Text>
                            </TouchableOpacity>
                        )
                    }}
                    />
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    capture: {
        flex: 0,
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 10,
        alignSelf: 'center',
        width: 70,
        height:70,
        backgroundColor : 'rgba(0,0,0,0.4)',
        borderRadius: 80,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        borderWidth: 0.5,
        borderColor:'white'
    },
    adjustButtonMainContainer: {
        width: '100%',
        height : 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderTopWidth: 0.5,
        borderTopColor: 'rgba(255,255,255,.5)',
        borderBottomWidth: 0.5,
        borderBottomColor:  'rgba(255,255,255,.5)',
        flexDirection:'row'
    },
    adjustButtonItemContainer : {
        flex:1,
        borderRightWidth:0.2,
        borderRightColor : 'rgba(255,255,255,.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliderContainer: {
        width: '100%', 
        height: 60,
        backgroundColor: 'black',
        borderTopWidth: 0.5,
        borderTopColor: 'rgba(255,255,255,.5)',
        justifyContent:'center',
        alignItems: 'center',
        flexDirection:'row',
    },
    wbItemContainer : {
        width: 100,
        height:'100%',
        // borderWidth: 5,
        // borderColor: 'white',
        overflow: 'scroll',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default actionButtons