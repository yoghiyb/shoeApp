import React, { useState, useContext, useEffect } from 'react'
import { View, Text, Image, Dimensions, ScrollView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { AuthContext } from '../settings/Routes'
import axios from 'axios'

var { width, height } = Dimensions.get("window")

var data = [
    { id: '1', image: require('../assets/images/shoe2.jpg') },
    { id: '2', image: require('../assets/images/shoe3.jpg') },
    { id: '3', image: require('../assets/images/shoe4.jpg') },
    { id: '4', image: require('../assets/images/shoe5.jpg') },
]

const Item = ({ store_name, start_working_days, end_working_days, start_working_time, end_working_time, imgPath, onPress }) => {
    return (
        <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={onPress} >
            <View style={{ position: "relative", borderBottomWidth: 0.5, borderColor: 'gray', padding: 5, flexDirection: "row", marginTop: 0.5 }} >
                {/* <View style={{ backgroundColor: 'dodgerblue', height: 100, width: 100, borderRadius: 5 }} elevation={10} /> */}
                <Image source={imgPath == null ? null : { uri: `http://192.168.0.76:80/Laravel/shoeApp${imgPath}` }}
                    style={{
                        height: 100,
                        width: 100,
                        resizeMode: "contain",
                        borderRadius: 5,
                        backgroundColor: imgPath ? null : 'gray'
                    }} />

                <View style={{ flex: 1, marginLeft: 5, justifyContent: "space-evenly" }} >
                    <Text style={{ fontSize: 16, fontWeight: "bold" }} >{store_name}</Text>
                    <Text style={{ color: 'gray' }} >{start_working_days ? `${start_working_days} - ${end_working_days}` : 'Toko belum memiliki hari kerja'}</Text>

                    {start_working_time ?
                        <View style={{ flexDirection: "row", alignItems: "center" }} >
                            <Icon name="clock" size={18} />
                            <Text style={{ marginLeft: 3, color: 'gray' }} >{`${start_working_time} - ${end_working_time}`}</Text>
                        </View>
                        :
                        <Text style={{ marginLeft: 3, color: 'gray' }} >Toko belum memiliki jam kerja</Text>
                    }
                    {/* <View style={{ flexDirection: "row" }} >
                        <Icon name="map-marked-alt" size={18} />
                        <Text style={{ marginLeft: 3 }} >Lokasi</Text>
                    </View> */}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const HomeTab = ({ navigation }) => {

    const [state, { signOut }, baseUrl] = useContext(AuthContext)
    const [partner, setPartner] = useState([])
    const [loading, setLoading] = useState(false)

    // console.log('test', signOut, baseUrl)

    if (state.user == null) signOut()

    let headers = {
        'Authorization': `Bearer ${state.userToken}`
    }

    const getPartner = async () => {
        let endpoint
        let response

        if (state.isMitra) {

        } else {
            endpoint = `${baseUrl}/partners`
            response = await axios.get(endpoint, { headers })
        }
        // console.log("cek response partner", response)

        let filteredPartner = response.data.filter(p => p.store_name != null)
        setPartner(filteredPartner)
    }

    useEffect(() => {
        setLoading(true)
        getPartner()
        setLoading(false)
    }, [])

    useEffect(() => {
        setLoading(true)
        getPartner()
        setLoading(false)
    }, [partner.length])

    // console.log(state)
    return (
        <View style={{ flex: 1, }} >
            <View style={{ height: 230 }} >
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 20 }}
                >
                    {data.map((row, index) => (
                        <View key={index} style={{ width: width - 30, backgroundColor: 'dodgerblue', height: 200, borderRadius: 5, marginLeft: 10 }} >
                            {/* <Text>{row.name}</Text> */}
                            <Image key={index} style={{
                                flex: 1,
                                height: null,
                                width: null,
                                // backgroundColor: 'gray',
                                borderRadius: 5
                            }}
                                source={row.image}
                            />
                        </View>
                    ))}
                    <View style={{ marginRight: 10 }} />
                </ScrollView>
            </View>
            <View style={{ flex: 1 }} >
                <Text style={{ fontSize: 16, fontWeight: "bold", paddingHorizontal: 10, }} >Daftar Toko</Text>
                {
                    loading ?
                        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />
                        :
                        <FlatList
                            data={partner}
                            renderItem={
                                ({ item }) => <Item
                                    store_name={item.store_name}
                                    start_working_days={item.start_working_days}
                                    end_working_days={item.end_working_days}
                                    start_working_time={item.start_working_time}
                                    end_working_time={item.end_working_time}
                                    imgPath={item.imgPath}
                                    onPress={() => navigation.navigate('shopView', { 'partner_id': item.id })} />
                                // onPress={() => navigation.navigate('order', { item: item })} />
                            }
                            keyExtractor={item => item.id}
                        />
                }
            </View>
        </View>
    )
}

export default HomeTab