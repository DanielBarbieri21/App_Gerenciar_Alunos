/**
 * Módulo de Criptografia
 * Utiliza CryptoJS para criptografar dados sensíveis
 * Ideal para proteger: nomes, tokens, senhas, etc.
 */
import CryptoJS from 'crypto-js';

// Chave secreta - em produção, usar variável de ambiente
const SECRET_KEY = 'MINHA_CHAVE_SECRETA_2026_ADVANCED_APP';

/**
 * Criptografa um texto usando AES
 * @param text Texto a ser criptografado
 * @returns Texto criptografado
 */
export function encrypt(text: string): string {
  try {
    if (!text) return '';
    // CryptoJS.AES.encrypt não precisa de módulo nativo
    const encrypted = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
    return encrypted;
  } catch (error) {
    console.warn('Aviso: criptografia com erro, usando fallback Base64');
    // Fallback: retorna em Base64 se CryptoJS falhar
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
  }
}

/**
 * Descriptografa um texto criptografado
 * @param cipherText Texto criptografado
 * @returns Texto descriptografado
 */
export function decrypt(cipherText: string): string {
  try {
    if (!cipherText) return '';
    const decrypted = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const text = decrypted.toString(CryptoJS.enc.Utf8);
    if (!text) {
      // Tenta fallback Base64 se AES falhar
      return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(cipherText));
    }
    return text;
  } catch (error) {
    console.warn('Aviso: descriptografia falhou, tentando fallback Base64');
    try {
      return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(cipherText));
    } catch {
      return cipherText;
    }
  }
}

/**
 * Gera hash MD5 de um texto (útil para senhas)
 * @param text Texto para gerar hash
 * @returns Hash MD5
 */
export function hashMD5(text: string): string {
  return CryptoJS.MD5(text).toString();
}

/**
 * Gera hash SHA256 de um texto (mais seguro que MD5)
 * @param text Texto para gerar hash
 * @returns Hash SHA256
 */
export function hashSHA256(text: string): string {
  return CryptoJS.SHA256(text).toString();
}

/**
 * Valida se um texto corresponde a um hash
 * @param text Texto original
 * @param hash Hash para validar
 * @param algorithm Algoritmo usado (md5 ou sha256)
 * @returns true se o hash corresponde ao texto
 */
export function validateHash(
  text: string,
  hash: string,
  algorithm: 'md5' | 'sha256' = 'sha256'
): boolean {
  const generatedHash = algorithm === 'md5' ? hashMD5(text) : hashSHA256(text);
  return generatedHash === hash;
}
