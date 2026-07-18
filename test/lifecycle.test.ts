// Lifecycle methods must call OpenAPI sleep/wake/start (not removed stop/pause/resume).

import assert from 'node:assert/strict';
import test from 'node:test';

import {
  Configuration,
  type Sandbox as SandboxModel,
} from '../src/api-client/index.js';
import VRSandbox from '../src/Sandbox.js';

type FetchCall = {
  url: string;
  method?: string;
};

function makeFakeFetch() {
  const calls: FetchCall[] = [];
  const fetchApi = async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({ url: String(input), method: init?.method });
    return new Response(JSON.stringify({ status: 'success', message: 'ok' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };
  return { fetchApi, calls };
}

function makeSandbox(fetchApi: typeof globalThis.fetch) {
  const config = new Configuration({
    basePath: 'https://api.example.com/api',
    apiKey: 'k',
    fetchApi,
  });
  const model: SandboxModel = {
    id: '65fabc1234567890abcdef12',
    name: 'sb',
    cpu: 1,
    mem: 1024,
    orgId: 'org1',
    createdAt: new Date('2026-01-01T00:00:00Z'),
    createdBy: 'user1',
    status: 'running',
  };
  return new VRSandbox(model, config);
}

const id = '65fabc1234567890abcdef12';

test('sleep POSTs /sandboxes/{id}/sleep', async () => {
  const { fetchApi, calls } = makeFakeFetch();
  const sandbox = makeSandbox(fetchApi as unknown as typeof globalThis.fetch);
  await sandbox.sleep();
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, new RegExp(`/sandboxes/${id}/sleep$`));
  assert.equal(calls[0].method, 'POST');
});

test('wake POSTs /sandboxes/{id}/wake', async () => {
  const { fetchApi, calls } = makeFakeFetch();
  const sandbox = makeSandbox(fetchApi as unknown as typeof globalThis.fetch);
  await sandbox.wake();
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, new RegExp(`/sandboxes/${id}/wake$`));
});

test('start POSTs /sandboxes/{id}/start', async () => {
  const { fetchApi, calls } = makeFakeFetch();
  const sandbox = makeSandbox(fetchApi as unknown as typeof globalThis.fetch);
  await sandbox.start();
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, new RegExp(`/sandboxes/${id}/start$`));
});

test('pause aliases sleep', async () => {
  const { fetchApi, calls } = makeFakeFetch();
  const sandbox = makeSandbox(fetchApi as unknown as typeof globalThis.fetch);
  await sandbox.pause();
  assert.match(calls[0].url, new RegExp(`/sandboxes/${id}/sleep$`));
});

test('resume aliases wake', async () => {
  const { fetchApi, calls } = makeFakeFetch();
  const sandbox = makeSandbox(fetchApi as unknown as typeof globalThis.fetch);
  await sandbox.resume();
  assert.match(calls[0].url, new RegExp(`/sandboxes/${id}/wake$`));
});

test('stop aliases sleep', async () => {
  const { fetchApi, calls } = makeFakeFetch();
  const sandbox = makeSandbox(fetchApi as unknown as typeof globalThis.fetch);
  await sandbox.stop();
  assert.match(calls[0].url, new RegExp(`/sandboxes/${id}/sleep$`));
});
