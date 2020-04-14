import React, { useState, useContext } from 'react'
import { View, Image, Text, Dimensions, TextInput, TouchableOpacity, Picker, Alert } from 'react-native'
import axios from 'axios'
import { AuthContext } from '../settings/Routes'

var { width, height } = Dimensions.get('window')

const WIDTH_CONTENT = width - 50

const Hours = ['', '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']

const Days = ['', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

const ShopSettings = ({ navigation }) => {
    const [state, { signOut }] = useContext(AuthContext);
    const [storeName, setStoreName] = useState('')
    const [storeAddress, setStoreAddress] = useState('')
    const [startWorkingHour, setStartWorkingHour] = useState(null)
    const [endWorkingHour, setEndWorkingHour] = useState(null)
    const [startWorkingDay, setStartWorkingDay] = useState(null)
    const [endWorkingDay, setEndWorkingDay] = useState(null)
    const [noTlp, setNoTlp] = useState(null)

    const buttonSave = async () => {
        let model = {
            'store_name': storeName,
            'address': storeAddress,
            'start_working_time': startWorkingHour,
            'end_working_time': endWorkingHour,
            'start_working_days': startWorkingDay,
            'end_working_days': endWorkingDay,
            'phone_number': noTlp,
        }

        let headers = {
            'Authorization': `Bearer ${state.userToken}`
        }

        console.log(headers)

        if (model.store_name == '' || model.start_working_time == '' || model.end_working_time == '' || model.address == '' || model.start_working_days == '' || model.end_working_days == '' || model.phone_number == null) {
            Alert.alert('', 'Semua filed tidak boleh kosong!')
        } else {
            model.store_name.trim()
            model.address.trim()
            model.phone_number.trim()

            let endpoint = `http://192.168.0.7:80/Laravel/shoeApp/public/api/partner/shop/${state.user.id}`
            let response = await axios.patch(endpoint, model, { headers })

            if (response.status == 200) {
                Alert.alert('', 'Data berhasil disimpan', [{ text: 'OK', onPress: () => navigation.navigate('shop') }])
            }

            console.log(response)
        }
    }

    return (
        <View style={{
            flex: 1,
            marginTop: 20,
            alignItems: "center"
        }} >
            <Text style={{ fontSize: 20, marginBottom: 20 }} >Opsi Toko</Text>
            <View style={{
                width: WIDTH_CONTENT,
                marginBottom: 30
            }} >
                <Text style={{ fontSize: 20 }} >Nama Toko</Text>
                <TextInput
                    style={{
                        width: WIDTH_CONTENT,
                        fontSize: 16,
                        borderBottomColor: 'gray',
                        borderBottomWidth: 1
                    }}
                    onChangeText={(val) => setStoreName(val)}
                    placeholder="Ketik nama toko anda disini" />

                <Text style={{ fontSize: 20 }} >Alamat</Text>
                <TextInput
                    style={{
                        width: WIDTH_CONTENT,
                        fontSize: 16,
                        borderBottomColor: 'gray',
                        borderBottomWidth: 1
                    }}
                    onChangeText={(val) => setStoreAddress(val)}
                    placeholder="Alamat" />
                <Text style={{ fontSize: 20 }} >Waktu Operasional</Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }} >
                    {/* <TextInput
                        style={{
                            width: WIDTH_CONTENT / 3,
                            fontSize: 16,
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1
                        }}
                        placeholder="Waktu Buka" /> */}
                    <Picker
                        selectedValue={startWorkingHour}
                        style={{
                            width: WIDTH_CONTENT / 3,
                            fontSize: 16,
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1
                        }}
                        onValueChange={(val, index) => {
                            setStartWorkingHour(val)
                        }}>
                        {Hours.map((row, index) => (
                            <Picker.Item key={index} label={row} value={row} />
                        ))}
                    </Picker>
                    <Text style={{ fontSize: 16 }} > - </Text>
                    {/* <TextInput
                        style={{
                            width: WIDTH_CONTENT / 3,
                            fontSize: 16,
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1
                        }}
                        placeholder="Waktu Tutup" /> */}
                    <Picker
                        selectedValue={endWorkingHour}
                        style={{
                            width: WIDTH_CONTENT / 3,
                            fontSize: 16,
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1
                        }}
                        onValueChange={(val, index) => {
                            setEndWorkingHour(val)
                        }}>
                        {Hours.map((row, index) => (
                            <Picker.Item key={index} label={row} value={row} />
                        ))}
                    </Picker>
                </View>
                <Text style={{ fontSize: 20 }} >Hari Operasional</Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }} >
                    {/* <TextInput
                        style={{
                            width: WIDTH_CONTENT / 3,
                            fontSize: 16,
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1
                        }}
                        placeholder="Hari" /> */}
                    <Picker
                        selectedValue={startWorkingDay}
                        style={{
                            width: WIDTH_CONTENT / 3,
                            fontSize: 16,
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1
                        }}
                        onValueChange={(val, index) => {
                            setStartWorkingDay(val)
                        }}>
                        {Days.map((row, index) => (
                            <Picker.Item key={index} label={row} value={row} />
                        ))}
                    </Picker>
                    <Text style={{ fontSize: 16 }} > - </Text>
                    {/* <TextInput
                        style={{
                            width: WIDTH_CONTENT / 3,
                            fontSize: 16,
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1
                        }}
                        placeholder="Hari" /> */}
                    <Picker
                        selectedValue={endWorkingDay}
                        style={{
                            width: WIDTH_CONTENT / 3,
                            fontSize: 16,
                            borderBottomColor: 'gray',
                            borderBottomWidth: 1
                        }}
                        onValueChange={(val, index) => {
                            setEndWorkingDay(val)
                        }}>
                        {Days.map((row, index) => (
                            <Picker.Item key={index} label={row} value={row} />
                        ))}
                    </Picker>
                </View>
                <Text style={{ fontSize: 20 }} >No. Tlp</Text>
                <TextInput
                    style={{
                        width: WIDTH_CONTENT,
                        fontSize: 16,
                        borderBottomColor: 'gray',
                        borderBottomWidth: 1
                    }}
                    placeholder="No. Tlp"
                    keyboardType='phone-pad'
                    textContentType='telephoneNumber'
                    onChangeText={(val) => setNoTlp(val)} />
            </View>
            <TouchableOpacity onPress={() => buttonSave()} >
                <View style={{
                    backgroundColor: '#D9F2FA',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                    elevation: 2
                }} >
                    <Text style={{ fontSize: 24 }} >Simpan</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ShopSettings