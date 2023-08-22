import { StyleSheet, View, Image, Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

interface Props extends TouchableOpacityProps {
    icon: string | any
    title: string
    color: string
    styled: boolean
}
export function Card({ icon, title, color, styled = false, onPress }: Props) {
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: color }]} onPress={onPress}>
            <View style={{ width: '30%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                {
                    styled ?
                        <Image source={icon} style={{ width: 45, height: 45 }} />
                        :
                        <Icon name={icon} size={50} color={'#444444'} />
                }

            </View>
            <View style={{ width: '60%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30, textAlign: 'center' }}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '90%',
        height: 150,
        borderRadius: 20,
        marginTop: 20,
    }
})