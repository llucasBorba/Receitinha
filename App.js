import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      <View style ={styles.date}>
        <Text style={styles.hoje}>Hoje, </Text> <Text>1 fev 2020</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECECEC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: { 
    backgroundColor: "white", 
    width: 300,
    height: 100,
    flexDirection: "row"
  }, 
  hoje: {
    color: "00664E",
    fontWeight: "800"
    
  }
});
