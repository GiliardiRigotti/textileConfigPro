import AuthRoutes from "./auth.routes";
import { NavigationContainer } from '@react-navigation/native';
import { NotifierWrapper } from 'react-native-notifier';
import { AppProvider } from "../context";
import AdminRoutes from "./admin.routes";
import AppRoutes from "./app.routes";

export function Routes() {
    return (
        <NavigationContainer>
            <AppProvider>
                <AppRoutes />
            </AppProvider>
        </NavigationContainer>
    )
}