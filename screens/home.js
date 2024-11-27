import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from  "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HorizontalCalendar from "../components/HorizontalCalendar";
import Today from "../components/Today";
import MealsList from "../components/MealsList";
import { generateDays } from "../utils/generateDays";
import { loadMeals, saveMeals, handleDeleteMeal } from "../utils/crudMeals";

export default function Home({ navigation }) {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear] = useState(new Date().getFullYear());
  const [meals, setMeals] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newMealTitle, setNewMealTitle] = useState("");

  useEffect(() => {
    generateDays(selectedMonth, selectedYear, setDays, setSelectedDay);
    loadMeals(setMeals);
  }, [selectedMonth, selectedYear]);

  // const loadMeals = async () => {
  //   try {
  //     const storedMeals = await AsyncStorage.getItem("@meals");
  //     if (storedMeals) {
  //       setMeals(JSON.parse(storedMeals));
  //     }
  //   } catch (error) {
  //     console.error("Erro ao carregar refeições:", error);
  //   }
  // };

  // const saveMeals = async (updatedMeals) => {
  //   try {
  //     await AsyncStorage.setItem("@meals", JSON.stringify(updatedMeals));
  //   } catch (error) {
  //     console.error("Erro ao salvar refeições:", error);
  //   }
  // };

  const handleDeleteMeal = async (id) => {
    const updatedMeals = meals.filter((meal) => meal.id !== id);
    setMeals(updatedMeals);
    await saveMeals(updatedMeals); // Atualiza o AsyncStorage
  };
  

  const handleAddMeal = () => {
    if (newMealTitle.trim()) {
      const updatedMeals = [
        ...meals,
        {
          id: (meals.length + 1).toString(),
          title: newMealTitle,
          date: selectedDay,
        },
      ];
      setMeals(updatedMeals);
      saveMeals(updatedMeals); 
      setNewMealTitle("");
      setModalVisible(false);
    }
  };

  const filteredMeals = meals.filter((meal) => meal.date === selectedDay);

  return (
    <View style={styles.container}>
      {/* Título e data de hoje */}
      <Today />

      <HorizontalCalendar
        days={days}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        styles={styles}
      />

      {/* Lista de refeições */}
      <MealsList filteredMeals={filteredMeals} navigation={navigation} handleDeleteMeal={handleDeleteMeal}/>

      {/* Botão para adicionar refeição */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text
          style={[
            styles.secundaryColorBold,
            { fontSize: 18, fontFamily: "NewYorkMedium-Bold" },
          ]}
        >
          Adicionar Refeição
        </Text>
      </TouchableOpacity>

      {/* Modal para adicionar refeição */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Nova Refeição</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome da Refeição"
              value={newMealTitle}
              onChangeText={setNewMealTitle}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Adicionar" onPress={handleAddMeal} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: "#f5f5f5",
  },
  secundaryColorBold: {
    color: "#AADCC8",
    fontWeight: "bold",
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#00664E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 50,
    width: 354,
    height: 52,
    alignSelf: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
