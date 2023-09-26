import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Text, View, StyleSheet, Button, Modal, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AppContext } from '../../context';
import { IOrder, IOrderView } from '../../interfaces/IClient';
import { IUser } from '../../interfaces/IUser';

export default function QrcodeView({ navigation }) {
    const { listEquipments, listOrders, listDesignation, userAuth, listClients, listUsers } = useContext(AppContext)
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [modal, setModal] = useState<boolean>(false)
    const [order, setOrder] = useState<{ id?: string, orders: IOrder[], user: IUser, equipment: IEquipment }>()

    const list = useMemo(() => {
        const listFiltered: IOrderView[] = []
        const listFilteredEquipment: { id?: string, orders: IOrder[], user: IUser, equipment: IEquipment }[] = []
        listDesignation.forEach((item) => {
            const equipment = listEquipments.filter((itemEquipment) => itemEquipment.id == item.equipamentId)
            const user = listUsers.filter((itemUsers) => itemUsers.id == item.userId)
            const orders = listOrders.filter((itemOrder) => itemOrder.equipmentId == item.equipamentId)
            listFilteredEquipment.push({
                id: item.id,
                orders: orders,
                equipment: equipment[0],
                user: user[0]
            })

        })
        listOrders.forEach((item) => {
            const equipment = listEquipments.filter((itemEquipment) => itemEquipment.id == item.equipmentId)
            const client = listClients.filter((itemClient) => itemClient.id == item.clientId)
            listFiltered.push({
                id: item.id,
                order: item,
                equipment: equipment[0],
                client: client[0]
            })
        })

        return listFilteredEquipment
    }, [listEquipments, listOrders, listDesignation])

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        const order = list.filter((item) => item.equipment.id == data)
        if (order.length > 0) {
            setOrder(order[0])
            setModal(true)
        } else {
            alert(`Você não foi designado para este equipamento\nFavor caso queira ter acesso, fale com seu supervisor`);
            setScanned(false)
        }

    };


    function handleNavigationHome() {
        navigation.navigate("Home")
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <>
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
            <TouchableOpacity onPress={handleNavigationHome} style={[styles.button, { backgroundColor: '#e4a74c' }]}>
                <Text style={styles.buttonTitle}>Home</Text>
            </TouchableOpacity>
            <Modal
                visible={modal}
                transparent
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={[styles.list, { width: '80%', padding: 20 }, styles.shadow]}>
                        <TouchableOpacity onPress={() => {
                            setModal(false)
                            setScanned(false)
                        }}>
                            <Icon name="close" size={20} />
                        </TouchableOpacity>
                        <Text style={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold' }}>Pedido</Text>
                        <View style={styles.orderView}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Qauntidade de Pedidos:
                            </Text>
                            <Text>
                                {order?.orders.length}
                            </Text>
                        </View>
                        <View style={styles.orderView}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Responsavel:
                            </Text>
                            <Text>
                                {order?.user.name}
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
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    list: {
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 25,
        padding: 10,
        width: '85%',
        backgroundColor: '#fff'
    },
    orderView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
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
});
