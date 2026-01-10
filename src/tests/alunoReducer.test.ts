/**
 * Testes Unitários - AlunoReducer
 * Testa o reducer do Redux para gerenciamento de alunos
 */
import alunoReducer from '../redux/reducers/alunoReducer';
import { Aluno } from '../model/entities/Aluno';
import {
  addAluno,
  removeAluno,
  setAlunos,
  updateAluno,
} from '../redux/actions/alunoActions';

describe('AlunoReducer', () => {
  const initialState = {
    alunos: [],
  };

  const mockAluno1 = new Aluno('001', 'Daniel Silva', new Date('2026-01-01'));
  const mockAluno2 = new Aluno('002', 'Maria Santos', new Date('2026-01-02'));

  test('deve retornar o estado inicial', () => {
    const state = alunoReducer(undefined, { type: '@@INIT' } as any);
    expect(state).toEqual(initialState);
  });

  test('deve adicionar um aluno', () => {
    const state = alunoReducer(initialState, addAluno(mockAluno1));
    
    expect(state.alunos.length).toBe(1);
    expect(state.alunos[0].matricula).toBe('001');
    expect(state.alunos[0].nome).toBe('Daniel Silva');
  });

  test('deve adicionar múltiplos alunos', () => {
    let state = alunoReducer(initialState, addAluno(mockAluno1));
    state = alunoReducer(state, addAluno(mockAluno2));
    
    expect(state.alunos.length).toBe(2);
    expect(state.alunos[0].matricula).toBe('001');
    expect(state.alunos[1].matricula).toBe('002');
  });

  test('deve remover um aluno', () => {
    const stateWithAlunos = {
      alunos: [mockAluno1, mockAluno2],
    };
    
    const state = alunoReducer(stateWithAlunos, removeAluno('001'));
    
    expect(state.alunos.length).toBe(1);
    expect(state.alunos[0].matricula).toBe('002');
  });

  test('deve definir lista de alunos', () => {
    const alunos = [mockAluno1, mockAluno2];
    const state = alunoReducer(initialState, setAlunos(alunos));
    
    expect(state.alunos.length).toBe(2);
    expect(state.alunos).toEqual(alunos);
  });

  test('deve atualizar um aluno', () => {
    const stateWithAlunos = {
      alunos: [mockAluno1, mockAluno2],
    };
    
    const alunoAtualizado = new Aluno('001', 'Daniel Silva Atualizado', new Date());
    const state = alunoReducer(stateWithAlunos, updateAluno(alunoAtualizado));
    
    expect(state.alunos.length).toBe(2);
    expect(state.alunos[0].nome).toBe('Daniel Silva Atualizado');
  });

  test('não deve modificar o estado para ação desconhecida', () => {
    const state = alunoReducer(initialState, { type: 'UNKNOWN_ACTION' } as any);
    expect(state).toEqual(initialState);
  });
});
