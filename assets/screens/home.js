import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Stack } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>

      <View style={styles.date}>
        <Text>
          <Text style={styles.hoje}>Hoje</Text>
          <Text style={styles.numbers}>, 1 fev 2020</Text>
        </Text>
      </View>

      <View style={styles.dateSection}>

      </View>

      <Text> 
        <Text style={styles.addReceitas}> Adicione uma refeição para começar...</Text>
      </Text>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar Refeição</Text>
      </TouchableOpacity>

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
    width: "100%",
    marginLeft: 50
  }, 
  hoje: {
    color: "#00664E",
    fontWeight: "800",
    fontSize: 24,
    fontWeight: 900,
  },
  numbers : { 
    fontSize: 24,
  },
  dateSection: {
    backgroundColor: "white",
    width: "90%",
    height: 150,
    borderRadius: 20
  },
  addReceitas: { 
    fontSize: 24, 
    fontWeight: 700,
    color: "#D5D5D5"
  },
  addButton: { 
    marginTop: 20,
    backgroundColor: "#00664E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  }, 
  addButtonText: { 
    color: "#AADCC8",
    fontSize: 18,
    fontWeight: "bold",
  }
});
