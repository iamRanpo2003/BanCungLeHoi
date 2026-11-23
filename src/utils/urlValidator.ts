/**
 * Validates that a URL is a safe, publicly accessible HTTP(S) URL.
 * Blocks unsafe schemes (javascript:, data:, file:) and private/loopback/dev-only hosts.
 */
export function isValidPublicUrl(urlStr: string | null | undefined): boolean {
  if (!urlStr || !urlStr.trim()) return false;
  try {
    const parsed = new URL(urlStr.trim());
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return false;
    }

    const hostname = parsed.hostname.toLowerCase();
    // Block loopback, link-local, RFC1918 private networks, and dev-only preview hosts
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname === '::1' ||
      hostname === '[::1]' ||
      hostname.endsWith('.local') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('169.254.') ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(hostname) ||
      hostname.startsWith('ais-dev-')
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
