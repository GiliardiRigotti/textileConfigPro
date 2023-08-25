import { useState } from "react";
import { View, Image, TouchableOpacity, Text, TextInput } from "react-native";
import * as ImagePicker from 'expo-image-picker';

interface Props {
    onChange: () => string;
}

export function AttachmentGallery({ onChange }: Props) {
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (<View>
        <TouchableOpacity onPress={pickImage}>
            {
                image ?
                    <TextInput value={image} editable={false} onChangeText={onChange} />
                    :
                    <Text>Foto perfil</Text>
            }

        </TouchableOpacity>
        {image &&
            <Image source={{ uri: image }} style={{ width: 200, height: 200, resizeMode: 'contain' }} />
        }
    </View>)
}