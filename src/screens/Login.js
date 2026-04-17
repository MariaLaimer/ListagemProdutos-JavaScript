import { View, Text, Alert } from 'react-native'
import { useState } from 'react'
import { TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'


export default function Login({ navigation }) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Erro', 'Por favor, preencha o usuário e a senha.")
      return;
    }
    setIsLoading(true)

    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           username: username, 
           password: password, 
          }),
      });

      if(!response.ok) {
        throw new Error("Usuario ou senha inválidos.")
    }

      const data = await response.json()

      if (data.token) {
        Alert.alert('Login bem-sucedido!')
        navigation.navigate('ProductList')
      }
    } catch (error) {
      Alert.alert("Falha no Login", error.message || 'Ocorreu um erro ao conectar.')
    } finally {
      setIsLoading(false)
    }
  }

 return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} 
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>ENTRAR</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
