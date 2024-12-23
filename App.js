import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import FetchDataComponent from './src/components/FetchDataComponent'; // 根据实际路径导入

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FetchDataComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // 确保 SafeAreaView 填满整个屏幕
  },
});

export default App;
