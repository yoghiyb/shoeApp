import React, { useEffect } from 'react'
import { View, Text, Image, Dimensions, ActivityIndicator } from 'react-native'

var { width, height } = Dimensions.get('window')

const SplashScreen = () => {

    useEffect(() => {
        console.log('didmount')
    }, [])
    return (
        <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: "center" }} >
            <Image source={require('../assets/images/sepatu_vans.png')} style={{ width: width - 10, height: height / 2 }} />
            <View style={{ flexDirection: "row", alignItems: "center" }} >
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ fontSize: 20 }} >Loading...</Text>
            </View>
        </View>
    )
}

export default SplashScreen;