import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Alert } from "react-native";
import { Logo } from "../components/Logo";
import { useContext, useState } from 'react';
import { Load } from '../components/Load';
import { AppContext } from '../context';

export function Login() {
    const [hidePassword, setHidePassword] = useState<boolean>(true)
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login, load } = useContext(AppContext)

    async function handleLogin() {
        if (email == '' || password == '') {
            Alert.alert('Aviso', 'Verifique se seu email/senha esta preenchido');
            return
        }
        await login({ email, password });
    }
    if (load) {
        return <Load />
    }
    return (
        <View style={styles.container}>
            <Logo />
            <View style={styles.form}>
                <View style={styles.input}>
                    <Icon name='account-circle' size={33} />
                    <TextInput style={{ width: '83%', fontSize: 20 }} onChangeText={setEmail} />
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10, alignSelf: 'flex-start' }}>
                    <View style={{ width: 13, height: 13, borderRadius: 10, backgroundColor: '#d9d9d9', marginRight: 10 }} />
                    <Text>LEMBRAR DE MIM</Text>
                </TouchableOpacity>
                <View style={styles.input}>
                    <View style={{ backgroundColor: '#000', borderRadius: 15, width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name='lock' size={23} color={'#d9d9d9'} />
                    </View>

                    <TextInput style={{ width: '70%', fontSize: 20 }} secureTextEntry={hidePassword} onChangeText={setPassword} />
                    <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                        {
                            hidePassword ?
                                <Icon name='eye-off-outline' size={25} />
                                :
                                <Icon name='eye-outline' size={25} />
                        }
                    </TouchableOpacity>


                </View>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10, alignSelf: 'flex-start' }}>
                    <Text>RECUPERAR SENHA</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>ENTRAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 25,
        height: 45,
        width: '100%',
        backgroundColor: '#d9d9d9',
        marginBottom: 10,
    },
    button: {
        borderRadius: 25,
        height: 45,
        width: '100%',
        backgroundColor: '#d9d9d9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        width: '80%',
        alignItems: 'center'
    }
})