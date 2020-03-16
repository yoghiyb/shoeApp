import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

var { width, height } = Dimensions.get("window")

const Map = ({ route }) => {
    const { location } = route.params
    console.log(location)
    return (
        <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={{
                latitude: parseFloat(location.latitude),
                longitude: parseFloat(location.longtitude),
                latitudeDelta: 0.09,
                longitudeDelta: 0.035
            }}
        >
            <Marker
                coordinate={{ latitude: parseFloat(location.latitude), longitude: parseFloat(location.longtitude) }}
                title={'Kabupaten Sidoarjo'}
            >


            </Marker>
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})

export default Map