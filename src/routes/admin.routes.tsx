import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/admin/Home';
import { ManageEmployees } from '../screens/admin/ManageEmployees';
import { ManageClients } from '../screens/admin/ManageClients';
const Stack = createStackNavigator();

export default function AdminRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ManageEmployees" component={ManageEmployees} />
            <Stack.Screen name="ManageClients" component={ManageClients} />
        </Stack.Navigator>
    );
}