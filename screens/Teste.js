import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Teste({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Bem-vindo à Home Screen!</Text>

      <Button
        title="Ir para Days"
        onPress={() => navigation.navigate('Days')}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
