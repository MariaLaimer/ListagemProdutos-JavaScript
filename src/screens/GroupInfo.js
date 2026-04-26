import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const OLIVE = '#7C8C5E';
const OLIVE_DARK = '#5C6844';
const OLIVE_LIGHT = '#D4DCBF';
const CREAM = '#F7F5EF';

const membros = [
  { nome: 'Maria Luiza Pereto', ra: '1138637', genero: 'F' },
  { nome: 'Jamile Rockenbach Ferreira', ra: '1137704', genero: 'F' },
  { nome: 'Maria Eduarda Moura Laimer', ra: '1137846', genero: 'F' },
  { nome: 'Leonardo Manfroi Zancanaro', ra: '1137646', genero: 'M' },
  { nome: 'Kauê Anacleto Saggiorato', ra: '1137645', genero: 'M' },
];

export default function GroupInfo({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Informações',
      headerTitleAlign: 'center',
      headerTitleStyle: { fontSize: 17, fontWeight: '700', color: '#5C6844' },
      headerStyle: { backgroundColor: '#F7F5EF', shadowColor: 'transparent', elevation: 0 },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={headerStyles.backBtn}
        >
          <MaterialCommunityIcons name="arrow-left" size={20} color="#FFF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.safe}>
      {/* Apenas blobs do topo, sem os de baixo que causavam o círculo vermelho */}
      <View style={styles.blobTop} />
      <View style={styles.blobTopSmall} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header: logo à esquerda, "SOBRE / o app" à direita */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoSymbol}>✦</Text>
          </View>
          <View style={styles.headerTexts}>
            <Text style={styles.brand}>SOBRE</Text>
            <Text style={styles.brandSub}>o app</Text>
          </View>
        </View>

        {/* Card principal */}
        <View style={styles.card}>
          <Text style={styles.titulo}>Sobre o App</Text>
          <Text style={styles.descricao}>
            Este aplicativo foi desenvolvido como trabalho acadêmico para listagem
            e consulta de produtos. Abaixo estão os integrantes responsáveis pelo desenvolvimento.
          </Text>

          <Text style={styles.subtitulo}>Equipe de Desenvolvimento:</Text>

          {membros.map((membro, index) => (
            <View key={index} style={[
              styles.membroCard,
              { backgroundColor: membro.genero === 'F' ? '#F2EBF5' : '#EBF0F5' }
            ]}>
              <View style={[
                styles.iconCircle,
                { backgroundColor: membro.genero === 'F' ? '#C8A8D8' : '#A8BCD8' }
              ]}>
                <Text style={styles.icone}>{membro.genero === 'F' ? '👩' : '👨'}</Text>
              </View>
              <View style={styles.membroInfo}>
                <Text style={styles.nome}>{membro.nome}</Text>
                <Text style={styles.ra}>RA: {membro.ra}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Rodapé */}
        <View style={styles.rodape}>
          <Text style={styles.rodapeTexto}>Desenvolvido com carinho pela equipe!</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  backBtn: {
    marginLeft: 12,
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#7C8C5E',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5C6844',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
});

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: CREAM,
  },

  // Blobs apenas no topo
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
    top: 80,
    right: 60,
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: OLIVE_LIGHT,
    opacity: 0.35,
  },

  container: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 48,
  },

  // Header: logo à esquerda + texto à direita
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    gap: 16,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: OLIVE,
    alignItems: 'center',
    justifyContent: 'center',
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
  headerTexts: {
    justifyContent: 'center',
  },
  brand: {
    fontSize: 26,
    fontWeight: '800',
    color: OLIVE_DARK,
    letterSpacing: 7,
    lineHeight: 30,
  },
  brandSub: {
    fontSize: 11,
    fontWeight: '400',
    color: OLIVE,
    letterSpacing: 6,
    marginTop: -2,
  },

  // Card principal
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
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D2D2A',
    marginBottom: 8,
  },
  descricao: {
    fontSize: 13,
    color: '#9A9A8A',
    lineHeight: 22,
    marginBottom: 24,
  },
  subtitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2D2D2A',
    marginBottom: 14,
    letterSpacing: 0.3,
  },

  // Cards de membros
  membroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    gap: 14,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icone: {
    fontSize: 26,
  },
  membroInfo: {
    flex: 1,
  },
  nome: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D2D2A',
  },
  ra: {
    fontSize: 12,
    color: '#9A9A8A',
    marginTop: 2,
  },

  // Rodapé
  rodape: {
    marginTop: 24,
    alignItems: 'center',
  },
  rodapeTexto: {
    fontSize: 12,
    color: '#9A9A8A',
    fontStyle: 'italic',
  },
});