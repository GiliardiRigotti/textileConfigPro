import { View, Text, TextInputProps, TextInput, StyleSheet } from "react-native";

interface Props extends TextInputProps {
    title: string;
    width?: string;
}

export function Input({ title, width, ...rest }: Props) {
    return (
        <View
            style={[styles.container, { width: width }]}
        >
            <Text style={styles.title}>{title}</Text>
            <TextInput style={styles.input} value={rest.value} onChangeText={rest.onChangeText} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    input: {
        borderRadius: 5,
        backgroundColor: '#d9d9d999',
        padding: 3,
    }
})