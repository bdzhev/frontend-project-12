const BASE_API_PATH = '/api/v1';

export const apiPaths = {
  login: () => `${BASE_API_PATH}/login`,
  signup: () => `${BASE_API_PATH}/signup`,
};

export const routes = {
  main: '/',
  login: '/login',
  signup: '/signup',
};
