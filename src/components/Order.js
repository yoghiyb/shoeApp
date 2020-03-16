import React, { useState } from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

var { width, height } = Dimensions.get("window")

const Order = ({ navigation, route }) => {
    const [count, setCount] = useState(1)
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [desc, setDesc] = useState('')

    const { item } = route.params

    console.log(item)

    const sendOrder = () => {
        let model = { name, address, desc, amount: count }

        if (name == '' || address == '' || desc == '' || count == '') {
            Alert.alert('Harap isi semua form pemesanan')
        } else {
            console.log(model)
        }
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: "row" }}  >
                    <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('home')} >
                        <Icon name="info-circle" size={26} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('map', { location: item.location })} >
                        <Icon name="map-marked-alt" size={26} />
                    </TouchableOpacity>
                </View>
            )
        })
    })

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
            {/* <Text>ORDER PAGE</Text> */}
            <Text style={{ fontSize: 24, fontWeight: "bold" }} >{item.name}</Text>
            <Image source={require('../assets/images/sepatu_vans.png')} style={{ height: 150, width: 150, resizeMode: "contain" }} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'flex-start', marginHorizontal: 10 }} >FORM PEMESANAN</Text>
            <View style={{ alignSelf: 'flex-start', marginHorizontal: 10, justifyContent: "center", alignItems: "center" }} >
                <Text style={{ fontSize: 16, alignSelf: 'flex-start' }} >Nama : </Text>
                <TextInput placeholder="Nama Lengkap" style={styles.inputNama} onChangeText={text => setName(text)} />
            </View>
            <View style={{ alignSelf: 'flex-start', marginHorizontal: 10, justifyContent: "center", alignItems: "center" }} >
                <Text style={{ fontSize: 16, alignSelf: 'flex-start' }} >Alamat : </Text>
                <TextInput placeholder="Alamat" style={styles.inputAlamat} onChangeText={text => setAddress(text)} />
            </View>
            <View style={{ alignSelf: 'flex-start', marginHorizontal: 10, justifyContent: "center", alignItems: "center" }} >
                <Text style={{ fontSize: 16, alignSelf: 'flex-start' }} >Keterangan: </Text>
                <TextInput placeholder="Keterangan" style={styles.inputKeterangan} multiline={true} numberOfLines={2} onChangeText={text => setDesc(text)} />
            </View>
            <View style={{ flexDirection: "row", marginHorizontal: 10, justifyContent: "center", alignItems: "center", marginTop: 20 }} >
                {/* <Text style={{ fontSize: 16 }} >Jumlah : </Text> */}
                <TouchableOpacity onPress={() => setCount(current => current > 1 ? current - 1 : 1)} >
                    <View style={styles.decrementBtn} >
                        <Icon name="minus" size={20} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.inputJumlah} >{count}</Text>
                {/* <TextInput placeholder="0" style={styles.inputJumlah} keyboardType={'numeric'} value={count} /> */}
                <TouchableOpacity onPress={() => setCount(current => current + 1)}>
                    <View style={styles.incrementBtn} >
                        <Icon name="plus" size={20} />
                    </View>
                </TouchableOpacity>
                <Text style={{ fontSize: 16, marginLeft: 5 }} >Pasang</Text>
            </View>
            <TouchableOpacity onPress={sendOrder} >
                <View style={styles.pesanBtn} elevation={3} >
                    <Text style={{ fontSize: 20, fontStyle: "italic", fontWeight: "bold" }} >PESAN</Text>
                </View>
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    inputNama: {
        width: width - 30,
        borderBottomWidth: 1,
        fontSize: 16
    },
    inputAlamat: {
        width: width - 30,
        borderBottomWidth: 1,
        fontSize: 16
    },
    inputKeterangan: {
        width: width - 30,
        borderBottomWidth: 1,
        fontSize: 16
    },
    inputJumlah: {
        textAlign: 'center',
        width: 40,
        // borderBottomWidth: 1,
        fontSize: 16
    },
    pesanBtn: {
        backgroundColor: "#D9F2FA",
        height: 40,
        width: 140,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        borderRadius: 90
    },
    decrementBtn: {
        backgroundColor: 'dodgerblue',
        height: 30,
        width: 30,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    incrementBtn: {
        backgroundColor: 'dodgerblue',
        height: 30,
        width: 30,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Order