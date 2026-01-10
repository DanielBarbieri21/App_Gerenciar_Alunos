/**
 * AlunoController
 * Implementa a lógica de negócio para gerenciamento de alunos
 * Padrão MVC - camada Controller
 */
import { GenericController } from './GenericController';
import AlunoDAO from '../model/dao/AlunoDAO';
import { Aluno } from '../model/entities/Aluno';
import { encrypt, decrypt } from '../security/crypto';

export default class AlunoController extends GenericController<Aluno, string> {
  constructor() {
    super(new AlunoDAO());
  }

  async salvar(aluno: Aluno): Promise<void> {
    try {
      // Criptografa o nome do aluno antes de salvar
      const alunoEncriptado = new Aluno(
        aluno.matricula,
        encrypt(aluno.nome),
        aluno.registro
      );
      
      await this.dao.incluir(alunoEncriptado);
      console.log('Aluno salvo com sucesso (nome criptografado)');
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
      throw new Error('Não foi possível salvar o aluno');
    }
  }

  async listar(): Promise<Aluno[]> {
    try {
      const alunos = await this.dao.obterTodos();
      
      // Descriptografa os nomes ao listar
      return alunos.map(aluno => new Aluno(
        aluno.matricula,
        decrypt(aluno.nome),
        aluno.registro
      ));
    } catch (error) {
      console.error('Erro ao listar alunos:', error);
      return [];
    }
  }

  async remover(matricula: string): Promise<void> {
    try {
      await this.dao.excluir(matricula);
      console.log('Aluno removido com sucesso');
    } catch (error) {
      console.error('Erro ao remover aluno:', error);
      throw new Error('Não foi possível remover o aluno');
    }
  }

  async buscarPorMatricula(matricula: string): Promise<Aluno | null> {
    try {
      const alunos = await this.listar();
      return alunos.find(a => a.matricula === matricula) || null;
    } catch (error) {
      console.error('Erro ao buscar aluno:', error);
      return null;
    }
  }
}
