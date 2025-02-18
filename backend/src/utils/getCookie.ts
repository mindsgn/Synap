import { promises as fs } from 'fs';
import path from 'path';

/**
 * Reads a Netscape cookie file and returns a cookie header string.
 * Each non-comment line is expected to have at least 7 fields:
 * [domain, flag, path, secure, expiration, name, value]
 */
export async function getCookieString(cookieFilePath: string): Promise<string> {
  try {
    const content = await fs.readFile(cookieFilePath, 'utf8');
    const lines = content.split('\n');
    const cookies: string[] = [];
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      // Split line into parts (tab or space separated)
      const parts = trimmed.split(/\s+/);
      // Check if the line has at least 7 fields
      if (parts.length >= 7) {
        const name = parts[5];
        const value = parts[6];
        cookies.push(`${name}=${value}`);
      }
    }
    
    return cookies.join('; ');
  } catch (error) {
    console.error('Error reading cookie file:', error);
    return '';
  }
}