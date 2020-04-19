import React, { useState, useContext } from 'react'
import { View, Image, Text, TextInput, Dimensions, Picker, TouchableOpacity, Alert } from 'react-native'
import { AuthContext } from '../settings/Routes'
import axios from 'axios'

var { width, height } = Dimensions.get("window")

const WIDTH_CONTENT = width - 50
const serviceItem = [
    { id: 0, service: 'Pilih Jasa' },
    { id: 1, service: 'Service Sepatu' },
    { id: 2, service: 'Cuci Sepatu' },
    { id: 3, service: 'Jahit Sepatu' },
]

const CreateService = ({ navigation, isEdit = false }) => {
    const [state] = useContext(AuthContext)
    const [service, setService] = useState(null)
    const [unit, setUnit] = useState(null)
    const [price, setPrice] = useState(null)

    let headers = {
        'Authorization': `Bearer ${state.userToken}`
    }

    const newService = async () => {
        let body = {
            'partner_id': state.user.id,
            'service': service,
            'unit': unit,
            'price': price
        }

        if (body.service == null || body.service == '' || body.unit == null || body.unit == '' || body.price == null || body.price == '') {
            if (body.service == 'Pilih Jasa') {
                Alert.alert('', 'Pilih jasa terlebih dahulu')
            } else {
                Alert.alert('', 'Semua form tidak boleh kosong!')
            }
            console.log(body)
        } else {
            let endpoint = `http://192.168.0.22:80/Laravel/shoeApp/public/api/service`
            let response = await axios.post(endpoint, body, { headers })

            if (response.data.status == 'Token is Expired') {
                Alert.alert('', 'Sesi anda telah berakhir, silahkan login kembali.')
            }
            if (response.data == 'berhasil membuat jasa') {
                Alert.alert('', response.data, [
                    { text: 'Ok', onPress: () => navigation.navigate('shop') }
                ])
            }
        }
    }

    const updateService = () => {

    }

    if (isEdit) {
        console.log('EDIT MODE')
    }

    return (
        <View style={{
            flex: 1,
            marginTop: 20,
            alignItems: "center"
        }} >
            <Text style={{ fontSize: 20, marginBottom: 20 }} >Form Buat Jasa</Text>
            <View style={{ width: WIDTH_CONTENT, marginBottom: 30 }} >
                <Text
                    style={{ fontSize: 20 }}
                >Jasa</Text>
                <Picker
                    selectedValue={service}
                    style={{
                        width: WIDTH_CONTENT,
                    }}
                    onValueChange={(val, index) => {
                        setService(val)
                    }}
                >
                    {
                        serviceItem.map((row, index) => (
                            <Picker.Item key={index} label={row.service} value={row.service} />
                        ))
                    }
                </Picker>
                <Text style={{ fontSize: 20 }} >Unit</Text>
                <TextInput
                    style={{
                        width: WIDTH_CONTENT,
                        fontSize: 16,
                        borderBottomColor: 'gray',
                        borderBottomWidth: 1
                    }}
                    onChangeText={text => setUnit(text)}
                    placeholder="(pasang)"
                />
                <Text style={{ fontSize: 20 }} >Harga</Text>
                <TextInput
                    style={{
                        width: WIDTH_CONTENT,
                        fontSize: 16,
                        borderBottomColor: 'gray',
                        borderBottomWidth: 1
                    }}
                    onChangeText={text => setPrice(text)}
                    placeholder="Masukkan harga disini"
                />
            </View>
            <TouchableOpacity onPress={newService} >
                <View style={{
                    backgroundColor: '#D9F2FA',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                    elevation: 2
                }} >
                    <Text style={{
                        fontSize: 24
                    }} >Buat</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default CreateService