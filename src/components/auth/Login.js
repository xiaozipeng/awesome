import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import getApiDomain from '../../config/config';
import { setToken } from '../../util/token';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const domain = getApiDomain();
  const url = `${domain}/api/v1/login`;
  const handleLogin = async () => {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ username, password, code: verificationCode }),
    });
    const data = await response.json();
    console.log(data);
    // todo delete;
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhc2NvcGUiOiIiLCJkZXB0SWQiOjEsImV4cCI6MTczNTIyOTA2NCwiaWRlbnRpdHkiOjEwMywibmljZSI6Inh6cCIsIm9yaWdfaWF0IjoxNzM1MjAwMjY0LCJyb2xlaWQiOjEsInJvbGVrZXkiOiJhZG1pbiIsInJvbGVuYW1lIjoi57O757uf566h55CG5ZGYIn0.gkYaOz95YHgYKeLrVlg0j2fgQNB_XzrE-zE6m2fitB0`
    await setToken(token);
    navigation.navigate('StockList');
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
      <TextInput
        style={styles.input}
        placeholder="手机验证码"
        keyboardType="numeric"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />
      <Button title="登录" onPress={handleLogin} />
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
});

export default Login;
