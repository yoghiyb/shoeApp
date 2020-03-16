import React from 'react'
import { View, Text, Image, Dimensions } from 'react-native'

var { height, width } = Dimensions.get('window');

const HistoryTab = ({ navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'red' }} >
            <Text>HISTORY PAGE</Text>
        </View>
    )
}

export default HistoryTab