// createSandbox forwards publishPorts, and VRSandbox exposes it.

import assert from 'node:assert/strict';
import test from 'node:test';

import {
  Configuration,
  type Sandbox as SandboxModel,
} from '../src/api-client/index.js';
import { VoidRun } from '../src/index.js';
import VRSandbox from '../src/Sandbox.js';

function makeFakeFetch(responseBody: unknown) {
  const calls: { url: string; body?: unknown }[] = [];
  const fetchApi = async (input: RequestInfo | URL, init?: RequestInit) => {
    let body: unknown;
    if (typeof init?.body === 'string') {
      try {
        body = JSON.parse(init.body);
      } catch {
        body = init.body;
      }
    }
    calls.push({ url: String(input), body });
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
  ...overrides,
});

test('createSandbox forwards publishPorts in the request body', async () => {
  const { fetchApi, calls } = makeFakeFetch({
    status: 'success',
    data: sandboxModel({ publishPorts: [8080, 3000] }),
  });
  const originalFetch = globalThis.fetch;
  globalThis.fetch = fetchApi as unknown as typeof globalThis.fetch;
  try {
    const vr = new VoidRun({
      apiKey: 'k',
      baseUrl: 'https://api.example.com/api',
    });
    await vr.createSandbox({
      name: 'demo',
      cpu: 1,
      mem: 1024,
      publishPorts: [8080, 3000],
    });
  } finally {
    globalThis.fetch = originalFetch;
  }

  const createCall = calls.find((c) => c.url.endsWith('/sandboxes'));
  assert.ok(createCall, 'expected a POST /sandboxes call');
  assert.deepEqual(
    (createCall.body as { publishPorts?: number[] }).publishPorts,
    [8080, 3000],
  );
});

test('VRSandbox exposes publishPorts from the model', () => {
  const config = new Configuration({
    basePath: 'https://api.example.com/api',
    apiKey: 'k',
  });
  const sandbox = new VRSandbox(sandboxModel({ publishPorts: [8080] }), config);
  assert.deepEqual(sandbox.publishPorts, [8080]);
});
