const apiPath = {
  v1: "/",
};

const ports = {
  backendPort: 5550,
};

const envMode = process.env.NEXT_PUBLIC_ENV_MODE;

const getEnvironment = () => {
  switch (envMode) {
    case "production":
    case "development":
      return envMode;
    default:
      return "local";
  }
};

const getLiveUrl = () => {
  switch (envMode) {
    case "production":
      return ``;
    default:
      return "http://localhost:3000";
  }
};

const getBaseUrl = () => {
  switch (envMode) {
    case "production":
    case "development":
      return `http://3.6.168.137:${ports.backendPort}/mfw/web`;
    default:
      return `http://3.6.168.137:${ports.backendPort}/mfw/web`;
  }
};

const Url = {
  baseUrl: getBaseUrl(),
  liveUrl: getLiveUrl(),
};

const appConfig = {
  BASE_URL: `${Url.baseUrl}${apiPath.v1}`,
  LIVE_URL: `${Url.liveUrl}`,
  environment: getEnvironment(),
  getBaseUrl: getBaseUrl(),
};

export default appConfig;
