import { View, Image } from "react-native";

export function Logo() {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', height: '10%', width: '100%', }}>
            <Image source={require('../assets/logo.png')} style={{ resizeMode: 'contain' }} />
        </View>
    )
}