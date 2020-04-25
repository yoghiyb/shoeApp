
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useReducer, useEffect, useMemo, createContext } from 'react';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { HistoryTab, HomeTab, Login, Map, Order, Register, User, History, SplashScreen, Shop, CreateService, ShopSettings, ShopView, ImagePickers } from '../components';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: 'dodgerblue',
                inactiveTintColor: 'gray',
            }}
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
            keyboardHidesTabBar={true}
        >
            <Tab.Screen name="homeTab" component={HomeTab} options={{ tabBarLabel: 'Home' }} />
            <Tab.Screen name="historyTab" component={HistoryTab} options={{ tabBarLabel: 'History' }} />
            <Tab.Screen name="userTab" component={User} options={{ tabBarLabel: 'User' }} />
        </Tab.Navigator>
    )
}

const HomeMitra = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: 'dodgerblue',
                inactiveTintColor: 'gray',
            }}
            screenOptions={
                ({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName
                        if (route.name == 'historyTab') {
                            iconName = 'history'
                        } else if (route.name == 'userTab') {
                            iconName = 'user-cog'
                        }

                        return <Icon name={iconName} color={color} size={size} />
                    }
                })
            }
            keyboardHidesTabBar={true}
        >
            {/* <Tab.Screen name="homeTab" component={HomeTab} options={{ tabBarLabel: 'Home' }} /> */}
            <Tab.Screen name="historyTab" component={HistoryTab} options={{ tabBarLabel: 'History' }} />
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
                        endpoint = `http://192.168.0.76:80/Laravel/shoeApp/public/api/partners/login`
                    } else {
                        endpoint = `http://192.168.0.76:80/Laravel/shoeApp/public/api/login`
                    }

                    let response = await axios.post(endpoint, data)
                    // console.log('cek respon dari route', response.data)
                    const { token, user } = response.data
                    await AsyncStorage.setItem('userToken', JSON.stringify(token))
                    dispatch({ type: 'SIGN_IN', token, user, isMitra })
                }
            },
            signOut: async () => {
                await AsyncStorage.removeItem('userToken')
                dispatch({ type: 'SIGN_OUT' })
            },
            signUp: async data => {
                // let endpoint = 'localhost:8000/api/register'
                // let rensponse = await axios.post(endpoint, data)

                dispatch({ type: 'SIGN_IN', token: 'dummy-token' })
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
                                <Stack.Screen name="history" component={History} options={{ headerShown: true, title: 'History' }} />
                                <Stack.Screen name="map" component={Map} options={{ headerShown: true, title: 'Map' }} />
                                <Stack.Screen name="shop" component={Shop} />
                                <Stack.Screen name="createService" component={CreateService} />
                                <Stack.Screen name="shopSettings" component={ShopSettings} />
                                <Stack.Screen name="shopView" component={ShopView} />
                                <Stack.Screen name="imagePicker" component={ImagePickers} options={{ headerShown: true, title: '' }} />
                            </Stack.Navigator>

                        )
                }
            </AuthContext.Provider>
        </NavigationContainer>
    )
}

export default Routes