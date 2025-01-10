import React, {useState, useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StockList from './src/components/stocks/StockList'; // 根据实际路径导入
import Login from './src/components/auth/Login'; // 根据实际路径导入
import {getToken} from './src/util/token';

const Stack = createNativeStackNavigator();

const App = () => {
  const [token, setToken] = useState(null); // token 用于模拟登录状态
  useEffect(() => {
    const token = async () => {
      const token = await getToken();
      setToken(token);
    };
    token();
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator initialRouteName={token ? 'StockList' : 'Login'}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="StockList"
            component={StockList}
            options={{headerShown: true, title: '涨停列表'}}
          />
        </Stack.Navigator>
        <Toast />
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // 确保 SafeAreaView 填满整个屏幕
  },
});

export default App;
