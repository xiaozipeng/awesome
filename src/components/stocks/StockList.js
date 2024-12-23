import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const StockList = ({data}) => {
  // 从接口返回的数据结构中提取出股票列表
  const stockData = data?.data?.list || [];

  const renderItem = ({item}) => {
    return (
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f5d']}
        style={styles.itemContainer}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={styles.itemContent}>
          <Text style={styles.title}>{item.secu_abbr}</Text>
          <Text style={styles.subtitle}>行业: {item.category}</Text>
          <Text style={styles.subtitle}>首板时间: {item.first_time_str}</Text>
          <Text style={styles.subtitle}>涨幅: {item.latest_increase}%</Text>
          <Text style={styles.subtitle}>
            封单金额: {item.seal_amount.toLocaleString()}
          </Text>
        </View>
      </LinearGradient>
    );
  };

  return (
    <FlatList
      data={stockData}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      ListEmptyComponent={<Text>没有更多数据</Text>}
      style={styles.list} // 确保列表也占满父容器
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 5, // 阴影效果 (适用于安卓)
    shadowColor: '#000', // 阴影效果 (适用于iOS)
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  list: {
    width: '100%', // 确保 FlatList 占满 100% 的宽度
    padding: 10,
  },
  itemContent: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
});
export default StockList;
