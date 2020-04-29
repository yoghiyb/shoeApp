import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import { AuthContext } from '../settings/Routes'
import axios from 'axios'

var { width, height } = Dimensions.get('window')

const History = ({ navigation, route }) => {
    const { history } = route.params
    const [state, auth, baseUrl] = useContext(AuthContext)
    const [orderHistory, setOrderHistory] = useState(null)
    const [loading, setLoading] = useState(false)

    let headers = {
        'Authorization': `Bearer ${state.userToken}`
    }

    const getOrderHistory = async () => {
        let endpoint = `${baseUrl}/order/${history.order_no}`
        let response = await axios.get(endpoint, { headers })
        // console.log(response)
        setOrderHistory(response.data)
    }

    if (history.order_no) {
        useEffect(() => {
            setLoading(true)
            getOrderHistory()
            setLoading(false)
        }, [])
    }

    const splitDate = (date) => {
        let split = date.split('T');
        return split[0].split('-').reverse().join('-')
    }

    // console.log(history)
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
        }}>
            <View style={{
                width: width,
                marginBottom: 20,
                backgroundColor: 'white',
                paddingVertical: 10,
                paddingHorizontal: 20,
            }} >
                <View style={{
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }} >
                    <Text style={{
                        fontSize: 18,
                        // fontWeight: "bold"
                    }} >{history?.service?.partner?.store_name}</Text>
                    <View style={{
                        flexDirection: "row",
                        alignItems: 'center'
                    }} >
                        <Text style={{
                            fontSize: 14,
                            color: 'gray'
                        }} >No. Order: </Text>
                        <Text style={{ fontSize: 14, color: 'gray' }} >{history.order_no}</Text>
                    </View>

                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }} >
                    <Text style={{ color: 'gray' }} >Jasa: {history?.service?.service}</Text>
                    <Text style={{ color: 'gray' }} >Harga : {history?.service?.price}/{history?.service?.unit}</Text>
                </View>
                <Text style={{ color: 'gray' }} >Jumlah yang dipesan: {history?.amount}</Text>
                <Text style={{ color: 'gray' }} >Total Harga: {history?.price}</Text>
                <Text style={{ color: 'gray' }} >Alamat : {history?.address}</Text>
            </View>
            {
                orderHistory == null ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />
                    :
                    <FlatList
                        data={orderHistory}
                        keyExtractor={item => item.id}
                        renderItem={
                            ({ item }) => <Item status={item.status} created_at={splitDate(item.created_at)} />
                        }
                    />
            }
        </View>
    )
}

const Item = ({ status, created_at }) => {
    return (
        <View style={{
            flexDirection: 'row',
            paddingVertical: 10,
            width: width - 10,
            alignItems: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: 'gray',
            backgroundColor: 'white'
        }} >
            <View style={{
                backgroundColor: 'blue',
                height: 10,
                width: 10,
                borderRadius: 25,
                marginHorizontal: 20
            }} ></View>
            <View style={{
                // backgroundColor: 'blue'
            }} >
                <Text style={{
                    fontSize: 16,
                    marginRight: 10
                }} >{status}</Text>
                <Text style={{ fontSize: 14, color: 'gray' }} >{created_at}</Text>
            </View>
        </View>
    )
}

export default History