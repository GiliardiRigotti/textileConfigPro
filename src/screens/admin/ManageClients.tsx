import { ScrollView, StyleSheet, Text, View } from "react-native"
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { Header } from "../../components/Header"
import { useContext } from "react"
import { AppContext } from "../../context"

export function ManageClients() {
    const { listUsers } = useContext(AppContext);
    return (
        <>
            <Header />
            <View style={styles.container}>

                <ScrollView
                    style={[styles.list, styles.shadow]}
                >
                    <View style={[styles.row, { marginBottom: 10 }]}>
                        <Text style={styles.rowText}>ID</Text>
                        <Text style={styles.rowText}>Funcionário</Text>
                        <Text style={styles.rowText}>Configuração</Text>
                    </View>
                    {
                        listUsers.length > 0 ?
                            listUsers.map((user, index) => {
                                console.log(index)
                                return (
                                    <View key={user.uuidLogin} style={styles.row}>
                                        <Text style={styles.rowText}>{index}</Text>
                                        <Text style={styles.rowText}>{user.name}</Text>
                                        <Icon name="pencil" size={10} />
                                    </View>
                                )
                            })
                            :
                            <Text>Sem funcionarios cadastrados</Text>
                    }
                </ScrollView >
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
        borderRadius: 10,
        padding: 10,
        width: '85%',
        height: '30%',
        backgroundColor: '#fff'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowText: {
        width: '50%',
        textAlign: 'center'
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