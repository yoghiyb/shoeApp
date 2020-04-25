import React, { useState, useContext, useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { AuthContext } from '../settings/Routes'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons'

var { width, height } = Dimensions.get("window")

const Map = ({ navigation, route }) => {
    const [state, auth, baseUrl] = useContext(AuthContext)
    const { location, isEdit } = route.params
    const [newCoordinate, setNewCoordinate] = useState(null)
    const [currentCoordinate, setCurrentCoordinate] = useState(null)
    const [loading, setLoading] = useState(false)

    let headers = {
        'Authorization': `Bearer ${state.userToken}`
    }


    if (isEdit) {
        // Alert.alert('Pilih lokasi toko', 'Tekan dan tahan marker untuk mengganti posisi')
        useEffect(() => {
            setLoading(true)
            checkCoordinate()
            setLoading(false)
            // Alert.alert('Pilih lokasi toko', 'Tekan dan tahan marker untuk mengganti posisi')
        }, [])
    }

    const checkCoordinate = async () => {
        let endpoint = `${baseUrl}/partner/location/${state.user.id}`
        let response = await axios.get(endpoint, { headers })

        // console.log(response)
        if (response.data != 'gagal') {
            // console.log(response.data)
            setCurrentCoordinate({ latitude: response.data.latitude, longitude: response.data.longitude })
            // setNewCoordinate({ latitude: response.data.latitude, longitude: response.data.longitude })
        }
    }

    const saveCoordinate = async () => {

        let endpoint
        let response

        // jika null buat baru
        if (currentCoordinate == null) {
            newCoordinate.partner_id = state.user.id
            endpoint = `${baseUrl}/partner/location`
            response = await axios.post(endpoint, newCoordinate, { headers })
        }

        if (currentCoordinate) {
            endpoint = `${baseUrl}/partner/location/${state.user.id}`
            response = await axios.put(endpoint, newCoordinate, { headers })
        }

        if (response.data?.sukses == 'berhasil menyimpan lokasi' || response.data?.sukses == 'lokasi berhasil diperbarui') {
            checkCoordinate()
            Alert.alert('', `${response.data.sukses}`)
        }
    }

    // console.log(newCoordinate, isEdit)
    return (
        <View style={{ flex: 1, position: 'relative' }} >
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={{
                    latitude: isEdit ?
                        currentCoordinate ? parseFloat(currentCoordinate.latitude) : -7.4470
                        : location ? parseFloat(location.latitude) : -7.4470,
                    longitude: isEdit ?
                        currentCoordinate ? parseFloat(currentCoordinate.longitude) : 112.7183
                        : location ? parseFloat(location.longitude) : 112.7183,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.035
                }}
            >
                {
                    isEdit ?
                        <Marker
                            coordinate={{
                                latitude: currentCoordinate ? parseFloat(currentCoordinate.latitude) : -7.4470,
                                longitude: currentCoordinate ? parseFloat(currentCoordinate.longitude) : 112.7183
                            }}
                            title={'Lokasi Toko anda'}
                            draggable
                            onDragEnd={(c) => {
                                // console.log(c.nativeEvent.coordinate)
                                setNewCoordinate(c.nativeEvent.coordinate)
                            }}
                        >
                        </Marker>
                        :
                        <Marker
                            coordinate={{
                                latitude: parseFloat(location.latitude),
                                longitude: parseFloat(location.longitude)
                            }}
                            title={'Lokasi Toko'}
                        >
                        </Marker>
                }
            </MapView>
            {
                newCoordinate &&
                <TouchableOpacity style={{
                    position: 'absolute',
                    height: 40,
                    width: 140,
                    bottom: 20,
                    left: null,
                    backgroundColor: 'lightgreen',
                    alignSelf: 'center',
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: width
                }}
                    onPress={saveCoordinate}
                >
                    <View>
                        <Text style={{ fontSize: 16 }} >Simpan Lokasi</Text>
                    </View>
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})

export default Map