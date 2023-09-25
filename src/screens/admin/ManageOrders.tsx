import { Alert, FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { Header } from "../../components/Header"
import { useContext, useEffect, useMemo, useState } from "react"
import { AppContext } from "../../context"
import { ICreateUser, IUser } from "../../interfaces/IUser"
import { Select } from "../../components/Select"
import { Input } from "../../components/Input"
import { AttachImage } from "../../components/AttachImage"
import { IClient, IOrder } from "../../interfaces/IClient"

export function ManageOrders() {
    const { listOrders, createOrder, deleteOrder, listClients, listEquipments } = useContext(AppContext);
    const [modalCreate, setModalCreate] = useState<boolean>(false);
    const [modalSelect, setModalSelect] = useState<boolean>(false);
    const [modalViewOrder, setModalViewOrder] = useState<boolean>(false);
    const [modalViewConfig, setModalViewConfig] = useState<boolean>(false);
    const [listSelect, setListSelect] = useState<IKeyName[]>([]);
    const [keyName, setKeyName] = useState<{ client: { key?: string, name: string }, equipment: { key?: string, name: string } }>({
        client: {
            name: '',
            key: ''
        },
        equipment: {
            name: '',
            key: ''
        },
    })
    const [orderView, setOrderView] = useState<{ id?: string, client: string, order: string, many: number, filename: string }>()
    const [newOrder, setNewOrder] = useState<IOrder>({
        clientId: '',
        many: 0,
        order: '',
        filename: ''
    });
    const [load, setLoad] = useState<boolean>(false);
    const [type, setType] = useState()


    function handleOrderView(item: IOrder) {
        setOrderView(item)
        setModalViewOrder(true)
    }

    function handleSelect(type: 'client' | 'equipment', item: IKeyName) {
        if (!item) {
            return
        }
        if (type == 'client') {
            setKeyName({ ...keyName, client: { key: item.key, name: item.name } })
            setNewOrder({ ...newOrder, clientId: item.key })
        } else {
            setKeyName({ ...keyName, equipment: { key: item.key, name: item.name } })
            setNewOrder({ ...newOrder, equipamentId: item.key })
        }
        /* keyName[type] = {
            key: item.key,
            name: item.name
        } */
        setModalSelect(false)
    }

    /* function handleSelect(item: IKeyName) {
        if (item) {
            setKeyName({
                key: item.key,
                name: item.name
            })
            setNewOrder({ ...newOrder, clientId: item.key })
            setModalSelect(false)
        }
    } */

    function handleListSelect(list: IKeyName[], type: 'client' | 'equipment') {
        setType(type)
        setListSelect(list)
        setModalSelect(true)
    }

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
                    onPress: async () => {
                        await deleteOrder(id)
                        setModalViewOrder(false)
                    },
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
            if (!newOrder) {
                throw new Error('Esta vazio a edição')
            }
            await createOrder(newOrder)
            Alert.alert('Criado o pedido com sucesso!')
            setModalCreate(false)
        } catch (error: any) {
            Alert.alert('Error:', error)
        } finally {
            setLoad(false)
        }
    }

    const list = useMemo(() => {
        const listFiltered: { id?: string, client: string, order: string, many: number, filename: string }[] = []
        listOrders.forEach((item) => {
            const client = listClients.filter((itemClient) => itemClient.id == item.clientId)
            listFiltered.push({
                id: item.id,
                client: client[0].name,
                order: item.order,
                many: item.many,
                filename: item.filename
            })
        })
        return listFiltered
    }, [listClients, listOrders])

    const listKeyValueClients = useMemo(() => {
        const list: IKeyName[] = []
        listClients.forEach((item) => {
            list.push({
                key: item.id,
                name: item.name
            })
        })
        return list
    }, [listClients])

    const listKeyValueEquipments = useMemo(() => {
        const list: IKeyName[] = []
        listEquipments.forEach((item) => {
            list.push({
                key: item.id,
                name: item.name
            })
        })
        return list
    }, [])

    useEffect(() => { console.log(keyName?.client.name, keyName?.equipment.name) }, [keyName])

    return (
        <>
            <Header />
            <View style={styles.container}>

                <ScrollView
                    style={[styles.list, styles.shadow]}
                >
                    <View style={[styles.row]}>
                        <View style={styles.columnId}>
                            <Text style={styles.rowTitle}>ID</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.rowTitle}>Pedido</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.rowTitle}>Cliente</Text>
                        </View>
                    </View>
                    {
                        list.length > 0 ?
                            list.map((item, index) => {
                                return (
                                    <TouchableOpacity key={item.id} style={styles.row} onPress={() => handleOrderView(item)}>
                                        <View style={styles.columnId}>
                                            <Text style={styles.rowText}>{index + 1}</Text>
                                        </View>
                                        <View style={styles.column}>
                                            <Text style={styles.rowText}>{item.order}</Text>
                                        </View>
                                        <View style={styles.column}>
                                            <Text style={styles.rowText}>{item.client}</Text>
                                        </View>
                                        {/* <TouchableOpacity style={styles.column} onPress={() => handleDelete(user.id)}>
                                            <Icon name="delete" size={25} />
                                        </TouchableOpacity> */}
                                    </TouchableOpacity>
                                )
                            })
                            :
                            <Text style={{ alignSelf: "center" }}>Sem pedidos</Text>
                    }
                </ScrollView >
                <View style={styles.optionBar}>
                    <TouchableOpacity onPress={handleAddUser} style={{ backgroundColor: '#d9d9d9', width: 60, height: 60, borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 40, color: 'white' }}>+</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    visible={modalViewOrder}
                    transparent
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={[styles.list, { height: '50%', width: '90%', paddingLeft: 20, paddingRight: 20 }, styles.shadow]}>
                            <TouchableOpacity onPress={() => setModalViewOrder(false)}>
                                <Icon name="close" size={20} />
                            </TouchableOpacity>
                            <View style={styles.orderView}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    Cliente:
                                </Text>
                                <Text>
                                    {orderView?.client}
                                </Text>
                            </View>
                            <View style={styles.orderView}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    Pedido:
                                </Text>
                                <Text>
                                    {orderView?.order}
                                </Text>
                            </View>
                            <View style={styles.orderView}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    Quantidade:
                                </Text>
                                <Text>
                                    {orderView?.many}
                                </Text>
                            </View>
                            <View style={styles.orderView}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    Nome do Arquivo:
                                </Text>
                                <Text>
                                    {orderView?.filename}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => handleDelete(orderView?.id)} style={[styles.button, { backgroundColor: '#ff6868' }]} disabled={load}>
                                <Text style={styles.buttonTitle}>Deletar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    visible={modalCreate}
                    transparent
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={[styles.list, { height: '80%', width: '90%' }, styles.shadow]}>
                            <TouchableOpacity onPress={() => setModalCreate(false)}>
                                <Icon name="close" size={20} />
                            </TouchableOpacity>
                            <ScrollView>
                                <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold' }}>Novo Pedido</Text>
                                <TouchableOpacity onPress={() => handleListSelect(listKeyValueClients, 'client')} style={[styles.select, styles.shadow]}>
                                    {
                                        keyName.client.name !== '' ?
                                            <Text>{keyName.client.name}</Text>
                                            :
                                            <Text>Selecionar Cliente</Text>
                                    }

                                </TouchableOpacity>
                                <Input title="Pedido" onChangeText={(value) => setNewOrder({ ...newOrder, order: value })} />
                                <Input title="Quantidade" onChangeText={(value) => setNewOrder({ ...newOrder, many: parseInt(value, 10) })} keyboardType="number-pad" />
                                <Input title="Nome do arquivo" onChangeText={(value) => setNewOrder({ ...newOrder, filename: value })} />
                                <TouchableOpacity onPress={() => handleListSelect(listKeyValueEquipments, 'equipment')} style={[styles.select, styles.shadow]}>
                                    {
                                        keyName.equipment.name !== '' ?
                                            <Text>{keyName.equipment.name}</Text>
                                            :
                                            <Text>Selecionar Equipamento</Text>
                                    }

                                </TouchableOpacity>
                                {/* <TouchableOpacity onPress={() => { }} style={[styles.select, styles.shadow]}>
                                <Text>Configuração</Text>
                            </TouchableOpacity> */}

                                <Input title="Comprimento Tear CRU" onChangeText={(value) => setNewOrder({ ...newOrder, filename: value })} />
                                <Input title="Comprimento Tear Acabado" onChangeText={(value) => setNewOrder({ ...newOrder, filename: value })} />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Input title="Largura Tear CRU" onChangeText={(value) => setNewOrder({ ...newOrder, filename: value })} width='45%' />
                                    <Input title="Largura Tear Acabado" onChangeText={(value) => setNewOrder({ ...newOrder, filename: value })} width='45%' />
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Input title="Peso Tear" onChangeText={(value) => setNewOrder({ ...newOrder, filename: value })} width='45%' />
                                    <Input title="Peso Acabado" onChangeText={(value) => setNewOrder({ ...newOrder, filename: value })} width='45%' />
                                </View>

                                <Input title="Altura Felpa" onChangeText={(value) => setNewOrder({ ...newOrder, filename: value })} />
                                <Text style={styles.title}>Densidades</Text>
                                <Input title="1" onChangeText={(value) => setNewOrder({ ...newOrder, filename: value })} />
                                <Input title="2" onChangeText={(value) => setNewOrder({ ...newOrder, filename: value })} />
                                <Input title="3" onChangeText={(value) => setNewOrder({ ...newOrder, filename: value })} />
                                <Text style={styles.title}>Tramas Seletores</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Input title="CRU" onChangeText={(value) => setNewOrder({ ...newOrder, filename: value })} width="45%" />
                                    <View style={{ width: "45%" }}>
                                        <Input title="Poliester 1" onChangeText={(value) => setNewOrder({ ...newOrder, filename: value })} />
                                        <Input title="Poliester 2" onChangeText={(value) => setNewOrder({ ...newOrder, filename: value })} />
                                        <Input title="Poliester 3" onChangeText={(value) => setNewOrder({ ...newOrder, filename: value })} />
                                    </View>
                                </View>
                                <Text>Urdumes</Text>
                                <Input title="Base" onChangeText={(value) => setNewOrder({ ...newOrder, filename: value })} />
                                <Input title="Felpa" onChangeText={(value) => setNewOrder({ ...newOrder, filename: value })} />
                                <Input title="Obs.:" onChangeText={(value) => setNewOrder({ ...newOrder, filename: value })} />
                                <TouchableOpacity onPress={handleSend} style={[styles.button, { backgroundColor: '#84ff68' }]} disabled={load}>
                                    <Text style={styles.buttonTitle}>Enviar</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                    <Modal
                        visible={modalSelect}
                        transparent
                    >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={[styles.list, { height: '80%', width: '90%' }, styles.shadow]}>
                                <TouchableOpacity onPress={() => setModalCreate(false)}>
                                    <Icon name="close" size={20} />
                                </TouchableOpacity>
                                <FlatList
                                    contentContainerStyle={{
                                        width: '100%',
                                    }}
                                    data={listSelect}
                                    keyExtractor={(item) => item.name}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => handleSelect(type, item)} style={{
                                            width: '100%',
                                            alignItems: 'center',
                                            padding: 5,
                                            borderBottomWidth: 1
                                        }}>
                                            <Text>{item.name}</Text>
                                        </TouchableOpacity>

                                    )}
                                />
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        visible={modalViewConfig}
                        transparent
                    >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={[styles.list, { height: '50%', width: '90%', paddingLeft: 20, paddingRight: 20 }, styles.shadow]}>
                                <TouchableOpacity onPress={() => setModalViewOrder(false)}>
                                    <Icon name="close" size={20} />
                                </TouchableOpacity>
                                <ScrollView>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Input title="Artigo" />
                                        <Input title="Programa" />
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Input title="Desenho" />
                                        <Input title="Programa" />
                                    </View>
                                </ScrollView>


                            </View>
                        </View>
                    </Modal>
                </Modal>
            </View >
        </>

    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    list: {
        marginTop: 20,
        borderRadius: 25,
        padding: 10,
        width: '85%',
        backgroundColor: '#fff'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        borderBottomWidth: 1
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
    },
    optionBar: {
        marginTop: 10,
        marginBottom: 10,
        width: '90%',
        alignItems: 'flex-end'
    },
    select: {
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: 35,
        marginTop: 15
    },
    orderView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    }
})