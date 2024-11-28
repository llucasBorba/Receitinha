import React, { useRef } from 'react';
import { View, StyleSheet, PanResponder, Animated, Dimensions } from 'react-native';

export default function SliderButton({ navigation }) {
  const pan = useRef(new Animated.Value(0)).current;

  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SLIDER_WIDTH = SCREEN_WIDTH * 0.8;
  const BUTTON_SIZE = 50;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const newX = Math.max(0, Math.min(gestureState.dx, SLIDER_WIDTH - BUTTON_SIZE));
        pan.setValue(newX);
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx >= SLIDER_WIDTH - BUTTON_SIZE - 10) {
          navigation.navigate("Home");
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.button,
            {
              transform: [{ translateX: pan }],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f7',
  },
  sliderContainer: {
    width: '80%',
    height: 60,
    backgroundColor: '#d6d6d6',
    borderRadius: 30,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#00664E',
    position: 'absolute',
    left: 0,
  },
});
