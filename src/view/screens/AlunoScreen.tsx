/**
 * AlunoScreen
 * Tela de gerenciamento de alunos (CRUD completo)
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Aluno } from '../../model/entities/Aluno';
import AlunoController from '../../controller/AlunoController';
import { addAluno, removeAluno, setAlunos } from '../../redux/actions/alunoActions';
import { RootState } from '../../redux/store';
import AlunoItem from '../components/AlunoItem';
import { commonStyles } from '../styles/commonStyles';

interface AlunoScreenProps {
  navigation: any;
}

const AlunoScreen: React.FC<AlunoScreenProps> = ({ navigation }) => {
  const [matricula, setMatricula] = useState('');
  const [nome, setNome] = useState('');
  const controller = new AlunoController();
  
  const dispatch = useDispatch();
  const alunos = useSelector((state: RootState) => state.aluno.alunos);

  useEffect(() => {
    carregarAlunos();
  }, []);

  const carregarAlunos = async () => {
    try {
      const lista = await controller.listar();
      dispatch(setAlunos(lista));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os alunos');
    }
  };

  const handleSalvar = async () => {
    if (!matricula.trim() || !nome.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    try {
      const novoAluno = new Aluno(matricula, nome);
      await controller.salvar(novoAluno);
      dispatch(addAluno(novoAluno));
      
      setMatricula('');
      setNome('');
      Alert.alert('Sucesso', 'Aluno cadastrado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o aluno');
    }
  };

  const handleExcluir = async (matriculaAluno: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Deseja realmente excluir este aluno?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await controller.remover(matriculaAluno);
              dispatch(removeAluno(matriculaAluno));
              Alert.alert('Sucesso', 'Aluno excluído com sucesso!');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o aluno');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.header}>
        <Text style={commonStyles.headerTitle}>👨‍🎓 Gerenciar Alunos</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={commonStyles.content}>
          {/* Formulário */}
          <View style={commonStyles.card}>
            <Text style={styles.formTitle}>📝 Novo Aluno</Text>
            
            <TextInput
              style={commonStyles.input}
              placeholder="Matrícula"
              value={matricula}
              onChangeText={setMatricula}
              autoCapitalize="none"
            />
            
            <TextInput
              style={commonStyles.input}
              placeholder="Nome Completo"
              value={nome}
              onChangeText={setNome}
            />
            
            <TouchableOpacity
              style={commonStyles.button}
              onPress={handleSalvar}
            >
              <Text style={commonStyles.buttonText}>💾 Salvar Aluno</Text>
            </TouchableOpacity>
          </View>

          {/* Lista */}
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>📋 Alunos Cadastrados</Text>
            <View style={commonStyles.badge}>
              <Text style={commonStyles.badgeText}>{alunos.length}</Text>
            </View>
          </View>

          <FlatList
            data={alunos}
            keyExtractor={(item) => item.matricula}
            renderItem={({ item }) => (
              <AlunoItem aluno={item} onDelete={handleExcluir} />
            )}
            ListEmptyComponent={
              <Text style={commonStyles.emptyText}>
                Nenhum aluno cadastrado
              </Text>
            }
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default AlunoScreen;
