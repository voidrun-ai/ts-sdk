import { BASE_PATH } from './api-client';

const { VR_API_KEY, VR_API_URL = BASE_PATH } = process.env;

export const constants = {
  apiKey: VR_API_KEY,
  apiUrl: VR_API_URL,
  defaultSandboxImage: 'code',
  defaultSandboxCpu: 1,
  defaultSandboxMem: 1024,
};
