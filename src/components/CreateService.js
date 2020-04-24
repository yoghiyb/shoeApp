import React, { useState, useContext, useEffect } from 'react'
import { View, Image, Text, TextInput, Dimensions, Picker, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { AuthContext } from '../settings/Routes'
import { useNavigationState, CommonActions, StackActions } from '@react-navigation/native';
import axios from 'axios'

var { width, height } = Dimensions.get("window")

const WIDTH_CONTENT = width - 50
const serviceItem = [
    { id: 0, service: 'Pilih Jasa' },
    { id: 1, service: 'Service Sepatu' },
    { id: 2, service: 'Cuci Sepatu' },
    { id: 3, service: 'Jahit Sepatu' },
]

const CreateService = ({ navigation, route }) => {
    const { isEdit, item } = route.params
    const [state] = useContext(AuthContext)
    const [service, setService] = useState(null)
    const [unit, setUnit] = useState(null)
    const [price, setPrice] = useState(null)
    const [loading, setLoading] = useState(false)

    // const navState = useNavigationState(state => state);

    // console.log(navState)

    let headers = {
        'Authorization': `Bearer ${state.userToken}`
    }

    if (isEdit) {
        // console.log('EDIT MODE', item)
        useEffect(() => {
            setLoading(true)
            setService(item?.service)
            setUnit(item?.unit)
            setPrice(item?.price)
            setLoading(false)
        }, [])
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
            // console.log(body)
        } else {
            let endpoint
            let response

            if (isEdit) {
                endpoint = `http://192.168.0.76:80/Laravel/shoeApp/public/api/service/${item.id}`
                response = await axios.put(endpoint, body, { headers })
            }

            if (!isEdit) {
                endpoint = `http://192.168.0.76:80/Laravel/shoeApp/public/api/service`
                response = await axios.post(endpoint, body, { headers })
            }

            if (response?.data.status == 'Token is Expired') {
                Alert.alert('', 'Sesi anda telah berakhir, silahkan login kembali.')
            }

            if (response?.data == 'berhasil membuat jasa' || response?.data == 'berhasil update jasa') {
                Alert.alert('', response.data, [
                    {
                        text: 'Ok', onPress: () => navigation.goBack()
                    }
                ])
            }
        }
    }

    return (
        <View style={{
            flex: 1,
            marginTop: 20,
            alignItems: "center"
        }} >
            <Text style={{ fontSize: 20, marginBottom: 20 }} >Form Buat Jasa</Text>
            {
                loading ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />
                    :
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
                            value={isEdit && unit}
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
                            value={isEdit && price?.toString()}
                            placeholder="Masukkan harga disini"
                        />
                    </View>
            }
            {
                !loading &&
                <TouchableOpacity onPress={newService} >
                    <View style={{
                        backgroundColor: isEdit ? 'lightgreen' : '#D9F2FA',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 5,
                        elevation: 2
                    }} >
                        <Text style={{
                            fontSize: 24
                        }} >{isEdit ? 'Simpan' : 'Buat'}</Text>
                    </View>
                </TouchableOpacity>
            }
        </View>
    )
}

export default CreateService