import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from './src/context';
import { NotifierWrapper } from 'react-native-notifier';
import { Routes } from './src/routes';
import AuthRoutes from './src/routes/auth.routes';

export default function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        <NotifierWrapper>
          <AuthRoutes />
        </NotifierWrapper>
      </AppProvider>
    </NavigationContainer>
  );
}

