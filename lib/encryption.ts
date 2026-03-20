import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-dev-key-please-change-in-production';
const ENCRYPTION_IV = process.env.ENCRYPTION_IV || 'default-dev-iv-12345678';

// Ensure proper key and IV lengths
const ensureKeyLength = (key: string): Buffer => {
  const hash = crypto.createHash('sha256');
  hash.update(key);
  return hash.digest();
};

const ensureIvLength = (iv: string): Buffer => {
  const hash = crypto.createHash('md5');
  hash.update(iv);
  return hash.digest();
};

export const encryptData = (data: string): string => {
  try {
    const key = ensureKeyLength(ENCRYPTION_KEY);
    const iv = ensureIvLength(ENCRYPTION_IV);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return encrypted;
  } catch (error) {
    console.error('[v0] Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

export const decryptData = (encryptedData: string): string => {
  try {
    const key = ensureKeyLength(ENCRYPTION_KEY);
    const iv = ensureIvLength(ENCRYPTION_IV);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('[v0] Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  const bcrypt = require('bcryptjs');
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const bcrypt = require('bcryptjs');
  return bcrypt.compare(password, hashedPassword);
};

// Generate a secure random token
export const generateSecureToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Generate OTP
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create checksum for data integrity
export const createChecksum = (data: string): string => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

// Verify checksum
export const verifyChecksum = (data: string, checksum: string): boolean => {
  return createChecksum(data) === checksum;
};

// Sanitize sensitive data from logs
export const sanitizeForLogs = (data: any, fieldsToHide: string[] = []): any => {
  const defaultHiddenFields = ['password', 'encryptedPaymentData', 'otp', 'secret', 'token'];
  const fieldsToSanitize = [...defaultHiddenFields, ...fieldsToHide];
  
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  const sanitized = { ...data };
  
  fieldsToSanitize.forEach(field => {
    if (field in sanitized) {
      sanitized[field] = '***REDACTED***';
    }
  });

  return sanitized;
};

// Validate password strength
export const validatePasswordStrength = (password: string): { isStrong: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one digit');
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*)');
  }

  return {
    isStrong: errors.length === 0,
    errors,
  };
};
