import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

var { height, width } = Dimensions.get('window');

var data = [
    { id: '1', name: "no 1", address: 'Sidoarjo', date: '16-Maret-2020', total: 20000 },
    { id: '2', name: "no 2", address: 'Sidoarjo', date: '16-Maret-2020', total: 20000 },
    { id: '3', name: "no 3", address: 'Sidoarjo', date: '16-Maret-2020', total: 20000 },
    { id: '4', name: "no 4", address: 'Sidoarjo', date: '16-Maret-2020', total: 20000 },
]

const Item = ({ name, total, date, address, onPress }) => {
    return (
        <TouchableOpacity style={{}} onPress={onPress} >
            <View style={{ position: "relative", borderBottomWidth: 0.5, borderColor: 'gray', padding: 5, flexDirection: "row", marginBottom: 1, backgroundColor: 'white' }} >
                {/* <View style={{ backgroundColor: 'dodgerblue', height: 100, width: 100, borderRadius: 5 }} elevation={10} /> */}
                <Image source={require('../assets/images/sepatu_vans.png')} style={{ height: 100, width: 100, resizeMode: "contain", borderRadius: 5 }} />

                <View style={{ flex: 1, marginLeft: 5, justifyContent: "space-between" }} >
                    <Text style={{ fontSize: 16, fontWeight: "bold" }} >{name}</Text>
                    <Text style={{ color: 'gray' }} >Total : Rp. {total}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }} >
                        <Icon name="calendar-alt" size={18} />
                        <Text style={{ marginLeft: 3, color: 'gray' }} >{date}</Text>
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

const HistoryTab = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }} >
            <View style={{ backgroundColor: 'white' }} >
                <Text style={{ fontSize: 20, fontWeight: "bold", paddingHorizontal: 10, paddingVertical: 10 }} >Daftar Riwayat</Text>
            </View>
            <FlatList
                data={data}
                renderItem={
                    ({ item }) => <Item
                        name={item.name}
                        total={item.total}
                        date={item.date}
                        address={item.address}
                        onPress={() => navigation.navigate('history')} />
                }
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default HistoryTab