import getApiDomain from '../config/config';
import {setToken} from '../util/token';

const domain = getApiDomain();
export const login = async (data) => {
  const url = `${domain}/api/v1/login`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (result.code !== 200) {
    throw new Error(`${result.msg || '未知错误'}`);
  }

  const { token } = result;
  await setToken(token);
};


export const getPhoneCode = async (data) => {
  const url = `${domain}/api/v1/dxsf/dragon/up_down/sendVerification`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
  return await response.json();
};
