import React, { useContext, useState, useEffect } from 'react'
import { View, Image, Text, Dimensions, Modal, TouchableOpacity, ActivityIndicator } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-picker'
import { AuthContext } from '../settings/Routes'
import axios from 'axios'

var { height, width } = Dimensions.get("window")

const ImagePickers = ({ navigation }) => {
    const [state, auth, baseUrl] = useContext(AuthContext)
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    let headers = {
        'Authorization': `Bearer ${state.userToken}`
    }

    useEffect(() => {
        setLoading(true)
        getImage()
        setLoading(false)
    }, [])

    const getImage = async () => {
        let endpoint = `http://192.168.0.76:80/Laravel/shoeApp/public/api/partner/image/${state.user.id}`
        let response = await axios.get(endpoint, { headers })
        let imageUrl = `http://192.168.0.76:80/Laravel/shoeApp${response.data.imageUrl}`
        setImage(imageUrl)
    }

    const saveImg = async (body) => {
        let endpoint = `http://192.168.0.76:80/Laravel/shoeApp/public/api/partner/image/${state.user.id}`
        let response = await axios.put(endpoint, body, { headers })

        let imageUrl = `http://192.168.0.76:80/Laravel/shoeApp${response.data.imageUrl}`

        console.log(`http://192.168.0.76:80/Laravel/shoeApp${response.data.imageUrl}`)
        setImage(imageUrl)
    }

    const PickImage = () => {

        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            mediaType: 'photo',
            // maxWidth: 400,
            // maxHeight: 400
        }

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                setLoading(true)
                const source = { image: `data:${response.type};base64,` + response.data };
                saveImg(source)
                // console.log(source)
                setLoading(false)
            }
        });
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ margin: 10 }} onPress={PickImage} >
                    <Ionicons size={24} name="md-create" color={"black"} />
                </TouchableOpacity>
            )
        })
    })

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: 'center'
        }} >
            {loading ?
                <ActivityIndicator size="large" color="#0000ff" />
                :
                image == null ?
                    <Text>Tidak ada foto</Text>
                    :
                    <Image style={{
                        height: height / 2,
                        width: width,
                        // backgroundColor: 'gray'
                    }}
                        source={image == null ? null : { uri: image }}
                    />
            }
        </View>
    )
}

export default ImagePickers