import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getPhoneCode, login } from '../../services/index';
import CountdownButton from '../CountdownButton';
import Toast from 'react-native-toast-message';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone_code, setPhone_code] = useState('');
  const handleLogin = () => {
    login({ username, password, phone_code })
    .then(() => {
      Toast.show({
        type: 'success',
        position: 'center',
        text1: '登录成功',
      });
      navigation.navigate('StockList');
    })
    .catch((error) => {
      Toast.show({
        type: 'error',
        position: 'center',
        text1: '登录失败',
        text2: error.message || '请稍后重试',
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>登录</Text>
      <TextInput
        style={styles.input}
        placeholder="用户名"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="密码"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TextInput
          style={{flex: 1, ...styles.input, marginRight: 10}}
          placeholder="手机验证码"
          keyboardType="numeric"
          value={phone_code}
          onChangeText={setPhone_code}
        />
        <CountdownButton label="获取" countdown={60} callback={() => getPhoneCode({username: username})} />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>登录</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Login;
