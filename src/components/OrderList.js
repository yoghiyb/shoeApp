import React, { useMemo, useContext, useState, useEffect } from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../settings/Routes';
import axios from 'axios'

var { width, height } = Dimensions.get('window')

const OrderList = ({ navigation }) => {
    const [state, auth, baseUrl] = useContext(AuthContext)
    const [orderList, setOrderList] = useState(null)
    const [loading, setLoading] = useState(false)

    let headers = {
        'Authorization': `Bearer ${state.userToken}`
    }

    const getOrderList = async () => {
        let endpoint = `${baseUrl}/order/partner/${state.user.id}`
        let response = await axios.get(endpoint, { headers })

        let filteredResponse = response.data.filter(row => row.status != "Selesai")

        // console.log(filteredResponse)
        setOrderList(filteredResponse)
    }

    useEffect(() => {
        setLoading(true)
        getOrderList()
        setLoading(false)
    }, [])

    const splitDate = (date) => {
        let split = date.split('T');
        return split[0].split('-').reverse().join('-')
    }

    const maxLengthDesc = (description) => {
        if (description.length > 30) {
            return description.slice(0, 5) + " ..."
        }
        return description
    }

    return (
        <View style={{ flex: 1 }} >
            <View style={{ backgroundColor: 'white', borderBottomColor: 'gray', borderBottomWidth: 0.2 }} >
                <Text style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    paddingHorizontal: 10,
                    paddingVertical: 10
                }} >Daftar Pesanan</Text>
            </View>
            {
                loading ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />
                    :
                    <FlatList
                        data={orderList}
                        keyExtractor={(item, index) => index}
                        renderItem={
                            ({ item }) => (
                                <List
                                    name={item.name}
                                    order_no={item.order_no}
                                    status={item.service.service}
                                    phone_number={item.phone_number}
                                    price={item.price}
                                    created_at={splitDate(item.created_at)}
                                    description={maxLengthDesc(item.description)}
                                    onPress={() => navigation.navigate('orderListDetail', { item: item })}
                                />
                            )
                        }
                    />
            }
        </View>
    )
}

const List = ({ name, status, price, phone_number, order_no, created_at, description, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} >
            <View style={{
                backgroundColor: 'white',
                // borderBottomWidth: 0.5,
                // borderColor: 'gray',
                paddingVertical: 10,
                paddingHorizontal: 10,
                // marginBottom: 1,
            }} >
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }} >
                    <View style={{ flexDirection: 'row' }} >
                        <Text style={{ fontSize: 16, fontWeight: "bold" }} >{name}</Text>
                        <Text style={{ color: 'gray', marginLeft: 10 }} >{order_no}</Text>
                    </View>
                    <Text style={{ color: 'gray' }} >{status}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }} >
                    <View style={{ flexDirection: "row" }} >
                        <Icon name="phone" size={14} />
                        <Text style={{ color: 'gray', marginLeft: 5 }}>{phone_number}</Text>
                    </View>
                    <Text style={{ color: 'gray' }} >Total : Rp. {price}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }} >
                    <Icon name="calendar-alt" size={18} />
                    <Text style={{ marginLeft: 3, color: 'gray' }} >{created_at}</Text>
                </View>
                <View style={{ flexDirection: "row" }} >
                    <Ionicons name="md-clipboard" size={18} />
                    <Text style={{ marginLeft: 3, color: 'gray' }} >{description}</Text>
                </View>
            </View>
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: 'gray'
            }} />
        </TouchableOpacity>
    )
}


export default OrderList