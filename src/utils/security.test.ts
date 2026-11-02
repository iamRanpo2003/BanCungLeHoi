import test from 'node:test';
import assert from 'node:assert/strict';

// Helper for CSV Sanitization
function sanitizeCSV(str: string | undefined): string {
  if (!str) return '""';
  let val = str.replace(/"/g, '""');
  if (/^[=\+\-@\t\r]/.test(val)) {
    val = `'${val}`;
  }
  return `"${val}"`;
}

// Helper for URL protocol validation
function isValidHttpUrl(urlStr: string): boolean {
  try {
    const parsed = new URL(urlStr);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

test('CSV Injection protection prevents formula execution triggers', () => {
  // Test formula injection triggers: =, +, -, @, tab, cr
  const formula1 = '=cmd|"/C calc"!A0';
  const formula2 = '+1+2';
  const formula3 = '-SUM(A1:A10)';
  const formula4 = '@dangerous';
  const normal = 'Lễ hội Đền Hùng';

  assert.equal(sanitizeCSV(formula1), `"'=cmd|""/C calc""!A0"`);
  assert.equal(sanitizeCSV(formula2), `"'${formula2}"`);
  assert.equal(sanitizeCSV(formula3), `"'${formula3}"`);
  assert.equal(sanitizeCSV(formula4), `"'${formula4}"`);
  assert.equal(sanitizeCSV(normal), `"${normal}"`);
});

test('Safe URL validation blocks javascript and unsafe schemes', () => {
  assert.equal(isValidHttpUrl('javascript:alert(1)'), false);
  assert.equal(isValidHttpUrl('data:text/html,<script>alert(1)</script>'), false);
  assert.equal(isValidHttpUrl('vbscript:msgbox(1)'), false);
  assert.equal(isValidHttpUrl('file:///etc/passwd'), false);
  assert.equal(isValidHttpUrl(''), false);
  assert.equal(isValidHttpUrl('not a url'), false);

  assert.equal(isValidHttpUrl('https://images.unsplash.com/photo-123'), true);
  assert.equal(isValidHttpUrl('http://example.com/fest.png'), true);
});

test('Quotes escaping in CSV avoids syntax break', () => {
  const quoteString = 'Lễ hội "Đền Trần" Nam Định';
  const escaped = sanitizeCSV(quoteString);
  assert.equal(escaped, '"Lễ hội ""Đền Trần"" Nam Định"');
});
