import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Image, Dimensions, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import { AuthContext } from '../settings/Routes'

var { width, height } = Dimensions.get("window")

const Login = ({ navigation, route }) => {
    const [isMitra, handleIsMitra] = useState(false);
    const [email, handleEmail] = useState('');
    const [password, handlePassword] = useState('');

    // console.log(navigation, route, AuthContext)

    const [state, { signIn }] = useContext(AuthContext);

    return (
        <View style={{ flex: 1, alignItems: "center", alignContent: "center", justifyContent: 'center' }} >
            <TouchableOpacity style={{ top: 25, right: 30, position: "absolute", }} onPress={() => handleIsMitra(!isMitra)} >
                <View style={style.mitraBtn} elevation={2} >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }} >{!isMitra ? 'Mitra' : 'User'}</Text>
                </View>
            </TouchableOpacity>
            <Image source={require('../assets/images/sepatu_vans.png')} style={{ width: 150, height: 150, marginBottom: 20, resizeMode: "contain" }} />
            <Text style={{ marginBottom: 50, fontSize: 20, fontWeight: "bold" }} > Login {isMitra ? 'Mitra' : 'User'}</Text>
            <View style={{ position: "relative" }} >
                <Icon name="user-alt" size={30} style={{ position: "absolute", top: 10 }} />
                <TextInput placeholder="Email" style={style.inputUsername} onChangeText={text => handleEmail(text)} />
            </View>
            <View style={{ position: "relative" }} >
                <Icon name="lock" size={30} style={{ position: "absolute", top: 30 }} />
                <TextInput placeholder="Password" secureTextEntry={true} style={style.inputPassword} onChangeText={text => handlePassword(text)} />
            </View>
            <TouchableOpacity onPress={() => signIn({ email, password, isMitra })} >
                <View style={style.loginBtn} elevation={2} >
                    <Text style={{ fontSize: 20, fontStyle: "italic", fontWeight: "bold" }} >Login</Text>
                </View>
            </TouchableOpacity>
            {!isMitra &&
                <View style={{ flexDirection: "row", marginTop: 30 }} >
                    <Text style={{ fontSize: 16, }} >Belum punya akun? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('register')} >
                        <Text style={{ fontSize: 16, color: "dodgerblue" }} >Daftar Disini.</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const style = StyleSheet.create({
    inputUsername: {
        width: width - 30,
        textAlign: "center",
        borderBottomWidth: 1,
        fontSize: 20
    },
    inputPassword: {
        width: width - 30,
        textAlign: "center",
        borderBottomWidth: 1,
        marginTop: 20,
        fontSize: 20
    },
    loginBtn: {
        backgroundColor: "#D9F2FA",
        height: 40,
        width: 140,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 80,
        borderRadius: 90
    },
    mitraBtn: {
        backgroundColor: "#D9F2FA",
        height: 40,
        width: 140,
        borderRadius: width,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default Login