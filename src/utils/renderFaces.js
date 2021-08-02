import React from 'react'

import {Text , View , StyleSheet } from 'react-native'
import {connect} from 'react-redux'
import {setAlert} from '../redux/actions/status'

const renderFaces = ({ 
    bounds, 
    faceID,
    rollAngle, 
    yawAngle,
    rightEyeOpenProbability,
    leftEyeOpenProbability,
    smilingProbability,
    
    },setAlert) => {
        let alert = []
        if (smilingProbability <=0.3){
            alert.push('Please smile')
        }
        else if (rightEyeOpenProbability <= 0.6 && leftEyeOpenProbability <= 0.6){
            alert.push('Your left or right eyes seems to be closed')
        }
        else{
            alert = []
        }
        setAlert(alert)
        return(
            <View 
            key={faceID} 
            transform={[
                { perspective: 600 },
                { rotateZ: `${rollAngle.toFixed(0)}deg` },
                { rotateY: `${yawAngle.toFixed(0)}deg` },
            ]} 
            style = {[styles.face  , {...bounds.size , left:bounds.origin.x-30 , top:bounds.origin.y}]}
            >
                 <Text style={styles.faceText}>{faceID}</Text>
                </View>
            )
}

const styles = StyleSheet.create({
    face: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#FFD700',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    faceText: {
        color: '#FFD700',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'transparent',
    },
})


export default renderFaces