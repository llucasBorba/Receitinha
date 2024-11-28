import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";

export default function Teste({ navigation, route }) {
  const [newMealTitle, setNewMealTitle] = useState("");

  const handleAddMeal = () => {
    if (newMealTitle.trim()) {
      // Passar o título da refeição para a tela anterior
      route.params?.onAddMeal(newMealTitle);
      setNewMealTitle("");
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vai comer o que?</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Refeição"
        value={newMealTitle}
        onChangeText={setNewMealTitle}
      />
      <View style={styles.buttonsContainer}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={[styles.button, styles.cancelButton]}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </Pressable>
        <Pressable
          onPress={handleAddMeal}
          style={[styles.button, styles.addButton]}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "NewYorkSmall-Bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#99999",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontFamily: "NewYorkSmall-Bold",
    fontSize: 19,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: 150,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: "#AADCC8",
  },
  addButton: {
    backgroundColor: "#00664E",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "NewYorkSmall-Bold",
    fontSize: 17,
  },
});
