/**
 * Reducer do Redux para gerenciamento de estado dos alunos
 */
import { Aluno } from '../../model/entities/Aluno';
import {
  AlunoActionTypes,
  ADD_ALUNO,
  REMOVE_ALUNO,
  SET_ALUNOS,
  UPDATE_ALUNO,
} from '../actions/alunoActions';

export interface AlunoState {
  alunos: Aluno[];
}

const initialState: AlunoState = {
  alunos: [],
};

export default function alunoReducer(
  state = initialState,
  action: AlunoActionTypes
): AlunoState {
  switch (action.type) {
    case ADD_ALUNO:
      return {
        ...state,
        alunos: [...state.alunos, action.payload],
      };

    case REMOVE_ALUNO:
      return {
        ...state,
        alunos: state.alunos.filter(
          (aluno) => aluno.matricula !== action.payload
        ),
      };

    case SET_ALUNOS:
      return {
        ...state,
        alunos: action.payload,
      };

    case UPDATE_ALUNO:
      return {
        ...state,
        alunos: state.alunos.map((aluno) =>
          aluno.matricula === action.payload.matricula ? action.payload : aluno
        ),
      };

    default:
      return state;
  }
}
