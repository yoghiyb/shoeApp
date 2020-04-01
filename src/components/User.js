import React, { useContext } from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
import { AuthContext } from '../settings/Routes'

var { width, height } = Dimensions.get('window')

const User = ({ navigation }) => {
    const { signOut } = useContext(AuthContext);
    return (
        <View>
            <Text>USER PAGE</Text>
            <TouchableOpacity onPress={() => signOut()} >
                <Text>Keluar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default User