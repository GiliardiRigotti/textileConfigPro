import { Alert, FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { Header } from "../../components/Header"
import { useContext, useMemo, useState } from "react"
import { AppContext } from "../../context"
import { IClient, IOrder, IOrderView } from "../../interfaces/IClient"

export function MyEquipment({ navigation }) {
    const { listEquipments, listOrders, listDesignation, userAuth, listClients } = useContext(AppContext)
    const [modal, setModal] = useState<boolean>(false)
    const [order, setOrder] = useState<IOrderView>()

    function handleNavigationHome() {
        navigation.navigate("Home")
    }

    function handleViewOrder(item: IOrderView) {
        setOrder(item);
        setModal(true);
    }

    const list = useMemo(() => {
        const listFiltered: IOrderView[] = []
        listOrders.forEach((item) => {
            const equipment = listEquipments.filter((itemEquipment) => itemEquipment.id == item.equipmentId)
            const client = listClients.filter((itemClient) => itemClient.id == item.clientId)
            const designation = listDesignation.filter((itemDesignation) => itemDesignation.equipmentId == item.equipmentId)
            console.log('UserId ', item)
            //if (designation.length > 0) {
            listFiltered.push({
                id: item.id,
                order: item,
                equipment: equipment[0],
                client: client[0]
            })
            //}
        })

        return listFiltered
    }, [listEquipments, listOrders, listDesignation])

    return (
        <>
            <Header />
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigationHome} style={[styles.button, { backgroundColor: '#e4a74c' }]}>
                    <Text style={styles.buttonTitle}>Home</Text>
                </TouchableOpacity>
                <ScrollView
                    style={[styles.list, styles.shadow]}
                >
                    <View style={[styles.row, { marginBottom: 10 }]}>
                        <View style={styles.columnId}>
                            <Text style={styles.rowTitle}>ID</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.rowTitle}>Pedido</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.rowTitle}>Equipamento</Text>
                        </View>
                    </View>
                    {
                        list.length > 0 ?
                            list.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} style={styles.row} onPress={() => handleViewOrder(item)}>
                                        <View style={styles.columnId}>
                                            <Text style={styles.rowText}>{index + 1}</Text>
                                        </View>
                                        <View style={styles.column}>
                                            <Text style={styles.rowText}>{item.order.order}</Text>
                                        </View>
                                        <View style={styles.column}>
                                            <Text style={styles.rowText}>{item.equipment.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                            :
                            <Text style={{ alignSelf: "center" }}>Sem clientes cadastrados</Text>
                    }
                </ScrollView >
                <Modal
                    visible={modal}
                    transparent
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={[styles.list, { width: '80%', padding: 20 }, styles.shadow]}>
                            <TouchableOpacity onPress={() => setModal(false)}>
                                <Icon name="close" size={20} />
                            </TouchableOpacity>
                            <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold' }}>Pedido</Text>
                            <View style={styles.orderView}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    Item:
                                </Text>
                                <Text>
                                    {order?.order.order}
                                </Text>
                            </View>
                            <View style={styles.orderView}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    Quantidade:
                                </Text>
                                <Text>
                                    {order?.order.many}
                                </Text>
                            </View>
                            <View style={styles.orderView}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    Cliente:
                                </Text>
                                <Text>
                                    {order?.client.name}
                                </Text>
                            </View>
                            <View style={styles.orderView}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    Equipamento:
                                </Text>
                                <Text>
                                    {order?.equipment.name}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Modal>
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
        fontSize: 14,
        fontWeight: 'bold',
    },
    rowText: {
        fontSize: 16,
    },
    column: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    columnId: {
        width: '10%',
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
        width: '80%',
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18
    },
    orderView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    }
})