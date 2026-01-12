/**
 * AlunoScreen
 * Tela de gerenciamento de alunos (CRUD completo + Edição + Busca)
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
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { Aluno } from '../../model/entities/Aluno';
import AlunoController from '../../controller/AlunoController';
import { addAluno, removeAluno, setAlunos, updateAluno } from '../../redux/actions/alunoActions';
import { RootState } from '../../redux/store';
import AlunoItem from '../components/AlunoItem';
import { commonStyles } from '../styles/commonStyles';

interface AlunoScreenProps {
  navigation: any;
}

const AlunoScreen: React.FC<AlunoScreenProps> = ({ navigation }) => {
  const [matricula, setMatricula] = useState('');
  const [nome, setNome] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMatricula, setEditingMatricula] = useState<string | null>(null);
  const controller = new AlunoController();
  
  const dispatch = useDispatch();
  const alunos = useSelector((state: RootState) => state.aluno.alunos);
  
  // Filtrar alunos pela busca
  const alunosFiltrados = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchText.toLowerCase()) ||
    aluno.matricula.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    carregarAlunos();
  }, []);

  const carregarAlunos = async () => {
    setIsLoading(true);
    try {
      const lista = await controller.listar();
      dispatch(setAlunos(lista));
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao carregar',
        text2: 'Não foi possível carregar os alunos',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSalvar = async () => {
    // Validações
    if (!matricula.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Campo obrigatório',
        text2: 'Informe a matrícula do aluno',
      });
      return;
    }
    
    if (!nome.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Campo obrigatório',
        text2: 'Informe o nome do aluno',
      });
      return;
    }
    
    if (nome.trim().length < 3) {
      Toast.show({
        type: 'error',
        text1: 'Nome inválido',
        text2: 'O nome deve ter no mínimo 3 caracteres',
      });
      return;
    }
    
    // Verificar matrícula duplicada (apenas ao adicionar)
    if (!isEditing && alunos.some(a => a.matricula === matricula)) {
      Toast.show({
        type: 'error',
        text1: 'Matrícula duplicada',
        text2: 'Já existe um aluno com esta matrícula',
      });
      return;
    }

    setIsLoading(true);
    try {
      if (isEditing && editingMatricula) {
        // Atualizar aluno existente
        const alunoAtualizado = new Aluno(editingMatricula, nome);
        await controller.atualizar(alunoAtualizado);
        dispatch(updateAluno(alunoAtualizado));
        
        Toast.show({
          type: 'success',
          text1: 'Sucesso! ✅',
          text2: 'Aluno atualizado com sucesso',
        });
        
        limparFormulario();
      } else {
        // Adicionar novo aluno
        const novoAluno = new Aluno(matricula, nome);
        await controller.salvar(novoAluno);
        dispatch(addAluno(novoAluno));
        
        Toast.show({
          type: 'success',
          text1: 'Sucesso! 🎉',
          text2: `Aluno ${nome} cadastrado`,
        });
        
        limparFormulario();
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: `Não foi possível ${isEditing ? 'atualizar' : 'salvar'} o aluno`,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const limparFormulario = () => {
    setMatricula('');
    setNome('');
    setIsEditing(false);
    setEditingMatricula(null);
  };
  
  const handleEditar = (aluno: Aluno) => {
    setMatricula(aluno.matricula);
    setNome(aluno.nome);
    setIsEditing(true);
    setEditingMatricula(aluno.matricula);
    
    Toast.show({
      type: 'info',
      text1: 'Modo Edição',
      text2: 'Altere os dados e salve',
    });
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
            setIsLoading(true);
            try {
              await controller.remover(matriculaAluno);
              dispatch(removeAluno(matriculaAluno));
              
              Toast.show({
                type: 'success',
                text1: 'Excluído! 🗑️',
                text2: 'Aluno removido com sucesso',
              });
            } catch (error) {
              Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Não foi possível excluir o aluno',
              });
            } finally {
              setIsLoading(false);
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
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>
                {isEditing ? '✏️ Editar Aluno' : '📝 Novo Aluno'}
              </Text>
              {isEditing && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={limparFormulario}
                >
                  <Text style={styles.cancelButtonText}>✕ Cancelar</Text>
                </TouchableOpacity>
              )}
            </View>
            
            <TextInput
              style={[
                commonStyles.input,
                isEditing && styles.inputDisabled,
              ]}
              placeholder="Matrícula"
              value={matricula}
              onChangeText={setMatricula}
              autoCapitalize="none"
              editable={!isEditing}
            />
            
            <TextInput
              style={commonStyles.input}
              placeholder="Nome Completo"
              value={nome}
              onChangeText={setNome}
            />
            
            <TouchableOpacity
              style={[
                commonStyles.button,
                isLoading && styles.buttonDisabled,
              ]}
              onPress={handleSalvar}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={commonStyles.buttonText}>
                  {isEditing ? '✅ Atualizar' : '💾 Salvar Aluno'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          
          {/* Campo de Busca */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por nome ou matrícula..."
              value={searchText}
              onChangeText={setSearchText}
              autoCapitalize="none"
            />
            {searchText.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchText('')}
                style={styles.clearButton}
              >
                <Text style={styles.clearButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Lista */}
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>📋 Alunos Cadastrados</Text>
            <View style={commonStyles.badge}>
              <Text style={commonStyles.badgeText}>
                {searchText ? alunosFiltrados.length : alunos.length}
              </Text>
            </View>
          </View>

          {isLoading && alunos.length === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Carregando...</Text>
            </View>
          ) : (
            <FlatList
              data={alunosFiltrados}
              keyExtractor={(item) => item.matricula}
              renderItem={({ item }) => (
                <AlunoItem
                  aluno={item}
                  onDelete={handleExcluir}
                  onEdit={handleEditar}
                />
              )}
              ListEmptyComponent={
                <Text style={commonStyles.emptyText}>
                  {searchText
                    ? `Nenhum aluno encontrado para "${searchText}"`
                    : 'Nenhum aluno cadastrado'}
                </Text>
              }
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cancelButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  inputDisabled: {
    backgroundColor: '#F0F0F0',
    color: '#999',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    fontSize: 20,
    color: '#999',
    fontWeight: 'bold',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
});

export default AlunoScreen;
