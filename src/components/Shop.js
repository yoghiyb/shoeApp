import React from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

var { width, height } = Dimensions.get("window")

const Shop = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }} >
            <View style={{
                width: width,
                height: height / 3,
                position: 'relative',
                marginBottom: 15
            }} >
                <Image style={{
                    backgroundColor: 'gray',
                    width: width,
                    height: height / 3,

                }} />
                <View style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    alignSelf: 'center',
                }} >
                    <TouchableOpacity>
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
        </View>
    )
}

export default Shop