import React, { useContext, useState, useEffect } from 'react'
import { View, Image, Text, Dimensions, Alert, ScrollView, ActivityIndicator } from 'react-native'
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps'
import { AuthContext } from '../settings/Routes';
import axios from 'axios';

var { width, height } = Dimensions.get('window')

const OrderListDetail = ({ navigation, route }) => {
    const { item } = route.params
    const [state, auth, baseUrl] = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [orders, setOrder] = useState(null)
    const [complete, setComplete] = useState(false)
    const [orderLength, setLength] = useState(null)

    // console.log(item)

    let headers = {
        'Authorization': `Bearer ${state.userToken}`
    }

    const getOrderList = async () => {

        try {
            let endpoint = `${baseUrl}/order/${item.order_no}`
            let response = await axios.get(endpoint, { headers })
            console.log(response.data)
            if (response.data.length >= 5) setComplete(true)
            if (response.data.length > 1) {
                let r = response.data.filter(row => row.status != "Belum dikonfirmasi")
                setOrder(r)
                // console.log('filtered array : ', r)
            } else {
                setOrder(response.data)
            }
            setLength(response.data.length)
        } catch (error) {
            console.log('error : ', error.response)
        }
    }

    if (item.order_no) {
        useEffect(() => {
            setLoading(true)
            getOrderList()
            setLoading(false)
        }, [])
    }

    let body = {
        user_id: item?.user_id,
        partner_id: item?.partner_id,
        service_id: item?.service_id,
        name: item?.name,
        address: item?.address,
        phone_number: item?.phone_number,
        description: item?.description,
        amount: item?.amount,
        price: item?.price,
        status: orders?.[orderLength - 1]?.status,
        order_no: item?.order_no
    }

    const acceptOrder = async () => {
        console.log('cek body : ', body)
        try {
            let endpoint = `${baseUrl}/order`
            let response = await axios.post(endpoint, body, { headers })

            // console.log(response.data)
            if (response.data?.status == "berhasil membuat pesanan") {
                getOrderList()
            }
        } catch (error) {
            console.log(error.response)
        }
    }

    const splitDate = (date) => {
        let split = date.split('T');
        let hour = split[1].split('.')
        return split[0].split('-').reverse().join('-') + '/' + hour[0]
    }

    // console.log('panjang order :', orderLength)

    return (

        <View style={{ flex: 1 }} >
            {
                loading ?
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />
                    :
                    <ProgressSteps
                        isComplete={complete ? true : false}
                        activeStep={orderLength != null ? orderLength - 1 : 0}
                    >
                        <ProgressStep
                            label="Konfirmasi"
                            onNext={() => {
                                body.prevId = orders?.[0]?.id
                                body.status = "Dikonfirmasi"
                                acceptOrder()
                                Alert.alert('', 'Pesanan Berhasil dikonfirmasi')
                            }}
                            nextBtnText={'Konfirmasi'}
                            nextBtnStyle={{ backgoundColor: 'red' }}
                            nextBtnDisabled={orderLength == 1 ? false : true}
                        >
                            {
                                orderLength == 1 ?
                                    <ScrollView>
                                        <ItemDetail
                                            data={item}
                                        />
                                        <Text style={{
                                            paddingHorizontal: 15,
                                            fontWeight: "bold",
                                            fontSize: 18
                                        }} >Status</Text>
                                        {
                                            orderLength > 0 ?
                                                orders.map((row, index) => (
                                                    <ItemStatus key={index} status={row?.status} date={splitDate(row?.created_at)} />
                                                ))
                                                : null
                                        }
                                    </ScrollView>
                                    : null
                            }
                        </ProgressStep>
                        <ProgressStep
                            label="Pengambilan"
                            previousBtnDisabled={true}
                            previousBtnText={'Kembali'}
                            nextBtnText={'Ambil'}
                            onNext={() => {
                                delete body?.prevId
                                body.status = "Pengambilan Barang"
                                acceptOrder()
                                Alert.alert('', 'Pengambilan Barang selesai')
                            }}
                        >
                            {
                                orderLength == 2 ?
                                    <ScrollView>
                                        <ItemDetail
                                            data={item}
                                        />
                                        <Text style={{
                                            paddingHorizontal: 15,
                                            fontWeight: "bold",
                                            fontSize: 18
                                        }} >Status</Text>
                                        {
                                            orders.length > 0 ?
                                                orders.map((row, index) => (
                                                    <ItemStatus key={index} status={row?.status} date={splitDate(row?.created_at)} />
                                                ))
                                                : null
                                        }
                                    </ScrollView>
                                    : null
                            }
                        </ProgressStep>
                        <ProgressStep
                            label="Pengerjaan"
                            previousBtnDisabled={true}
                            previousBtnText={'Kembali'}
                            nextBtnText={'Pengerjaan'}
                            onNext={() => {
                                body.status = "Pengerjaan"
                                acceptOrder()
                                Alert.alert('', 'Pengerjaan Barang selesai')
                            }}
                        >
                            {
                                orderLength == 3 ?
                                    <ScrollView>
                                        <ItemDetail
                                            data={item}
                                        />
                                        <Text style={{
                                            paddingHorizontal: 15,
                                            fontWeight: "bold",
                                            fontSize: 18
                                        }} >Status</Text>
                                        {
                                            orders.length > 0 ?
                                                orders.map((row, index) => (
                                                    <ItemStatus key={index} status={row?.status} date={splitDate(row?.created_at)} />
                                                ))
                                                : null
                                        }
                                    </ScrollView>
                                    : null
                            }
                        </ProgressStep>
                        <ProgressStep
                            label="Selesai"
                            previousBtnDisabled={true}
                            previousBtnText={'Kembali'}
                            removeBtnRow={complete ? true : false}
                            finishBtnText={'Selesai'}
                            onSubmit={() => {
                                body.status = "Selesai"
                                acceptOrder()
                                setComplete(true)
                                Alert.alert('', 'Barang siap diambil')
                            }} >
                            {
                                orderLength >= 4 ?
                                    <ScrollView>
                                        <ItemDetail
                                            data={item}
                                        />
                                        <Text style={{
                                            paddingHorizontal: 15,
                                            fontWeight: "bold",
                                            fontSize: 18
                                        }} >Status</Text>
                                        {
                                            orders.length > 0 ?
                                                orders.map((row, index) => (
                                                    <ItemStatus key={index} status={row?.status} date={splitDate(row?.created_at)} />
                                                ))
                                                : null
                                        }
                                    </ScrollView>
                                    : null
                            }
                        </ProgressStep>
                    </ProgressSteps>
            }
        </View>
    )
}

const ItemDetail = ({ data }) => {
    return (
        <View style={{
            flex: 1,
            paddingHorizontal: 15,
            marginBottom: 10
        }} >
            <Text style={{ fontSize: 18, fontWeight: "bold" }} >Detail Pelanggan</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: "space-between"
            }} >
                <Text>Nama : {data?.name}</Text>
                <Text>No. Order : {data?.order_no}</Text>
            </View>
            <Text>Email : {data?.user?.email}</Text>
            <Text>No. Tlp : {data?.phone_number}</Text>
            <Text>Alamat : {data?.address}</Text>
            <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginTop: 5 }} />
            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 15 }} >Jasa</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: "space-between"
            }} >
                <Text>Jenis : {data?.service?.service}</Text>
                <Text>Harga : {data?.service?.price}/{data?.service?.unit}</Text>
            </View>
            <Text>Jumlah : {data?.amount}</Text>
            <Text>Total : {data?.price}</Text>
            <View style={{
                flexDirection: "row",
            }} >
                <Text>Deskripsi : </Text>
                <Text>{data?.description}</Text>
            </View>
            <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.2, marginTop: 5 }} />
        </View>
    )
}
const ItemStatus = ({ status, date }) => {
    return (
        <View style={{
            paddingHorizontal: 15,
            flexDirection: "row",
            justifyContent: 'space-between',
            paddingVertical: 5
        }} >
            <Text>{status}</Text>
            <Text>{date}</Text>
        </View>
    )
}

export default OrderListDetail