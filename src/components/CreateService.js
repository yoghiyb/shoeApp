import React, { useState } from 'react'
import { View, Image, Text, TextInput, Dimensions, Picker, TouchableOpacity } from 'react-native'

var { width, height } = Dimensions.get("window")

const WIDTH_CONTENT = width - 50
const serviceItem = [
    { id: 1, service: 'Service Sepatu' },
    { id: 2, service: 'Cuci Sepatu' },
    { id: 1, service: 'Jahit Sepatu' },
]

const CreateService = ({ navigation }) => {
    const [service, setService] = useState(null)

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
                    placeholder="Masukkan harga disini"
                />
            </View>
            <TouchableOpacity>
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