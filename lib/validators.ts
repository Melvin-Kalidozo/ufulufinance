export async function generateRef(prefix: string, exists: (ref: string) => Promise<boolean>) {
  for (let i = 0; i < 20; i++) {
    const ref = `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
    if (!(await exists(ref))) return ref;
  }
  return `${prefix}-${Date.now()}`;
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string) {
  return /^[+0-9][0-9\s\-()]{6,19}$/.test(phone.trim());
}
