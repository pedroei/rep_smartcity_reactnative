function decrypt(text) {
  const crypto = require('./crypto');
  const ENCRYPTION_KEY = 'cece3a7dc9cf86aae926fd2ee520a06e'; // Must be 256 bits (32 characters)
  const IV_LENGTH = 'cece3a7dc9cf86aa'; // For AES, this is always 16
  let decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    ENCRYPTION_KEY,
    IV_LENGTH,
  );
  let decrypted = decipher.update(text, 'base64', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

function encrypt(text) {
  const crypto = require('./crypto');
  const ENCRYPTION_KEY = 'cece3a7dc9cf86aae926fd2ee520a06e'; // Must be 256 bits (32 characters)
  const IV_LENGTH = 'cece3a7dc9cf86aa'; // For AES, this is always 16
  let cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, IV_LENGTH);
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  return encrypted;
}
