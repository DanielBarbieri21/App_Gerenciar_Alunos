/**
 * DAO Genérico
 * Define a interface padrão para operações CRUD
 */
export abstract class GenericDAO<T, K> {
  abstract incluir(entidade: T): Promise<void>;
  abstract excluir(chave: K): Promise<void>;
  abstract obterTodos(): Promise<T[]>;
}
