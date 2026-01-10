/**
 * AlunoDAO
 * Implementa operações de persistência para Aluno usando SQLite
 */
import { GenericDAO } from './GenericDAO';
import { Aluno } from '../entities/Aluno';
import realmDb from '../database/DatabaseRealm';

export default class AlunoDAO extends GenericDAO<Aluno, string> {
  async incluir(aluno: Aluno): Promise<void> {
    const realm = await realmDb.getConnection();
    try {
      realm.write(() => {
        realm.create('Aluno', {
          matricula: aluno.matricula,
          nome: aluno.nome,
          registro: aluno.registro,
        });
      });
      console.log('Aluno inserido com sucesso (Realm):', aluno.matricula);
    } catch (error) {
      console.error('Erro ao inserir aluno (Realm):', error);
      throw error;
    }
  }

  async excluir(matricula: string): Promise<void> {
    const realm = await realmDb.getConnection();
    try {
      const aluno = realm.objectForPrimaryKey<any>('Aluno', matricula);
      if (aluno) {
        realm.write(() => {
          realm.delete(aluno);
        });
        console.log('Aluno excluído com sucesso (Realm):', matricula);
      }
    } catch (error) {
      console.error('Erro ao excluir aluno (Realm):', error);
      throw error;
    }
  }

  async obterTodos(): Promise<Aluno[]> {
    const realm = await realmDb.getConnection();
    try {
      const results = realm.objects<any>('Aluno');
      const alunos = results.map(
        (r: any) => new Aluno(r.matricula, r.nome, r.registro)
      );
      console.log('Total de alunos recuperados (Realm):', alunos.length);
      return alunos;
    } catch (error) {
      console.error('Erro ao obter alunos (Realm):', error);
      return [];
    }
  }

  async atualizar(aluno: Aluno): Promise<void> {
    const realm = await realmDb.getConnection();
    try {
      const existing = realm.objectForPrimaryKey<any>('Aluno', aluno.matricula);
      realm.write(() => {
        if (existing) {
          existing.nome = aluno.nome;
          existing.registro = aluno.registro;
        } else {
          realm.create('Aluno', {
            matricula: aluno.matricula,
            nome: aluno.nome,
            registro: aluno.registro,
          });
        }
      });
      console.log('Aluno atualizado com sucesso (Realm):', aluno.matricula);
    } catch (error) {
      console.error('Erro ao atualizar aluno (Realm):', error);
      throw error;
    }
  }
}
