import { View, StyleSheet } from "react-native";
import { Header } from "../../components/Header";
import { Card } from "../../components/Card";

export function Home({ navigation }) {
    function handleNavigationMyEquipment() {
        navigation.navigate("MyEquipment");
    }

    function handleNavigationManageOrders() {
        navigation.navigate("ManageOrders");
    }
    return (
        <>
            <Header />
            <View style={styles.container}>
                <Card icon={require("../../assets/costura.png")} title="Gerir pedidos" color="#de7c7c" styled={true} onPress={handleNavigationMyEquipment} />
                <Card icon="qrcode-scan" title="Ler QR-code" color="#fce8b4" styled={false} />
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