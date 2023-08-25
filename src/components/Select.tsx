import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from "react-native";

interface Item {
    index: number;
    value: string;
    name: string;
}
interface Props {
    title: string;
    onChange: () => string;
    items: Item[];
}

export function Select({ title, items, onChange }: Props) {
    const [modal, setModal] = useState<boolean>(false)
    const [selected, setSelected] = useState<Item>()

    function handleSelected(index: number) {
        setSelected(items[index])
        setModal(false)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.input} onPress={() => setModal(true)}>
                {
                    !!selected ?
                        <TextInput value={selected.name} editable={false} onChangeText={onChange} style={{ color: '#000' }} />
                        :
                        <Text>Selecione</Text>
                }

            </TouchableOpacity>
            <Modal
                visible={modal}
                transparent
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={[styles.list, styles.shadow]}>
                        {
                            items.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => handleSelected(index)} style={[styles.input, { marginBottom: 5, alignItems: 'center' }]}>
                                    <Text>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
            </Modal>
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
        padding: 5
    },
    list: {
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 25,
        padding: 10,
        width: '70%',
        backgroundColor: '#fff'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})