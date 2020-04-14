import React, { useContext } from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
import { AuthContext } from '../settings/Routes'
import Entypo from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'

var { width, height } = Dimensions.get('window')

const IMAGE_PROFILE = 100

const User = ({ navigation }) => {
    const [state, { signOut }] = useContext(AuthContext);
    console.log(state)
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
                <TouchableOpacity>
                    <Text style={{ color: 'blue' }} >Edit</Text>
                </TouchableOpacity>
                <Text style={{
                    color: 'gray',
                    marginTop: 20
                }} >yoghiyb@gmail.com</Text>
            </View>
            {state.isMitra &&
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
            }
            <TouchableOpacity
                style={{
                    width: width,
                    height: 50,
                    backgroundColor: 'white',
                    borderBottomWidth: 1,
                    borderBottomColor: 'gray',
                    paddingHorizontal: 15,
                    flexDirection: "row",
                    alignItems: 'center',
                }}
                onPress={() => signOut()} >
                <Octicons name="sign-out" size={30} color={"dodgerblue"} />
                <Text style={{ marginLeft: 10 }} >Keluar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default User