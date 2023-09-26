import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/employee/Home';
import { MyEquipment } from '../screens/employee/MyEquipment';
import QrcodeView from '../screens/employee/QrcodeView';

const Stack = createStackNavigator();

export default function AppRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="MyEquipment" component={MyEquipment} />
            <Stack.Screen name="QrcodeView" component={QrcodeView} />
        </Stack.Navigator>
    );
}