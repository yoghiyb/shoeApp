import React, { useContext } from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
import { AuthContext } from '../settings/Routes'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

var { width, height } = Dimensions.get('window')

const IMAGE_PROFILE = 100

const User = ({ navigation }) => {
    const [state, { signOut }] = useContext(AuthContext);
    console.log(signOut)
    return (
        <View style={{ flex: 1 }} >
            <View style={{
                backgroundColor: 'white',
                height: height / 2,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 15
            }} >
                <Image style={{
                    height: IMAGE_PROFILE,
                    width: IMAGE_PROFILE,
                    backgroundColor: 'purple',
                    borderRadius: IMAGE_PROFILE
                }} />

            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('shop')}
                style={{
                    width: width,
                    height: 50,
                    backgroundColor: 'white',
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                    paddingHorizontal: 15,
                    flexDirection: "row",
                    alignItems: 'center'
                }} >
                <Entypo name="shop" size={30} color={"dodgerblue"} />
                <Text style={{ marginLeft: 10 }} >Setting Your Shop</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    width: width,
                    height: 50,
                    backgroundColor: 'white',
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                    paddingHorizontal: 15,
                    flexDirection: "row",
                    alignItems: 'center'
                }}
                onPress={() => signOut()} >
                <FontAwesome5 name="sign-out-alt" size={30} color={"dodgerblue"} />
                <Text style={{ marginLeft: 10 }} >Keluar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default User