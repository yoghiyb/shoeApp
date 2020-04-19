import React, { useState, useContext, useEffect } from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../settings/Routes'
import axios from 'axios'

var { width, height } = Dimensions.get("window")

const Shop = ({ navigation }) => {
    const [state] = useContext(AuthContext)
    const [service, setService] = useState([])
    const [storeImage, setStoreImage] = useState(null)
    const [loading, setLoading] = useState(false)

    let headers = {
        'Authorization': `Bearer ${state.userToken}`
    }

    const getService = async () => {
        let endpoint = `http://192.168.0.7:80/Laravel/shoeApp/public/api/service/${state.user.id}`
        let response = await axios.get(endpoint, { headers })

        setService(response.data)

        console.log(response.data)
    }

    const getImage = async () => {
        let endpoint = `http://192.168.0.22:80/Laravel/shoeApp/public/api/partner/image/${state.user.id}`
        let response = await axios.get(endpoint, { headers })
        let imageUrl = `http://192.168.0.22:80/Laravel/shoeApp${response.data.imageUrl}`
        setStoreImage(imageUrl)
    }

    useEffect(() => {
        setLoading(true)
        getImage()
        getService()
        setLoading(false)
    }, [service.length])

    // console.log(service.length)

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
                        service.map((row, index) => (
                            <TouchableOpacity key={index} >
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
                                        <TouchableOpacity>
                                            <Ionicons name="md-trash" size={28} color={"red"} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
            }
            {!loading &&
                <TouchableOpacity onPress={() => navigation.navigate('createService')} >
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
        </View>
    )
}

export default Shop