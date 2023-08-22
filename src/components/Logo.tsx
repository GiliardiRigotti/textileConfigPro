import { View, Image } from "react-native";

export function Logo() {
    return (
        <View style={{ width: '100%' }}>
            <Image source={require('../assets/logo.png')} style={{ width: '100%', height: '40%', resizeMode: 'contain' }} />
        </View>
    )
}