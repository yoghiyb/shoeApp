import React, { useState, useContext, useEffect } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View, FlatList, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../settings/Routes';
import axios from 'axios';

var { height, width } = Dimensions.get('window');

const Item = ({ imgUrl, store_name, order_no, service, price, created_at, description, onPress }) => {
    return (
        <TouchableOpacity style={{}} onPress={onPress} >
            <View style={{ position: "relative", borderBottomWidth: 0.5, borderColor: 'gray', padding: 5, flexDirection: "row", marginBottom: 1, backgroundColor: 'white' }} >
                {/* <View style={{ backgroundColor: 'dodgerblue', height: 100, width: 100, borderRadius: 5 }} elevation={10} /> */}
                <Image
                    source={imgUrl ? { uri: `http://192.168.0.76:80/Laravel/shoeApp${imgUrl}` } : null}
                    style={{
                        height: 100,
                        width: 100,
                        resizeMode: "contain",
                        backgroundColor: imgUrl ? null : 'gray',
                        borderRadius: 10
                    }} />

                <View style={{ flex: 1, marginLeft: 5, justifyContent: "space-evenly" }} >
                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }} >
                        <View style={{ flexDirection: 'row' }} >
                            <Text style={{ fontSize: 16, fontWeight: "bold" }} >{store_name}</Text>
                            <Text style={{ color: 'gray', marginLeft: 10 }} >{order_no}</Text>
                        </View>
                        <Text style={{ color: 'gray' }} >{service}</Text>
                    </View>
                    <Text style={{ color: 'gray' }} >Total : Rp. {price}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }} >
                        <Icon name="calendar-alt" size={18} />
                        <Text style={{ marginLeft: 3, color: 'gray' }} >{created_at}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }} >
                        <Ionicons name="md-clipboard" size={18} />
                        <Text style={{ marginLeft: 3, color: 'gray' }} >{description}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const HistoryTab = ({ navigation }) => {
    const [state, auth, baseUrl] = useContext(AuthContext)
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(false)

    let headers = {
        'Authorization': `Bearer ${state.userToken}`
    }

    const loadHistory = async () => {
        let endpoint = `${baseUrl}/order/list/${state.user.id}`
        let response = await axios.get(endpoint, { headers })
        console.log(response.data)
        if (response.data.status == 'Token is Expired') {
            Alert.alert('', 'Sesi anda telah berakhir silahkan login kembali', [
                { text: 'Login', onPress: () => auth.signOut() }
            ])
        }
        setHistory(response.data)
    }

    useEffect(() => {
        setLoading(true)
        loadHistory()
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

    console.log(history)

    return (
        <View style={{ flex: 1 }} >
            <View style={{ backgroundColor: 'white' }} >
                <Text style={{ fontSize: 20, fontWeight: "bold", paddingHorizontal: 10, paddingVertical: 10 }} >Daftar Riwayat</Text>
            </View>
            {
                loading ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />
                    :
                    history.length > 0 ?
                        <FlatList
                            data={history}
                            renderItem={
                                ({ item }) => <Item
                                    store_name={item.service?.partner?.store_name}
                                    service={item.service?.service}
                                    price={item.price}
                                    created_at={splitDate(item.created_at)}
                                    description={maxLengthDesc(item.description)}
                                    imgUrl={item.imgUrl}
                                    order_no={item.order_no}
                                    onPress={() => navigation.navigate('history', { 'history': item })} />
                            }
                            keyExtractor={item => item.id}
                        />
                        :
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} >
                            <Text style={{ fontSize: 20 }} >Belum ada riwayat</Text>
                        </View>
            }
        </View>
    )
}

export default HistoryTab