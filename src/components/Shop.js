import React from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

var { width, height } = Dimensions.get("window")

const Shop = () => {
    return (
        <View style={{ flex: 1 }} >
            <View style={{
                width: width,
                height: height / 3,
                position: 'relative',
                marginBottom: 15
            }} >
                <Image style={{
                    backgroundColor: 'gray',
                    width: width,
                    height: height / 3,

                }} />
                <View style={{
                    position: 'absolute',
                    top: 10,
                    alignSelf: 'center',
                    backgroundColor: 'blue',
                    height: 50,
                    width: 50
                }} >
                </View>

            </View>
            <TouchableOpacity>
                <View style={{
                    backgroundColor: 'white',
                    height: 50,
                    width: width,
                    alignItems: "center",
                    justifyContent: 'center',
                    flexDirection: "row"
                }} >
                    <Feather name="plus-circle" size={30} color={'blue'} />
                    <Text style={{ marginLeft: 10 }} >Add Service</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Shop