import { Alert, FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { Header } from "../../components/Header"
import { useContext, useMemo, useState } from "react"
import { AppContext } from "../../context"
import { IClient, IOrder } from "../../interfaces/IClient"

export function MyEquipment() {
    const { listEquipments, listOrders, listDesignation, userAuth } = useContext(AppContext)
    const [modalCreate, setModalCreate] = useState<boolean>(false)
    const [modalSelect, setModalSelect] = useState<boolean>(false)
    const [load, setLoad] = useState<boolean>(false)
    const [listSelect, setListSelect] = useState<IKeyName[]>([])
    const [keyName, setKeyName] = useState<{ user: { key?: string, name: string }, equipment: { key?: string, name: string } }>()
    const [type, setType] = useState()


    /*  function handleDelete(id: string) {
 
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
                     onPress: async () => await deleteDesignation(id),
                 },
             ],
             { cancelable: false },
         );
     }
 
     function handleSelect(type: 'user' | 'equipment', item: IKeyName) {
         keyName[type] = {
             key: item.key,
             name: item.name
         }
     }
 
     function handleListSelect(list: IKeyName[], type: 'user' | 'equipment') {
         setType(type)
         setListSelect(list)
         setModalSelect(true)
     } */

    function handleAddDesignation() {
        setModalCreate(true);
    }

    /*  async function handleSend() {
         setLoad(true)
         try {
             if (!keyName?.user.key || !keyName.equipment.key) {
                 throw new Error('Esta vazio os campos')
             }
             await createDesignation({
                 userId: keyName.user.key,
                 equipamentId: keyName.equipment.key
             })
             Alert.alert('Designado com sucesso!')
             setModalCreate(false)
         } catch (error: any) {
             Alert.alert('Error:', error)
         } finally {
             setLoad(false)
         }
     } */

    const list = useMemo(() => {
        const listFiltered: { id?: string, order: IOrder, equipment: IEquipment }[] = []
        listDesignation.forEach((item) => {
            if (item.userId == userAuth?.id) {
                const equipment = listEquipments.filter((itemEquipament) => itemEquipament.id == item.equipamentId)
                const order = listOrders.filter((itemOrders) => itemOrders.equipamentId == item.equipamentId)
                listFiltered.push({
                    id: item.id,
                    order: order[0],
                    equipment: equipment[0]
                })
                console.log('Designação: ', item)
                console.log({
                    equipment: equipment[0].id
                })
            }
        })
        return listFiltered
    }, [listEquipments, listOrders, listDesignation])

    /*  const listKeyValueUsers = useMemo(() => {
         const list: IKeyName[] = []
         listUsers.forEach((item) => {
             list.push({
                 key: item.id,
                 name: item.name
             })
         })
         return list
     }, [])
 
     const listKeyValueEquipments = useMemo(() => {
         const list: IKeyName[] = []
         listEquipments.forEach((item) => {
             list.push({
                 key: item.id,
                 name: item.name
             })
         })
         return list
     }, []) */

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
                            <Text style={styles.rowTitle}>Equipamento</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.rowTitle}>Funcionário</Text>
                        </View>

                    </View>
                    {
                        list.length > 0 ?
                            list.map((item, index) => {
                                return (
                                    <View key={index} style={styles.row}>
                                        <View style={styles.columnId}>
                                            <Text style={styles.rowText}>{index + 1}</Text>
                                        </View>
                                        <View style={styles.column}>
                                            <Text style={styles.rowText}>{item.equipment}</Text>
                                        </View>
                                        <View style={styles.column}>
                                            <Text style={styles.rowText}>{item.user}</Text>
                                        </View>
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

                        </View>
                    </View>
                </Modal>
                <TouchableOpacity onPress={handleAddDesignation} style={{ position: 'absolute', right: 40, bottom: 20, backgroundColor: '#d9d9d9', width: 60, height: 60, borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
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