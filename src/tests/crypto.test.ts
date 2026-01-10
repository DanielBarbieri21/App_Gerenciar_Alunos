/**
 * Testes Unitários - Crypto
 * Testa as funções de criptografia
 */
import {
  encrypt,
  decrypt,
  hashMD5,
  hashSHA256,
  validateHash,
} from '../security/crypto';

describe('Crypto Functions', () => {
  const textoOriginal = 'Daniel Silva';
  const senhaOriginal = 'senha123';

  test('deve criptografar e descriptografar texto corretamente', () => {
    const textoCriptografado = encrypt(textoOriginal);
    const textoDescriptografado = decrypt(textoCriptografado);
    
    expect(textoDescriptografado).toBe(textoOriginal);
    expect(textoCriptografado).not.toBe(textoOriginal);
  });

  test('texto criptografado deve ser diferente do original', () => {
    const textoCriptografado = encrypt(textoOriginal);
    expect(textoCriptografado).not.toBe(textoOriginal);
  });

  test('deve gerar hash MD5 consistente', () => {
    const hash1 = hashMD5(senhaOriginal);
    const hash2 = hashMD5(senhaOriginal);
    
    expect(hash1).toBe(hash2);
    expect(hash1).toHaveLength(32); // MD5 sempre tem 32 caracteres
  });

  test('deve gerar hash SHA256 consistente', () => {
    const hash1 = hashSHA256(senhaOriginal);
    const hash2 = hashSHA256(senhaOriginal);
    
    expect(hash1).toBe(hash2);
    expect(hash1).toHaveLength(64); // SHA256 sempre tem 64 caracteres
  });

  test('hashes diferentes para textos diferentes', () => {
    const hash1 = hashSHA256('senha123');
    const hash2 = hashSHA256('senha456');
    
    expect(hash1).not.toBe(hash2);
  });

  test('deve validar hash SHA256 corretamente', () => {
    const hash = hashSHA256(senhaOriginal);
    const isValid = validateHash(senhaOriginal, hash, 'sha256');
    
    expect(isValid).toBe(true);
  });

  test('deve validar hash MD5 corretamente', () => {
    const hash = hashMD5(senhaOriginal);
    const isValid = validateHash(senhaOriginal, hash, 'md5');
    
    expect(isValid).toBe(true);
  });

  test('deve rejeitar hash inválido', () => {
    const hash = hashSHA256(senhaOriginal);
    const isValid = validateHash('senhaErrada', hash, 'sha256');
    
    expect(isValid).toBe(false);
  });

  test('deve criptografar strings vazias', () => {
    const encrypted = encrypt('');
    const decrypted = decrypt(encrypted);
    
    expect(decrypted).toBe('');
  });

  test('deve lidar com caracteres especiais', () => {
    const textoEspecial = 'Olá! Ação: 100% 🔒';
    const encrypted = encrypt(textoEspecial);
    const decrypted = decrypt(encrypted);
    
    expect(decrypted).toBe(textoEspecial);
  });
});
