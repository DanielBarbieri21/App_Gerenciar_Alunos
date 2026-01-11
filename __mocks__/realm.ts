/**
 * Mock do Realm para testes unitários
 * Evita dependência de módulos nativos durante testes Jest
 */

class MockRealm {
  public objects(schema: string) {
    return [];
  }

  public write(callback: () => void) {
    callback();
  }

  public create(schema: string, data: any) {
    return data;
  }

  public delete(object: any) {
    // Mock delete
  }

  public close() {
    // Mock close
  }
}

// Mock do construtor
const RealmMock = jest.fn(() => new MockRealm());

// Mock das propriedades estáticas
RealmMock.open = jest.fn(async () => new MockRealm());

export default RealmMock;
