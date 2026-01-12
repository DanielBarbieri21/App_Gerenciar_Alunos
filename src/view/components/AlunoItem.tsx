/**
 * Componente AlunoItem
 * Exibe um item da lista de alunos
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Aluno } from '../../model/entities/Aluno';

interface AlunoItemProps {
  aluno: Aluno;
  onDelete: (matricula: string) => void;
  onEdit: (aluno: Aluno) => void;
}

const AlunoItem: React.FC<AlunoItemProps> = ({ aluno, onDelete, onEdit }) => {
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.name}>{aluno.nome}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{aluno.matricula}</Text>
          </View>
        </View>
        <Text style={styles.date}>
          📅 Cadastro: {formatDate(aluno.registro)}
        </Text>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(aluno)}
        >
          <Text style={styles.editText}>✏️</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(aluno.matricula)}
        >
          <Text style={styles.deleteText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  badge: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    fontSize: 20,
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    fontSize: 24,
  },
});

export default AlunoItem;
