import { Button, Image, Pressable, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Cadastro } from './screens/Cadastro';
import { Home } from './screens/Home';

export default function App() {
  return (
    <SafeAreaView>
      <Home />
    </SafeAreaView>
  );
}
