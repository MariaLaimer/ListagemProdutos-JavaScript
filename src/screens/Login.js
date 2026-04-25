
import { useState } from 'react'
import { TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, View, Text, Alert, SafeAreaView } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Login({ navigation }) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Erro", "Por favor, preencha o usuário e a senha.")
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
          navigation.navigate('ProductList')
      }
    } catch (error) {
      Alert.alert("Falha no Login", error.message || 'Ocorreu um erro ao conectar.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Decorative background blobs */}
      <View style={styles.blobTop} />
      <View style={styles.blobTopSmall} />
      <View style={styles.blobBottom} />
      <View style={styles.blobBottomSmall} />

      <View style={styles.container}>

        {/* Logo / Brand */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoSymbol}>✦</Text>
          </View>
          <Text style={styles.brand}>NOME</Text>
          <Text style={styles.brandSub}>TEST</Text>
          <Text style={styles.tagline}>frase impactante pra por dps</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Bem-vindo!</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>

          {/* Username */}
          <View style={[styles.inputWrap, focusedField === 'user' && styles.inputWrapFocused]}>
            <Text style={styles.inputIcon}><Ionicons name="people-outline" size={24} color="black" /></Text>
            <TextInput
              style={styles.input}
              placeholder="Nome de usuário"
              placeholderTextColor="#B5B5A8"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              onFocus={() => setFocusedField('user')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          {/* Password */}
          <View style={[styles.inputWrap, focusedField === 'pass' && styles.inputWrapFocused]}>
            <Text style={styles.inputIcon}><MaterialIcons name="password" size={24} color="black" /></Text>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#B5B5A8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onFocus={() => setFocusedField('pass')}
              onBlur={() => setFocusedField(null)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.eyeIcon}>{showPassword ? <Text style={styles.passIcon}><Feather name="eye-off" size={24} color="black"></Feather></Text> : <Text style={styles.passIconOff}><Feather name="eye" size={24} color="black"></Feather></Text>}</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.85}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>ENTRAR</Text>
            )}
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const OLIVE = '#7C8C5E';
const OLIVE_DARK = '#5C6844';
const OLIVE_LIGHT = '#D4DCBF';
const CREAM = '#F7F5EF';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: CREAM,
  },
  blobTop: {
    position: 'absolute',
    top: -70,
    right: -70,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: OLIVE_LIGHT,
    opacity: 0.5,
  },
  blobTopSmall: {
    position: 'absolute',
    top: -20,
    right: 90,
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: OLIVE_LIGHT,
    opacity: 0.35,
  },
  blobBottom: {
    position: 'absolute',
    bottom: -90,
    left: -90,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: OLIVE_LIGHT,
    opacity: 0.3,
  },
  blobBottomSmall: {
    position: 'absolute',
    bottom: 90,
    left: 60,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: OLIVE_LIGHT,
    opacity: 0.25,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  // Header / Brand
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: OLIVE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: OLIVE_DARK,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  logoSymbol: {
    color: '#FFF',
    fontSize: 24,
  },
  brand: {
    fontSize: 27,
    fontWeight: '800',
    color: OLIVE_DARK,
    letterSpacing: 7,
  },
  brandSub: {
    fontSize: 15,
    fontWeight: '400',
    color: OLIVE,
    letterSpacing: 8,
    marginTop: -2,
  },
  tagline: {
    marginTop: 10,
    fontSize: 12,
    color: '#9A9A8A',
    fontStyle: 'italic',
  },

  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D2D2A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#9A9A8A',
    marginBottom: 24,
  },

  // Inputs
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CREAM,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  inputWrapFocused: {
    borderColor: OLIVE,
    backgroundColor: '#FAFAF7',
  },
  inputIcon: {
    fontSize: 16,
    marginRight: 10,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#2D2D2A',
  },
  eyeIcon: {
    fontSize: 16,
    opacity: 0.5,
  },

  // Button
  button: {
    height: 54,
    backgroundColor: OLIVE,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: OLIVE_DARK,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
});