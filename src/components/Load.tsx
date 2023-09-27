import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { animations } from '../assets/animations';

export function Load() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <LottieView
                autoPlay
                source={animations.load}
            />
        </View>
    )
}