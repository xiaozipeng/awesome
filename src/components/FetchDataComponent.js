import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import StockList from './stocks/StockList';
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhc2NvcGUiOiIiLCJkZXB0SWQiOjEsImV4cCI6MTczNDk1MTI5NSwiaWRlbnRpdHkiOjk2LCJuaWNlIjoieHpwIiwib3JpZ19pYXQiOjE3MzQ5MjI0OTUsInJvbGVpZCI6MSwicm9sZWtleSI6ImFkbWluIiwicm9sZW5hbWUiOiLns7vnu5_nrqHnkIblkZgifQ.Dpic1v9gmZ5ldthPhJwuoTczi0jY3KC6sCkJW8VMmjc`
const FetchDataComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 发起网络请求
    fetch(
      'https://dxzg-api.dexunzhenggu.cn/admin/api/v1/dxsf/dragon/up_down/list?category=1&sort_key=id',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // 可根据需要修改
          Authorization: `Bearer ${token}`, // 添加 Authorization header
        },
      },
    )
      .then(response => {
        if (!response.ok) {
          throw new Error('网络请求失败');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>加载中...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>错误: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <StockList data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FetchDataComponent;
