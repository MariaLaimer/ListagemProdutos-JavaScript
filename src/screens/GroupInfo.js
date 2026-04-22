import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const membros = [
  { nome: 'Maria Luiza Pereto', ra: '1138637', genero: 'F' },
  { nome: 'Jamile Rockenbach Ferreira', ra: '1137704', genero: 'F' },
  { nome: 'Maria Eduarda Moura Laimer', ra: '1137846', genero: 'F' },
  { nome: 'Leonardo Manfroi Zancanaro', ra: '1137646', genero: 'M' },
  { nome: 'Kauê Anacleto Saggiorato', ra: '1137645', genero: 'M' },
];

export default function GroupInfo() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Sobre o App</Text>
      <Text style={styles.descricao}>
        Este aplicativo foi desenvolvido como trabalho acadêmico para listagem
        e consulta de produtos. Abaixo estão os integrantes responsáveis pelo desenvolvimento.
      </Text>

      <Text style={styles.subtitulo}>Equipe de Desenvolvimento</Text>

      {membros.map((membro, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.icone}>{membro.genero === 'F' ? '👩' : '👨'}</Text>
          <View>
            <Text style={styles.nome}>{membro.nome}</Text>
            <Text style={styles.ra}>RA: {membro.ra}</Text>
          </View>
        </View>
      ))}

      <View style={styles.rodape}>
        <Text style={styles.rodapeTexto}>Desenvolvido pela equipe</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descricao: {
    fontSize: 14,
    color: '#555',
    marginBottom: 24,
    lineHeight: 22,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    gap: 14,
  },
  icone: {
    fontSize: 36,
  },
  nome: {
    fontSize: 15,
    fontWeight: '600',
  },
  ra: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  rodape: {
    marginTop: 30,
    alignItems: 'center',
  },
  rodapeTexto: {
    fontSize: 12,
    color: '#aaa',
  },
});