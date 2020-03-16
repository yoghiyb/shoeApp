
import { View, Text, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { HistoryTab, HomeTab, Login, Map, Order, Register, User } from '../components';




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

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }} >
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="register" component={Register} />
                <Stack.Screen name="home" component={Home} />
                <Stack.Screen name="order" component={Order} options={{ headerShown: true, title: '' }} />
                <Stack.Screen name="map" component={Map} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes