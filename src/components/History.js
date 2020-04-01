import React from 'react'
import { View, Text, Image, Dimensions } from 'react-native'

var { width, height } = Dimensions.get('window')

const History = () => {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 10
        }}>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                width: width - 10,
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'gray'
            }} >
                <View style={{
                    backgroundColor: 'blue',
                    height: 20,
                    width: 20,
                    borderRadius: 25,
                    marginHorizontal: 20
                }} ></View>
                <View style={{
                    // backgroundColor: 'blue'
                }} >
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold"
                    }} >Service</Text>
                    <View style={{ flexDirection: "row" }} >
                        <Text style={{
                            marginRight: 10
                        }} >Harga</Text>
                        <Text>Status</Text>
                    </View>
                    <Text>Waktu</Text>
                </View>
            </View>
        </View>
    )
}

export default History