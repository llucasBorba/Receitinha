import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Pressable } from "react-native";

export default function Home({ navigation }) {

  const days = [
    { date: "2024-11-19", dayOfWeek: "DOM" },
    { date: "2024-11-20", dayOfWeek: "SEG" },
    { date: "2024-11-21", dayOfWeek: "TER" },
    { date: "2024-11-22", dayOfWeek: "QUA" },
    { date: "2024-11-23", dayOfWeek: "QUI" },
  ];

  const events = [
    { id: "1", title: "Almoço", date: "2024-11-19" },
    { id: "2", title: "Lanche", date: "2024-11-19" },
    { id: "3", title: "Pré-Treino", date: "2024-11-20" },
    { id: "4", title: "Lanche", date: "2024-11-21" },
  ];

  const [selectedDay, setSelectedDay] = useState(days[0].date);


  const filteredEvents = events.filter((event) => event.date === selectedDay);

  return (
    <View style={styles.container}>

      <View style={styles.date}>
        <Text>
          <Text style={styles.hoje}>Hoje</Text>
          <Text style={{ fontSize: 24, fontFamily: 'NewYorkMedium-Semibold'}}>, 1 fev 2020</Text>
        </Text>
      </View>


      <View style={styles.daysContainer}>
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayItem,
              selectedDay === day.date && styles.selectedDay,
            ]}
            onPress={() => setSelectedDay(day.date)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDay === day.date && styles.secundaryColorBold
              ]}
            >
              {day.dayOfWeek}
            </Text>
            <Text
              style={[
                styles.dateText,
                selectedDay === day.date && styles.secundaryColorBold
              ]}
            >
              {new Date(day.date).getDate()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.noEvents}>Adicione uma refeição para começar...</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.eventItem}
            onPress={() => navigation.navigate('Teste')}
          >
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Pressable style={styles.check} />
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={[styles.secundaryColorBold, { fontSize: 18,fontFamily: 'NewYorkMedium-Bold'}]}>Adicionar Refeição</Text>
      </TouchableOpacity>

    </View>
  );
};

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
    marginLeft: 20
  },
  hoje: {
    color: "#00664E",
    fontWeight: "bolder",
    fontSize: 24,
    fontWeight: 900,
    fontFamily: 'NewYorkMedium-Bold'
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 10,
    height: 150,
    padding: 12
  },
  dayItem: {
    alignItems: "center",
    borderRadius: 30,
    height: 99,
    width: 61,
    borderColor: "0E6E5E",
    borderWidth: 2,
    justifyContent: "space-around",
  },
  dayText: {
    color: "#818181",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: 'NewYorkSmall-Bold'
  },
  dateText: {
    color: "#818181",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: 'NewYorkSmall-Bold'
  },
  selectedDay: {
    backgroundColor: "#0E6E5E",
    borderRadius: 30,
    borderWidth: 0,
    padding: 5,

  },
  noEvents: {
    textAlign: "center",
    color: "#D5D5D5",
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    marginTop: 150,
    fontFamily: 'NewYorkMedium-Bold'
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
    justifyContent: "space-between"
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: 'NewYorkMedium-Bold'
  },
  check: {
    height: 50,
    width: 125,
    backgroundColor: "#00664E",
    borderRadius: 20
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
    alignSelf: "center"
  },
  addButtonText: {
    fontSize: 18,
  }
});