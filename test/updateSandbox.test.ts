// sandbox.update forwards PATCH /sandboxes/{id}

import assert from 'node:assert/strict';
import test from 'node:test';

import {
  Configuration,
  type Sandbox as SandboxModel,
} from '../src/api-client/index.js';
import VRSandbox from '../src/Sandbox.js';

function makeFakeFetch(responseBody: unknown) {
  const calls: { url: string; method?: string; body?: unknown }[] = [];
  const fetchApi = async (input: RequestInfo | URL, init?: RequestInit) => {
    let body: unknown;
    if (typeof init?.body === 'string') {
      try {
        body = JSON.parse(init.body);
      } catch {
        body = init.body;
      }
    }
    calls.push({ url: String(input), method: init?.method, body });
    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };
  return { fetchApi, calls };
}

const sandboxModel = (overrides: Partial<SandboxModel> = {}): SandboxModel => ({
  id: '65fabc1234567890abcdef12',
  name: 'sb',
  cpu: 1,
  mem: 1024,
  orgId: 'org1',
  createdAt: new Date('2026-01-01T00:00:00Z'),
  createdBy: 'user1',
  status: 'running',
  autoSleep: true,
  ...overrides,
});

test('sandbox.update PATCHes autoSleep false', async () => {
  const { fetchApi, calls } = makeFakeFetch({
    status: 'success',
    data: sandboxModel({ autoSleep: false }),
  });
  const sandbox = new VRSandbox(
    sandboxModel(),
    new Configuration({
      basePath: 'https://api.example.com/api',
      apiKey: 'k',
      fetchApi: fetchApi as unknown as typeof fetch,
    }),
  );

  await sandbox.update({ autoSleep: false });

  const patchCall = calls.find((c) => c.method === 'PATCH');
  assert.ok(patchCall, 'expected PATCH /sandboxes/{id}');
  assert.match(patchCall.url, /\/sandboxes\/65fabc1234567890abcdef12$/);
  assert.deepEqual(patchCall.body, { autoSleep: false });
  assert.equal(sandbox.autoSleep, false);
});
