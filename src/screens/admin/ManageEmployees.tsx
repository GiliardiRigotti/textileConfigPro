import { ScrollView, StyleSheet, Text, View } from "react-native"
import { Header } from "../../components/Header"
import { useContext } from "react"
import { AppContext } from "../../context"

export function ManageEmployees() {
    const { listUsers } = useContext(AppContext);
    return (
        <>
            <Header />
            <View style={styles.container}>

                <ScrollView>
                    {
                        listUsers.length > 0 ?
                            listUsers.map((user) => (
                                <View key={user.uuidLogin}>
                                    <Text>{user.name}</Text>
                                </View>
                            ))
                            :
                            <Text>Sem funcionarios cadastrados</Text>
                    }
                </ScrollView>
            </View>
        </>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})