import { Alert, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { Header } from "../../components/Header"
import { useContext, useState } from "react"
import { AppContext } from "../../context"
import { ICreateUser, IUser } from "../../interfaces/IUser"
import { Select } from "../../components/Select"
import { Input } from "../../components/Input"
import { AttachImage } from "../../components/AttachImage"
import { IClient } from "../../interfaces/IClient"

export function ManageClients() {
    const { listClients, createClient, deleteClient } = useContext(AppContext);
    const [modalCreate, setModalCreate] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<IClient>()
    const [load, setLoad] = useState<boolean>(false)

    function handleDelete(id: string) {

        Alert.alert(
            'Aviso',
            'Tem certeza que quer deletar?',
            [
                {
                    text: 'Não',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: async () => await deleteClient(id),
                },
            ],
            { cancelable: false },
        );
    }

    function handleAddUser() {
        setModalCreate(true);
    }

    async function handleSend() {
        setLoad(true)
        try {
            if (!newUser) {
                throw new Error('Esta vazio a edição')
            }
            await createClient(newUser)
            Alert.alert('Criado cliente com sucesso!')
            setModalCreate(false)
        } catch (error: any) {
            Alert.alert('Error:', error)
        } finally {
            setLoad(false)
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
                        listClients.length > 0 ?
                            listClients.map((user, index) => {
                                console.log(index)
                                return (
                                    <View key={user.id} style={styles.row}>
                                        <View style={styles.columnId}>
                                            <Text style={styles.rowText}>{index}</Text>
                                        </View>
                                        <View style={styles.column}>
                                            <Text style={styles.rowText}>{user.name}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.column} onPress={() => handleDelete(user.id)}>
                                            <Icon name="delete" size={25} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                            :
                            <Text style={{ alignSelf: "center" }}>Sem clientes cadastrados</Text>
                    }
                </ScrollView >
                <Modal
                    visible={modalCreate}
                    transparent
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={[styles.list, { height: '80%', width: '90%' }, styles.shadow]}>
                            <TouchableOpacity onPress={() => setModalCreate(false)}>
                                <Icon name="close" size={20} />
                            </TouchableOpacity>
                            <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold' }}>Cadastro de Cliente</Text>
                            <Input title="Nome" onChangeText={(value) => setNewUser({ ...newUser, name: value })} />
                            <Input title="E-mail" onChangeText={(value) => setNewUser({ ...newUser, email: value })} />
                            <Input title="Telefone" maxLength={11} onChangeText={(value) => setNewUser({ ...newUser, phone: value })} />
                            <TouchableOpacity onPress={handleSend} style={[styles.button, { backgroundColor: '#84ff68' }]} disabled={load}>
                                <Text style={styles.buttonTitle}>Enviar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity onPress={handleAddUser} style={{ position: 'absolute', right: 40, bottom: 20, backgroundColor: '#d9d9d9', width: 60, height: 60, borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
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