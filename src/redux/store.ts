/**
 * Configuração da Store do Redux
 * Gerenciamento centralizado de estado da aplicação
 */
import { createStore, combineReducers } from 'redux';
import alunoReducer from './reducers/alunoReducer';

const rootReducer = combineReducers({
  aluno: alunoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
