import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import HorizontalCalendar from "../components/HorizontalCalendar";

export default function Home({ navigation }) {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear] = useState(new Date().getFullYear());
  
  useEffect(() => {
    generateDays(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);


  const generateDays = (month, year) => {
    const daysInMonth = new Date(year, month - 1, 0).getDate();

    const daysArray = Array.from({ length: daysInMonth }, (_, index) => {
      const currentDate = new Date(year, month - 1, index + 1);
      return {
        date: `${year}-${String(month).padStart(2, "0")}-${String(index + 1).padStart(2, "0")}`,
        dayOfWeek: currentDate.toLocaleDateString("pt-BR", { weekday: "short" }).toUpperCase().replace(".", "")
      };

    });

    setDays(daysArray);

    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];
    setSelectedDay(todayFormatted);
  };

  const meals = [
    { id: "1", title: "Almoço", date: "2024-11-27" },
    { id: "2", title: "Lanche", date: "2024-11-27" },
    { id: "3", title: "Pré-Treino", date: "2024-11-21" },
    { id: "4", title: "Lanche", date: "2024-11-22" },
  ];

  const filteredMeals = meals.filter((meal) => meal.date === selectedDay);

  return (
    <View style={styles.container}>
      {/* Título e data de hoje */}
      <View style={styles.date}>
        <Text>
          <Text style={styles.hoje}>Hoje</Text>
          <Text style={{ fontSize: 24, fontFamily: "NewYorkMedium-Semibold" }}>
            , {new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" }).replace(".", "")}
          </Text>
        </Text>
      </View>

      <HorizontalCalendar 
        days={days}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        styles={styles}
      />

      {/* Lista de eventos */}
      <FlatList
        data={filteredMeals}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.noEvents}>Adicione uma refeição para começar...</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.eventItem}
            onPress={() => navigation.navigate("Teste")}
          >
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Pressable style={styles.check} />
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Teste")}>
        <Text style={[styles.secundaryColorBold, { fontSize: 18, fontFamily: "NewYorkMedium-Bold" }]}>
          Adicionar Refeição
        </Text>
      </TouchableOpacity>
      
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
  date: {
    marginBottom: 20,
    marginLeft: 20,
  },
  hoje: {
    color: "#00664E",
    fontWeight: "bolder",
    fontSize: 24,
    fontWeight: "900",
    fontFamily: "NewYorkMedium-Bold",
  },
  noEvents: {
    textAlign: "center",
    color: "#D5D5D5",
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    marginTop: 150,
    fontFamily: "NewYorkMedium-Bold",
  },
  eventItem: {
    backgroundColor: "#FFF",
    marginTop: 27,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 20,
    height: 90,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "NewYorkMedium-Bold",
  },
  check: {
    height: 50,
    width: 125,
    backgroundColor: "#00664E",
    borderRadius: 20,
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
});
