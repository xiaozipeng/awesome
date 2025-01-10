import React, { useState, useCallback, useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFetchData } from '../../hooks/useFetchData'; // 导入自定义 hook
import getApiDomain from '../../config/config';
const domain = getApiDomain();

const StockList = () => {
  const [page, setPage] = useState(1); // 初始化页码
  const pageSize = 10; // 每页显示的数据量
  const [allData, setAllData] = useState([]); // 存储所有加载的数据
  const [refreshing, setRefreshing] = useState(false); // 控制下拉刷新的状态
  const [actionType, setActionType] = useState('loadMore'); // 新增状态，区分刷新或加载更多

  const url = `${domain}/api/v1/dxsf/dragon/up_down/list?category=1&sort_key=id&page_index=${page}&page_size=${pageSize}`;

  const { data, loading, error, refetch } = useFetchData(url);

  const handleLoadMore = useCallback(() => {
    if (!loading && data?.data?.list?.length > 0) {
      setPage(prevPage => prevPage + 1); // 上拉时更新页码，加载下一页
      setActionType('loadMore'); // 设置为加载更多操作
    }
  }, [loading, data]);

  const handleRefresh = useCallback(() => {
    setActionType('refresh'); // 设置为刷新操作
    setRefreshing(true);
    setPage(1); // 重置页码为 1
    refetch(); // 手动调用接口
  }, []);

  useEffect(() => {
    if (data?.data?.list && actionType === 'refresh') {
      setAllData(data.data.list); // 清空数据并加载新数据
      setRefreshing(false); // 停止刷新动画
    }
    if (data?.data?.list && actionType === 'loadMore' && !loading) {
      setAllData(prevData => [...prevData, ...data.data.list]); // 合并新数据到现有数据
    }
  }, [data, actionType, loading]); // 当数据或刷新状态发生变化时触发


  if (loading && page === 1 && actionType !== 'refresh') {
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

  const renderItem = ({ item }) => {
    return (
      <LinearGradient
        colors={['#ff7e5f', '#feb47b']}
        style={styles.itemContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.itemContent}>
          <Text style={styles.title}>{item.secu_abbr}</Text>
          <Text style={styles.subtitle}>行业: {item.industry}</Text>
          <Text style={styles.subtitle}>首板时间: {item.created}</Text>
          <Text style={styles.subtitle}>涨幅: {item.latest_increase}%</Text>
          <Text style={styles.subtitle}>几天几板: {item.continue_num_str}</Text>
          <Text style={styles.subtitle}>
            封单金额: {item.seal_amount.toLocaleString()}
          </Text>
        </View>
      </LinearGradient>
    );
  };

  return (
    <View style={styles.center}>
      <FlatList
        data={allData}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center', flex: 1, color: '#999' }}>没有更多数据</Text>}
        style={styles.list}
        onEndReached={handleLoadMore} // 上拉加载更多
        onEndReachedThreshold={0.1} // 距离底部多少距离触发加载更多
        onRefresh={handleRefresh} // 绑定下拉刷新方法
        refreshing={refreshing} // 控制刷新动画
        ListFooterComponent={
          loading && page > 1 ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: '100%',
    padding: 10,
  },
  itemContainer: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
  errorText: {
    color: 'red',
  },
});

export default StockList;
