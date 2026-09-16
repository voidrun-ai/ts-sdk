/** Build https://{nodeId}-{apiBaseDomain}[/api…] from the fleet base URL. */
export function nodeApiBaseURL(
  fleetBase: string,
  nodeId?: string | null,
): string {
  const raw = (fleetBase || '').trim();
  const handle = (nodeId || '').trim().toLowerCase();
  if (!raw || !handle) return raw;

  const withProto = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  let u: URL;
  try {
    u = new URL(withProto);
  } catch {
    return raw;
  }

  const domain = apiBaseDomainFromHost(u.hostname);
  u.hostname = `${handle}-${domain}`;
  const path = u.pathname === '/' ? '' : u.pathname.replace(/\/+$/, '');
  return `${u.origin}${path}${u.search}`;
}

export function apiBaseDomainFromHost(hostname: string): string {
  const host = hostname.trim().toLowerCase().split(':')[0];
  const m = host.match(/^[a-z0-9]{10}-(.+)$/);
  return m ? m[1] : host;
}
