import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { useContext } from "react";
import { AppContext } from "../context";

export function Header() {
    const { userAuth, logout } = useContext(AppContext)
    return (
        <View style={styles.container}>
            <Image source={{ uri: userAuth.photoUser }} style={{ width: 70, height: 70, resizeMode: 'contain', borderRadius: 100 }} />
            <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 25, color: '#fff' }}>{userAuth.name}</Text>
            </View>
            <TouchableOpacity onPress={logout}>
                <Icon name='logout' size={40} color={'#444444'} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        height: '17%',
        width: '100%',
        backgroundColor: '#4444',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }
})