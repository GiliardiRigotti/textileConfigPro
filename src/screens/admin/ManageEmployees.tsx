import { Alert, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { Header } from "../../components/Header"
import { useContext, useState } from "react"
import { AppContext } from "../../context"
import { IUser } from "../../interfaces/IUser"
import { Select } from "../../components/Select"
import { Input } from "../../components/Input"
import { AttachImage } from "../../components/AttachImage"

export function ManageEmployees() {
    const { listUsers, createUser } = useContext(AppContext);
    const [modal, setModal] = useState<boolean>(false);
    const [edit, setEdit] = useState<IUser>();
    const [load, setLoad] = useState<boolean>(false)

    function handleEdit(index: number) {
        setModal(true);
        setEdit(listUsers[index]);
    }

    async function handleSend() {
        setLoad(true)
        try {
            if (!edit) {
                throw new Error('Esta vazio a edição')
            }
            //await createUser(edit)
        } catch (error) {
            Alert.alert('Error:', error)
        }
    }

    return (
        <>
            <Header />
            <View style={styles.container}>

                <ScrollView
                    style={[styles.list, styles.shadow]}
                >
                    <View style={[styles.row, { marginBottom: 10 }]}>
                        <View style={styles.columnId}>
                            <Text style={styles.rowTitle}>ID</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.rowTitle}>Funcionário</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.rowTitle}>Configuração</Text>
                        </View>
                    </View>
                    {
                        listUsers.length > 0 ?
                            listUsers.map((user, index) => {
                                console.log(index)
                                return (
                                    <View key={user.uuidLogin} style={styles.row}>
                                        <View style={styles.columnId}>
                                            <Text style={styles.rowText}>{index}</Text>
                                        </View>
                                        <View style={styles.column}>
                                            <Text style={styles.rowText}>{user.name}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.column} onPress={() => handleEdit(index)}>
                                            <Icon name="pencil" size={25} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                            :
                            <Text>Sem funcionarios cadastrados</Text>
                    }
                </ScrollView >
                <Modal
                    visible={modal}
                    transparent
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={[styles.list, { height: '80%', width: '90%' }, styles.shadow]}>
                            <TouchableOpacity onPress={() => setModal(false)}>
                                <Icon name="close" size={20} />
                            </TouchableOpacity>
                            <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold' }}>Cadastro de Cliente</Text>
                            <Input title="Nome" value={edit?.name} onChangeText={(value) => setEdit({ ...edit, name: value })} />
                            <Select title="Cargo" items={[{
                                index: 0,
                                value: 'coordinator',
                                name: 'coordenador'
                            }, {
                                index: 1,
                                value: 'employee',
                                name: 'empregado'
                            }, {
                                index: 2,
                                value: 'admin',
                                name: 'administrador'
                            },]}
                                onSelected={(value) => setEdit({ ...edit, role: value })}
                            />
                            <AttachImage onGetImage={(value) => setEdit({ ...edit, photoUser: value.assets[0].uri })} />
                            <TouchableOpacity onPress={() => { }} style={[styles.button, { backgroundColor: '#84ff68' }]}>
                                <Text style={styles.buttonTitle}>Enviar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity style={{ position: 'absolute', right: 40, bottom: 20, backgroundColor: '#d9d9d9', width: 60, height: 60, borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 40, color: 'white' }}>+</Text>
                </TouchableOpacity>
            </View >
        </>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    list: {
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 25,
        padding: 10,
        width: '85%',
        backgroundColor: '#fff'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    rowText: {
        fontSize: 16,
    },
    column: {
        width: '35%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    columnId: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    button: {
        alignSelf: 'center',
        width: '45%',
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonTitle: {
        color: '#fff',
        fontWeight: 'bold',
    }
})