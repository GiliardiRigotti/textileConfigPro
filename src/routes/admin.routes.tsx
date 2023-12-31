import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/admin/Home';
import { ManageEmployees } from '../screens/admin/ManageEmployees';
import { ManageClients } from '../screens/admin/ManageClients';
import { ManageEquipments } from '../screens/admin/ManageEquipments';
import { DesignateEmployee } from '../screens/admin/DesignateEmployee';
import { ManageOrders } from '../screens/admin/ManageOrders';
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
            <Stack.Screen name="ManageEquipments" component={ManageEquipments} />
            <Stack.Screen name="DesignateEmployee" component={DesignateEmployee} />
            <Stack.Screen name="ManageOrders" component={ManageOrders} />
        </Stack.Navigator>
    );
}