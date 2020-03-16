import React from 'react'
import { View, Text, Image, Dimensions, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

var { width, height } = Dimensions.get("window")

const Register = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
            <Image source={require('../assets/images/sepatu_vans.png')} style={{ width: 150, height: 150, marginBottom: 20, resizeMode: "contain" }} />
            <Text style={styles.registerTitle} >Register</Text>
            <View style={{ position: "relative" }} >
                <Icon name="user-alt" size={30} style={{ position: "absolute", top: 10 }} />
                <TextInput placeholder="Username" style={styles.inputUsername} />
            </View>
            <View style={{ position: "relative" }} >
                <Icon name="envelope" size={30} style={{ position: "absolute", top: 10 }} />
                <TextInput placeholder="Email" style={styles.inputEmail} />
            </View>
            <View style={{ position: "relative" }} >
                <Icon name="lock" size={30} style={{ position: "absolute", top: 10 }} />
                <TextInput placeholder="Password" secureTextEntry={true} style={styles.inputPassword} />
            </View>
            <TouchableOpacity>
                <View style={styles.registerBtn} elevation={2} >
                    <Text style={{ fontSize: 20, fontStyle: "italic", fontWeight: "bold" }} >Register</Text>
                </View>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", marginTop: 20 }} >
                <Text style={{ fontSize: 16 }} >Sudah punya akun? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('login')} >
                    <Text style={{ color: 'dodgerblue', fontSize: 16 }} >Login Disini.</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    registerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20
    },
    inputUsername: {
        width: width - 30,
        textAlign: "center",
        borderBottomWidth: 1,
        fontSize: 20,
        marginBottom: 20
    },
    inputPassword: {
        width: width - 30,
        textAlign: "center",
        borderBottomWidth: 1,
        fontSize: 20,
        marginBottom: 20
    },
    inputEmail: {
        width: width - 30,
        textAlign: "center",
        borderBottomWidth: 1,
        fontSize: 20,
        marginBottom: 20
    },
    registerBtn: {
        backgroundColor: "#D9F2FA",
        height: 40,
        width: 140,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 60,
        borderRadius: 90
    }
})

export default Register