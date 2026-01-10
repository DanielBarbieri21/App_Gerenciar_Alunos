/**
 * Actions do Redux para gerenciamento de alunos
 */
import { Aluno } from '../../model/entities/Aluno';

export const ADD_ALUNO = 'ADD_ALUNO';
export const REMOVE_ALUNO = 'REMOVE_ALUNO';
export const SET_ALUNOS = 'SET_ALUNOS';
export const UPDATE_ALUNO = 'UPDATE_ALUNO';

export interface AddAlunoAction {
  type: typeof ADD_ALUNO;
  payload: Aluno;
}

export interface RemoveAlunoAction {
  type: typeof REMOVE_ALUNO;
  payload: string; // matricula
}

export interface SetAlunosAction {
  type: typeof SET_ALUNOS;
  payload: Aluno[];
}

export interface UpdateAlunoAction {
  type: typeof UPDATE_ALUNO;
  payload: Aluno;
}

export type AlunoActionTypes = 
  | AddAlunoAction 
  | RemoveAlunoAction 
  | SetAlunosAction 
  | UpdateAlunoAction;

export const addAluno = (aluno: Aluno): AddAlunoAction => ({
  type: ADD_ALUNO,
  payload: aluno,
});

export const removeAluno = (matricula: string): RemoveAlunoAction => ({
  type: REMOVE_ALUNO,
  payload: matricula,
});

export const setAlunos = (alunos: Aluno[]): SetAlunosAction => ({
  type: SET_ALUNOS,
  payload: alunos,
});

export const updateAluno = (aluno: Aluno): UpdateAlunoAction => ({
  type: UPDATE_ALUNO,
  payload: aluno,
});
