/**
 * Configuração do Realm (alternativa ao SQLite)
 * Usado pelo Redux para persistência reativa
 */
import Realm from 'realm';

export const AlunoSchema = {
  name: 'Aluno',
  primaryKey: 'matricula',
  properties: {
    matricula: 'string',
    nome: 'string',
    registro: 'date',
  },
};

class DatabaseRealm {
  private realm: Realm | null = null;

  async getConnection(): Promise<Realm> {
    if (this.realm) {
      return this.realm;
    }

    this.realm = await Realm.open({
      schema: [AlunoSchema],
      schemaVersion: 1,
    });

    return this.realm;
  }

  async closeDatabase(): Promise<void> {
    if (this.realm && !this.realm.isClosed) {
      this.realm.close();
      this.realm = null;
    }
  }
}

export default new DatabaseRealm();
