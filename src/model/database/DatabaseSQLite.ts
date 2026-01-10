/**
 * Configuração do SQLite
 * Gerencia conexão e operações do banco de dados local
 */
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

class DatabaseSQLite {
  private database: SQLite.SQLiteDatabase | null = null;

  async getConnection(): Promise<SQLite.SQLiteDatabase> {
    if (this.database) {
      return this.database;
    }

    this.database = await SQLite.openDatabase({
      name: 'cadastro.db',
      location: 'default',
    });

    await this.createTables();
    return this.database;
  }

  private async createTables(): Promise<void> {
    if (!this.database) return;

    await this.database.executeSql(`
      CREATE TABLE IF NOT EXISTS ALUNO (
        MATRICULA TEXT PRIMARY KEY,
        NOME TEXT NOT NULL,
        REGISTRO INTEGER NOT NULL
      )
    `);
  }

  async executeSql(query: string, params: any[] = []): Promise<[SQLite.ResultSet]> {
    const db = await this.getConnection();
    return db.executeSql(query, params);
  }

  async closeDatabase(): Promise<void> {
    if (this.database) {
      await this.database.close();
      this.database = null;
    }
  }
}

export default new DatabaseSQLite();
