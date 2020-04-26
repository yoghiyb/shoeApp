import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity, TextInput, StyleSheet, Alert, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { AuthContext } from '../settings/Routes'
import axios from 'axios'

var { width, height } = Dimensions.get("window")

const Order = ({ navigation, route }) => {
    const [state, { signOut }, baseUrl] = useContext(AuthContext)
    const [count, setCount] = useState(1)
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState(null)
    const [phone, setPhone] = useState(null)

    const { item, store_name } = route.params

    let headers = {
        'Authorization': `Bearer ${state.userToken}`
    }

    useEffect(() => {
        setCount(1)
        setPrice(item.price)
    }, [])

    const countPrice = (condition) => {
        if (condition == 'min') {
            if (count > 1) {
                setCount(count => count - 1)
                setPrice(price => price - item.price)
            }
        } else {

            setCount(count => count + 1)
            setPrice(price => price + item.price)
        }
    }

    const sendOrder = async () => {
        let body = {
            user_id: state.user.id,
            partner_id: item.partner_id,
            service_id: item.id,
            name,
            address,
            description: desc,
            amount: count,
            phone_number: phone,
            price,
            status: 'Belum dikonfirmasi'
        }

        if (name == '' || address == '' || desc == '' || count == '' || phone == null || phone == '') {
            Alert.alert('Harap isi semua form pemesanan')
        } else {
            console.log(body)
            let endpoint = `${baseUrl}/order`
            let response = await axios.post(endpoint, body, { headers })

            console.log(response)
            if (response.data?.status == "Token is Expired") {
                Alert.alert('', 'Sesi anda telah berakhir silahkan login kembali', [
                    { text: 'Login', onPress: () => signOut() }
                ])
            }
            if (response.data?.status == "berhasil membuat pesanan") {
                Alert.alert('Berhasil', `pesanan anda berhasil dibuat, Terima kasih sudah memesan di ${store_name}`, [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ])
            }
        }
    }

    // console.log(item)

    return (
        // <View style={{ flex: 1 }} >
        <ScrollView>
            <View style={{
                flex: 1,
                // justifyContent: "center",
                alignItems: "center",
            }} >
                {/* <Text>ORDER PAGE</Text> */}
                <Text style={{ fontSize: 24, fontWeight: "bold" }} >{store_name}</Text>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 50, color: 'gray' }} >{item.service}</Text>
                {/* <Image source={require('../assets/images/sepatu_vans.png')} style={{ height: 150, width: 150, resizeMode: "contain" }} /> */}
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
                    <Text style={{ fontSize: 16, alignSelf: 'flex-start' }} >No. Tlp : </Text>
                    <TextInput placeholder="Nomor Telepon" keyboardType={"phone-pad"} style={styles.inputAlamat} onChangeText={phone => setPhone(phone)} />
                </View>
                <View style={{ alignSelf: 'flex-start', marginHorizontal: 10, justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ fontSize: 16, alignSelf: 'flex-start' }} >Keterangan: </Text>
                    <TextInput placeholder="Keterangan" style={styles.inputKeterangan} multiline={true} numberOfLines={2} onChangeText={text => setDesc(text)} />
                </View>
                <View style={{ flexDirection: "row", marginHorizontal: 10, justifyContent: "center", alignItems: "center", marginTop: 20 }} >
                    {/* <Text style={{ fontSize: 16 }} >Jumlah : </Text> */}
                    <TouchableOpacity onPress={() => {
                        countPrice('min')
                    }} >
                        <View style={styles.decrementBtn} >
                            <Icon name="minus" size={20} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.inputJumlah} >{count}</Text>
                    {/* <TextInput placeholder="0" style={styles.inputJumlah} keyboardType={'numeric'} value={count} /> */}
                    <TouchableOpacity onPress={() => {
                        countPrice('plus')
                    }}>
                        <View style={styles.incrementBtn} >
                            <Icon name="plus" size={20} />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 12, marginLeft: 5 }} >{item.unit}</Text>
                <View style={{ flexDirection: "row" }} >
                    <Text style={{ fontSize: 16, fontWeight: "bold" }} >Total : </Text>
                    <Text>Rp. {price}</Text>
                </View>
                <TouchableOpacity onPress={sendOrder} style={{ marginBottom: 20 }} >
                    <View style={styles.pesanBtn} elevation={3} >
                        <Text style={{ fontSize: 20, fontStyle: "italic", fontWeight: "bold" }} >PESAN</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
        // </View>
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