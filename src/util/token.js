import AsyncStorage from '@react-native-async-storage/async-storage';

// 存储 token
export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    console.error('Error storing token', error);
  }
};

// 获取 token
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('userToken');
  } catch (error) {
    console.error('Error getting token', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    console.log('Token removed successfully!');
  } catch (error) {
    console.error('Error removing token', error);
  }
};
