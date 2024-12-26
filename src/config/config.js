// config.js
const config = {
  development: {
    apiDomain: 'https://pre-dxzg-api.dexunzhenggu.cn/admin',
  },
  production: {
    apiDomain: 'https://pre-dxzg-api.dexunzhenggu.cn/admin',
  },
  // 你可以继续添加更多环境配置，比如 staging 等
};

const getApiDomain = () => {
  if (__DEV__) {
    return config.development.apiDomain; // 开发环境
  } else {
    return config.production.apiDomain; // 生产环境
  }
};

export default getApiDomain;
