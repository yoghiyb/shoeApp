import React, { useEffect, useContext, useState } from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { AuthContext } from '../settings/Routes'
import axios from 'axios'
import Shop from './Shop'

var { width, height } = Dimensions.get('window')

const CONTENT_WIDTH = width - 50

const ShopView = ({ navigation }) => {
    const [state] = useContext(AuthContext);
    const [shop, setShop] = useState(null)

    const loadData = async () => {
        let endpoint
        if (state.isMitra) {
            endpoint = `http://192.168.0.76:80/Laravel/shoeApp/public/api/partner/${state.user.id}`
        } else {
            endpoint = ``
        }

        let headers = {
            'Authorization': `Bearer ${state.userToken}`
        }

        let response = await axios.get(endpoint, { headers })
        setShop(response.data.partner)
        // console.log(shop)
    }

    useEffect(() => {
        loadData()
    }, [])

    console.log(shop)
    return (
        <View style={{ flex: 1 }} >
            <ScrollView >
                <View style={{
                    width: width,
                    height: height / 3,
                    position: 'relative',
                }} >
                    <Image style={{
                        // backgroundColor: 'gray',
                        width: width,
                        height: height / 3,
                    }}
                        source={require('../assets/images/sepatu_vans.png')}
                    />
                    <View style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        alignSelf: 'center',
                    }} >
                    </View>
                </View>
                {shop == null ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />
                    :
                    <View style={{
                        backgroundColor: 'white',
                        // height: 100,
                        width: width,
                        paddingHorizontal: 15,
                        paddingVertical: 10
                    }} >
                        <Text style={{
                            fontSize: 18
                        }} >{shop.store_name ? shop.store_name : null}</Text>
                        <View style={{ flexDirection: "row" }} >
                            <View style={{ flex: 1 }} >
                                {shop.start_working_days &&
                                    <Text style={{ color: 'gray' }} >{shop.start_working_days + ' - ' + shop.end_working_days}</Text>
                                }
                                {
                                    shop.start_working_time &&
                                    <View style={{ flexDirection: "row", alignItems: "center" }} >
                                        <Icon name="clock" size={16} color={'gray'} />
                                        <Text style={{ marginLeft: 5, color: 'gray' }}>{shop.start_working_time + ' - ' + shop.end_working_time}</Text>
                                    </View>
                                }
                            </View>
                            <View style={{ flex: 1 }} >
                                {
                                    shop.phone_number &&
                                    <View style={{ flexDirection: "row", alignItems: "center" }} >
                                        <Icon name="phone" size={14} color={'gray'} />
                                        <Text style={{ color: 'gray', marginLeft: 5 }}>{shop.phone_number}</Text>
                                    </View>
                                }
                                {
                                    shop.location ?
                                        <TouchableOpacity onPress={() => { navigation.navigate('map', { location: shop.location }) }} >
                                            <View style={{ flexDirection: "row", alignItems: "center" }} >
                                                <Icon name="map-marked-alt" size={16} color={'blue'} />
                                                <Text style={{ color: 'blue', marginLeft: 5 }}>Lokasi</Text>
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        <View style={{ flexDirection: "row", alignItems: "center" }} >
                                            <Icon name="map-marked-alt" size={16} color={'gray'} />
                                            <Text style={{ color: 'gray', marginLeft: 5 }}>Lokasi</Text>
                                        </View>
                                }
                            </View>
                        </View>
                    </View>
                }
                <Text style={{ marginLeft: 15, fontSize: 20, fontWeight: "bold", marginVertical: 10 }} >Jasa</Text>
                {
                    shop == null ?
                        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />
                        :
                        shop.service == null ?
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
                            shop.service.map((row, index) => (
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
                                        <Text style={{ color: 'gray' }} >Rp. {row.price + '/' + row.unit}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                }
            </ScrollView>
        </View >
    )
}

export default ShopView