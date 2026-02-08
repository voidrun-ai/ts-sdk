const { VR_API_KEY, VR_API_URL = 'https://vr-api.dcdeploy.cloud/api' } = process.env;


export const constants = {
    apiKey: VR_API_KEY,
    apiUrl: VR_API_URL,
    defaultTemplateId: 'debian',
    defaultSandboxCpu: 1,
    defaultSandboxMem: 1024,
}