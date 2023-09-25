import { View, StyleSheet, ScrollView } from "react-native";
import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import { useNavigation } from "@react-navigation/native";

export function Home() {
    const navigation = useNavigation()

    function handleNavigationManageEmployees() {
        navigation.navigate("ManageEmployees");
    }

    function handleNavigationManageClients() {
        navigation.navigate("ManageClients");
    }

    function handleNavigationManageEquipments() {
        navigation.navigate("ManageEquipments");
    }

    function handleNavigationDesignateEmployee() {
        navigation.navigate("DesignateEmployee");
    }

    function handleNavigationManageOrders() {
        navigation.navigate("ManageOrders");
    }

    return (
        <>
            <Header />
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
                <Card icon="account-plus" title="Gerir funcionários" color="#6f8dd9" styled={false} onPress={handleNavigationManageEmployees} />
                <Card icon={require("../../assets/costura.png")} title="Gerir Maquinários" color="#de7c7c" styled={true} onPress={handleNavigationManageEquipments} />
                <Card icon="account-group" title="Gerir Clientes" color="#b3f495" styled={false} onPress={handleNavigationManageClients} />
                <Card icon="account-hard-hat" title="Designar Funcionario" color="#ffe49f" styled={false} onPress={handleNavigationDesignateEmployee} />
                <Card icon="package-variant" title="Gerir Pedidos" color="#a3e4e0" styled={false} onPress={handleNavigationManageOrders} />
            </ScrollView>
        </>

    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    }
})