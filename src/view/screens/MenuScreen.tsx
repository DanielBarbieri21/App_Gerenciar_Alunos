/**
 * MenuScreen
 * Tela principal com navegação para as funcionalidades do app
 */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { commonStyles } from '../styles/commonStyles';

interface MenuScreenProps {
  navigation: any;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.header}>
        <Text style={commonStyles.headerTitle}>📚 AdvancedCadastroApp</Text>
        <Text style={styles.subtitle}>Sistema de Gestão de Alunos</Text>
      </View>

      <View style={commonStyles.content}>
        <Text style={styles.welcomeText}>
          Bem-vindo ao sistema de cadastro de alunos!
        </Text>

        <TouchableOpacity
          style={[commonStyles.button, styles.menuButton]}
          onPress={() => navigation.navigate('Alunos')}
        >
          <Text style={styles.menuIcon}>👨‍🎓</Text>
          <Text style={commonStyles.buttonText}>Gerenciar Alunos</Text>
          <Text style={styles.menuDescription}>
            Cadastrar, listar e excluir alunos
          </Text>
        </TouchableOpacity>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>🔒 Segurança</Text>
          <Text style={styles.infoText}>
            ✓ Dados criptografados com AES
          </Text>
          <Text style={styles.infoText}>
            ✓ Persistência local com SQLite
          </Text>
          <Text style={styles.infoText}>
            ✓ Gerenciamento de estado com Redux
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>🏗️ Arquitetura</Text>
          <Text style={styles.infoText}>
            ✓ MVC + Redux
          </Text>
          <Text style={styles.infoText}>
            ✓ DAO Pattern
          </Text>
          <Text style={styles.infoText}>
            ✓ Testes Unitários
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
    opacity: 0.9,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  menuButton: {
    paddingVertical: 24,
    marginBottom: 16,
  },
  menuIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  menuDescription: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
    opacity: 0.8,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});

export default MenuScreen;
