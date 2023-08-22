import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

interface Props {
    name: string,
    image: string,
}

export function Header() {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/admin.jpg')} style={{ width: 70, height: 70, resizeMode: 'contain', borderRadius: 100 }} />
            <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 25, color: '#fff' }}>Felipe Gomes</Text>
            </View>
            <TouchableOpacity>
                <Icon name='logout' size={40} color={'#444444'} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        height: '20%',
        width: '100%',
        backgroundColor: '#4444',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }
})