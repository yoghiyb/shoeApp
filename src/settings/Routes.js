
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useReducer, useEffect, useMemo, createContext } from 'react';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { HistoryTab, HomeTab, Login, Map, Order, Register, User, History, SplashScreen, Shop, CreateService, ShopSettings, ShopView, ImagePickers, OrderList, OrderListDetail, OrderHistory } from '../components';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

// inisiasi navigasi
// stack navigasi
const Stack = createStackNavigator();
// tab navigasi
const Tab = createBottomTabNavigator();

// component home untuk user
const Home = () => {
    return (
        // menggunakan Tab navigasi
        <Tab.Navigator
            // Pengaturan warna Tab navigasi ketika aktif atau tidak
            tabBarOptions={{
                activeTintColor: 'dodgerblue',
                inactiveTintColor: 'gray',
            }}
            // pengaturan tab icon
            screenOptions={
                ({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName
                        if (route.name == 'homeTab') {
                            iconName = 'shoe-prints'
                        } else if (route.name == 'historyTab') {
                            iconName = 'history'
                        } else if (route.name == 'userTab') {
                            iconName = 'user-cog'
                        }

                        return <Icon name={iconName} color={color} size={size} />
                    }
                })
            }
            // keyboard melayang diatas Tab navigasi
            keyboardHidesTabBar={true}
        >
            {/* isi dari Tab navigasi */}
            <Tab.Screen name="homeTab" component={HomeTab} options={{ tabBarLabel: 'Beranda' }} />
            <Tab.Screen name="historyTab" component={HistoryTab} options={{ tabBarLabel: 'Riwayat' }} />
            <Tab.Screen name="userTab" component={User} options={{ tabBarLabel: 'User' }} />
        </Tab.Navigator>
    )
}

// component home untuk partner
const HomeMitra = () => {
    return (
        // menggunakan Tab navigasi
        <Tab.Navigator
            // Pengaturan warna Tab navigasi ketika aktif atau tidak
            tabBarOptions={{
                activeTintColor: 'dodgerblue',
                inactiveTintColor: 'gray',
            }}
            // pengaturan tab icon
            screenOptions={
                ({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName
                        if (route.name == 'orderList') {
                            iconName = 'clipboard-list'
                        } else if (route.name == 'orderHist') {
                            iconName = 'history'
                        } else if (route.name == 'userTab') {
                            iconName = 'user-cog'
                        }

                        return <Icon name={iconName} color={color} size={size} />
                    }
                })
            }
            // keyboard melayang diatas Tab navigasi
            keyboardHidesTabBar={true}
        >
            {/* isi dari Tab navigasi */}
            <Tab.Screen name="orderList" component={OrderList} options={{ tabBarLabel: 'Daftar Pesanan' }} />
            <Tab.Screen name="orderHist" component={OrderHistory} options={{ tabBarLabel: 'Riwayat Pesanan' }} />
            <Tab.Screen name="userTab" component={User} options={{ tabBarLabel: 'User' }} />
        </Tab.Navigator>
    )
}
export const AuthContext = createContext();

export const reducer = (prevState, action) => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            return {
                ...prevState,
                userToken: action.token,
                isLoading: false

            }
        case 'SIGN_IN':
            return {
                ...prevState,
                userToken: action.token,
                isSignout: false,
                user: action.user,
                isMitra: action.isMitra
            }

        case 'SIGN_OUT':
            return {
                ...prevState,
                isSignout: true,
                isMitra: false,
                userToken: null,
                user: null,
            }
    }
}

// component routes untuk navigasi
const Routes = () => {
    const baseUrl = `http://192.168.0.76:80/Laravel/shoeApp/public/api`
    const [state, dispatch] = useReducer(
        reducer,
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
            user: null,
            isMitra: false
        }
    )

    useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                Alert.alert(e)
            }

            dispatch({ type: 'RESTORE_TOKEN', token: JSON.parse(userToken) })
        }

        bootstrapAsync()
    }, [])

    const authContext = useMemo(
        () => ({
            signIn: async data => {
                // console.log(data)
                const { email, password, isMitra } = data
                if (email == '' || password == '') {
                    Alert.alert('Username dan Password tidak boleh kosong!')
                } else {
                    let endpoint
                    if (isMitra) {
                        endpoint = `${baseUrl}/partners/login`
                    } else {
                        endpoint = `${baseUrl}/login`
                    }

                    try {
                        let response = await axios.post(endpoint, data)
                        const { token, user } = response.data
                        dispatch({ type: 'SIGN_IN', token, user, isMitra })
                    } catch (error) {
                        if (error.response.data.error == 'invalid_credentials') {
                            Alert.alert('Login Gagal', 'Masukkan Email dan Password yang terdaftar')
                        }
                    }
                }
            },
            signOut: async () => {
                await AsyncStorage.removeItem('userToken')
                dispatch({ type: 'SIGN_OUT' })
            },
            signUp: async data => {
                if (data.name == null || data.name == '' || data.email == null || data.email == '' || data.password == null || data.password == '') {
                    Alert.alert('', 'Harap isi semua kolom!')
                } else {
                    let endpoint = `${baseUrl}/register`

                    try {
                        let response = await axios.post(endpoint, data)

                        const { token, user } = response.data

                        dispatch({ type: 'SIGN_IN', token, user, isMitra: data.isMitra })
                    } catch (error) {
                        console.log(error.response)
                    }
                }
            },
        }),
        []
    )

    return (
        <NavigationContainer>
            <AuthContext.Provider value={[state, authContext, baseUrl]}  >
                {
                    state.userToken == null && state.user == null ? (
                        <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }} >
                            <Stack.Screen name="login" component={Login} />
                            <Stack.Screen name="register" component={Register} />
                            <Stack.Screen name="splashScreen" component={SplashScreen} />
                        </Stack.Navigator>
                    ) : (
                            <Stack.Navigator screenOptions={{ headerShown: false }} >
                                {state.isMitra == true ?
                                    <Stack.Screen name="home" component={HomeMitra} />
                                    :
                                    <Stack.Screen name="home" component={Home} />
                                }
                                <Stack.Screen name="order" component={Order} options={{ headerShown: true, title: '' }} />
                                <Stack.Screen name="history" component={History} options={{ headerShown: true, title: 'Riwayat' }} />
                                <Stack.Screen name="map" component={Map} options={{ headerShown: true, title: 'Map' }} />
                                <Stack.Screen name="shop" component={Shop} />
                                <Stack.Screen name="createService" component={CreateService} />
                                <Stack.Screen name="shopSettings" component={ShopSettings} />
                                <Stack.Screen name="shopView" component={ShopView} />
                                <Stack.Screen name="orderListDetail" component={OrderListDetail} options={{ headerShown: true, title: 'Detail Pesanan' }} />
                                <Stack.Screen name="imagePicker" component={ImagePickers} options={{ headerShown: true, title: '' }} />
                            </Stack.Navigator>
                        )
                }
            </AuthContext.Provider>
        </NavigationContainer>
    )
}

export default Routes