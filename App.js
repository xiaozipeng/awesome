import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, ActivityIndicator, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StockList from './src/components/stocks/StockList';
import Login from './src/components/auth/Login';
import {getToken} from './src/util/token';

const Stack = createNativeStackNavigator();

const App = () => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 标记加载状态

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getToken();
      console.log('token:', storedToken);
      setToken(storedToken);
      setIsLoading(false);
    };
    fetchToken();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // 背景颜色
  },
});

export default App;
