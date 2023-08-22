import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/admin/Home';
const Stack = createStackNavigator();

export default function AdminRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}