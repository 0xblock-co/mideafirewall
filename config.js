const apiPath = {
  v1: "/api/v1",
};

const ports = {
  backendPort: 4000,
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
      return ``;
    default:
      return `http://localhost:${ports.backendPort}`;
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
