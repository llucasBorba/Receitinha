import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Pressable } from "react-native";
import HorizontalCalendar from "../components/HorizontalCalendar";
import Today from "../components/Today";
import MealsList from "../components/MealsList";
import { generateDays } from "../utils/generateDays";
import { loadMeals, saveMeals } from "../utils/crudMeals";

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

  const handleDeleteMeal = async (id) => {
    const updatedMeals = meals.filter((meal) => meal.id !== id);
    setMeals(updatedMeals);
    await saveMeals(updatedMeals); 
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

      {/* Lista de Dias*/}
      <HorizontalCalendar
        days={days}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        styles={styles}
      />

      {/* Lista de refeições */}
      <MealsList filteredMeals={filteredMeals} navigation={navigation} handleDeleteMeal={handleDeleteMeal} setDays={setDays}/>

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
            <Text style={styles.modalTitle}>Vai comer o que?</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome da Refeição"
              value={newMealTitle}
              onChangeText={setNewMealTitle}
            />
            <View style={styles.modalButtons}>

              <Pressable onPress={() => setModalVisible(false)} style={styles.button}>
                <Text 
                style={{fontFamily:"NewYorkSmall-Bold", fontSize: 17, color: "#AADCC8" }}>
                  Cancelar
                </Text>
              </Pressable>

              <Pressable onPress={handleAddMeal} style={styles.button}>
                <Text 
                style={{fontFamily:"NewYorkSmall-Bold", fontSize: 17, color: "#AADCC8" }}>
                  Adicionar
                  </Text>
              </Pressable>

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
    width: "100%",
    height: "45%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 650
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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
    fontSize: 19
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: { 
    backgroundColor: "#00664E",
    width: 150,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 30
  }
});
