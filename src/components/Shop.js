import React, { useState, useContext, useEffect, useCallback } from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../settings/Routes'
import axios from 'axios'

var { width, height } = Dimensions.get("window")

const Shop = ({ navigation }) => {
    const [state, auth, baseUrl] = useContext(AuthContext)
    const [service, setService] = useState([])
    const [storeImage, setStoreImage] = useState(null)
    const [loading, setLoading] = useState(false)

    let headers = {
        'Authorization': `Bearer ${state.userToken}`
    }

    const getService = async () => {
        let endpoint = `${baseUrl}/service/${state.user.id}`
        let response = await axios.get(endpoint, { headers })

        setService(response.data)
        console.log('ambil data jasa')
    }

    const getImage = async () => {
        let endpoint = `${baseUrl}/partner/image/${state.user.id}`
        let response = await axios.get(endpoint, { headers })
        let imageUrl = `http://192.168.0.76:80/Laravel/shoeApp${response.data.imageUrl}`
        setStoreImage(imageUrl)
    }

    useEffect(() => {
        setLoading(true)
        getService()
        setLoading(false)
    }, [service.length])

    useEffect(() => {
        const reRender = navigation.addListener('focus', () => {
            setLoading(true)
            getService()
            setLoading(false)
        });

        return reRender
    }, [navigation])

    useEffect(() => {
        setLoading(true)
        getImage()
        setLoading(false)
    }, [])

    const deleteService = (data) => {
        Alert.alert('Hapus Jasa', `Apakah anda yakin ingin menghapus jasa ${data.service}?`, [
            { text: 'Hapus', onPress: () => confirmDelete(data.id) },
            { text: 'Batal' }
        ])
    }

    const confirmDelete = async (id) => {
        let endpoint = `${baseUrl}/service/${id}`
        let response = await axios.delete(endpoint, { headers })

        if (response.status == 200) {
            Alert.alert('', `${response.data.success}`)
            getService()
        } else {
            Alert.alert('', `Gagal menghapus jasa`)
        }
    }

    return (
        <View style={{ flex: 1 }} >
            <View style={{
                width: width,
                height: height / 3,
                position: 'relative',
                marginBottom: 15
            }} >
                <Image style={{
                    backgroundColor: storeImage ? null : 'gray',
                    width: width,
                    height: height / 3,
                }}
                    source={storeImage ? { uri: storeImage } : null}
                />
                <View style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    alignSelf: 'center',
                }} >
                    <TouchableOpacity onPress={() => navigation.navigate('imagePicker')} >
                        <Text style={{
                            fontSize: 16,
                            color: 'blue'
                        }}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('shopView')} >
                <View style={{
                    backgroundColor: 'white',
                    height: 50,
                    width: width,
                    alignItems: 'center',
                    flexDirection: "row",
                    paddingHorizontal: 15,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'gray'
                }} >
                    <Ionicons name="ios-eye" size={28} color={'blue'} />
                    <Text style={{ marginLeft: 10 }} >Lihat Toko</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('shopSettings')} >
                <View style={{
                    backgroundColor: 'white',
                    height: 50,
                    width: width,
                    alignItems: 'center',
                    flexDirection: "row",
                    paddingHorizontal: 15,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'gray'
                }} >
                    <Ionicons name="ios-options" size={28} color={'blue'} />
                    <Text style={{ marginLeft: 10 }} >Opsi Toko</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('map', { isEdit: true }) }} >
                <View style={{
                    backgroundColor: 'white',
                    height: 50,
                    width: width,
                    alignItems: 'center',
                    flexDirection: "row",
                    paddingHorizontal: 15,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'gray'
                }} >
                    <Ionicons name="ios-map" size={28} color={'blue'} />
                    <Text style={{ marginLeft: 10 }} >Lokasi Toko</Text>
                </View>
            </TouchableOpacity>
            <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginVertical: 5,
                marginLeft: 15
            }} >Jasa</Text>
            {!loading &&
                <TouchableOpacity onPress={() => navigation.push('createService', { isEdit: false })} >
                    <View style={{
                        backgroundColor: 'white',
                        height: 50,
                        width: width,
                        alignItems: "center",
                        flexDirection: "row",
                        paddingHorizontal: 15,
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'gray'
                    }} >
                        <Feather name="plus-circle" size={28} color={'blue'} />
                        <Text style={{ marginLeft: 10 }} >Tambah Jasa</Text>
                    </View>
                </TouchableOpacity>
            }
            {
                loading ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />
                    :
                    service.length == 0 ?
                        <View style={{
                            backgroundColor: 'white',
                            width: width,
                            borderBottomColor: 'gray',
                            borderBottomWidth: 0.5,
                            paddingHorizontal: 15,
                            paddingVertical: 10,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            justifyContent: 'center'
                        }} >
                            <Text style={{
                                fontSize: 18,
                                color: 'gray'
                            }} >Tidak ada jasa</Text>
                        </View>
                        :
                        <ScrollView>
                            {service.map((row, index) => (
                                <TouchableOpacity key={index} onPress={() => navigation.push('createService', { isEdit: true, item: row })} >
                                    <View style={{
                                        backgroundColor: 'white',
                                        width: width,
                                        borderBottomColor: 'gray',
                                        borderBottomWidth: 0.5,
                                        paddingHorizontal: 15,
                                        paddingVertical: 10,
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }} >
                                        <Text style={{
                                            fontSize: 18
                                        }} >{row.service}</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }} >
                                            <Text style={{ color: 'gray', marginRight: 15 }} >Rp. {row.price + '/' + row.unit}</Text>
                                            <TouchableOpacity onPress={() => deleteService(row)} >
                                                <Ionicons name="md-trash" size={28} color={"red"} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
            }
        </View>
    )
}

export default Shop