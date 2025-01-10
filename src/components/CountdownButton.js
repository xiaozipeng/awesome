import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';

const CountdownButton = ({label = '获取', countdown = 60, callback}) => {
  const [isCounting, setIsCounting] = useState(false);
  const [remainingTime, setRemainingTime] = useState(countdown);
  const [buttonLabel, setButtonLabel] = useState(label);

  const handleClick = async () => {
    if (isCounting) return;

    try {
      setIsCounting(true);
      const {code, msg} = await callback();
      if (code !== 200) {
        setIsCounting(false);
        Toast.show({
          type: 'error',
          position: 'top',
          text1: '请求失败',
          text2: `${msg || '未知错误'}`,
        });
        return false;
      }
      Toast.show({
        type: 'success',
        position: 'center',
        text1: '已发送验证码',
      });
      const timer = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime === 1) {
            clearInterval(timer);
            setIsCounting(false);
            setButtonLabel(label);
            return countdown;
          }
          setButtonLabel(`${prevTime - 1}s`);
          return prevTime - 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Callback failed:', error);
      setIsCounting(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isCounting && styles.disabledButton]}
        onPress={handleClick}
        disabled={isCounting}>
        <Text style={styles.buttonText}>{buttonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#ddd',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CountdownButton;
