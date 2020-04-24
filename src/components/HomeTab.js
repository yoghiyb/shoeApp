import React, { useState, useContext, useEffect } from 'react'
import { View, Text, Image, Dimensions, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { AuthContext } from '../settings/Routes'
import axios from 'axios'

var { width, height } = Dimensions.get("window")

var data = [
    { id: '1', name: "no 1", address: 'Sidoarjo', workTime: '08:00 - 16:00', description: 'Cuci/Service', location: { latitude: '-7.4478', longtitude: '112.7183' } },
    { id: '2', name: "no 2", address: 'Sidoarjo', workTime: '08:00 - 16:00', description: 'Cuci/Service', location: { latitude: '-7.490720', longtitude: '112.710539' } },
    { id: '3', name: "no 3", address: 'Sidoarjo', workTime: '08:00 - 16:00', description: 'Cuci/Service', location: { latitude: '-7.4478', longtitude: '112.7183' } },
    { id: '4', name: "no 4", address: 'Sidoarjo', workTime: '08:00 - 16:00', description: 'Cuci/Service', location: { latitude: '-7.4478', longtitude: '112.7183' } },
]

const Item = ({ name, description, workTime, address, onPress }) => {
    return (
        <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={onPress} >
            <View style={{ position: "relative", borderBottomWidth: 0.5, borderColor: 'gray', padding: 5, flexDirection: "row", marginTop: 0.5 }} >
                {/* <View style={{ backgroundColor: 'dodgerblue', height: 100, width: 100, borderRadius: 5 }} elevation={10} /> */}
                <Image source={require('../assets/images/sepatu_vans.png')} style={{ height: 100, width: 100, resizeMode: "contain", borderRadius: 5 }} />

                <View style={{ flex: 1, marginLeft: 5, justifyContent: "space-between" }} >
                    <Text style={{ fontSize: 16, fontWeight: "bold" }} >{name}</Text>
                    <Text style={{ color: 'gray' }} >{description}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }} >
                        <Icon name="clock" size={18} />
                        <Text style={{ marginLeft: 3, color: 'gray' }} >{workTime}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }} >
                        <Icon name="map-marked-alt" size={18} />
                        <Text style={{ marginLeft: 3 }} >{address}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const HomeTab = ({ navigation }) => {

    const [state, { signOut }, baseUrl] = useContext(AuthContext)
    const [partner, setPartner] = useState(null)

    // console.log('test', signOut, baseUrl)

    if (state.user == null) signOut()

    const getPartner = async () => {
        let endpoint = `${baseUrl}/partners`
        let headers = {
            'Authorization': `Bearer ${state.userToken}`
        }
        let response = await axios.get(endpoint, { headers })

        console.log(response.data)
    }

    useEffect(() => {
        getPartner()
    }, [])

    // console.log(state, status)
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
                            <Text>{row.name}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={{ flex: 1 }} >
                <Text style={{ fontSize: 16, fontWeight: "bold", paddingHorizontal: 10, }} >Daftar Toko</Text>
                <FlatList
                    data={data}
                    renderItem={
                        ({ item }) => <Item
                            name={item.name}
                            description={item.description}
                            workTime={item.workTime}
                            address={item.address}
                            onPress={() => navigation.navigate('shopView')} />
                        // onPress={() => navigation.navigate('order', { item: item })} />
                    }
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}

export default HomeTab