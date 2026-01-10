/**
 * Controller Genérico
 * Define a estrutura base para controllers MVC
 */
import { GenericDAO } from '../model/dao/GenericDAO';

export abstract class GenericController<T, K> {
  protected dao: GenericDAO<T, K>;

  constructor(dao: GenericDAO<T, K>) {
    this.dao = dao;
  }

  abstract salvar(entidade: T): Promise<void>;
  abstract listar(): Promise<T[]>;
  abstract remover(chave: K): Promise<void>;
}
