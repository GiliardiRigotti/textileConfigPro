import { View, StyleSheet } from "react-native";
import { Header } from "../../components/Header";
import { Card } from "../../components/Card";

export function Home() {
    return (
        <>
            <Header />
            <View style={styles.container}>
                <Card icon={require("../../assets/costura.png")} title="Gerir Maquinários" color="#de7c7c" styled={true} />
                <Card icon="account-group" title="Gerir Clientes" color="#fce8b4" styled={false} />
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