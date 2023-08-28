import { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text, TextInput, Alert, StyleSheet } from "react-native";
import * as ImagePicker from 'expo-image-picker';

interface Props {
    onGetImage: React.Dispatch<React.SetStateAction<ImagePicker.ImagePickerResult>>;

}

export function AttachImage({
    onGetImage,
}: Props) {
    const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(null);

    const pickImage = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!granted) {
            Alert.alert('Aviso!', 'Permissão negada a acessar a galeria.')
            return
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result);
        }
    };

    useEffect(() => {
        if (image) {
            onGetImage(image);
        }
    }, [image]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage} style={[styles.button, { backgroundColor: `${image ? '#ff6868' : '#68aeff'}` }]}>
                {
                    image ?
                        <Text style={styles.buttonTitle}>Trocar foto</Text>
                        :
                        <Text style={styles.buttonTitle}>Foto perfil</Text>
                }

            </TouchableOpacity>
            {
                image?.assets[0] &&
                <Image source={{ uri: image.assets[0].uri }} style={{ width: 200, height: 200, resizeMode: 'contain', borderRadius: 100 }} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    button: {
        width: '45%',
        height: 50,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonTitle: {
        color: '#fff',
        fontWeight: 'bold',
    }
})