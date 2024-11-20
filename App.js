import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";



const Agenda = () => {
  const days = [
    { date: "2024-11-19", dayOfWeek: "DOM" },
    { date: "2024-11-20", dayOfWeek: "SEG" },
    { date: "2024-11-21", dayOfWeek: "TER" },
    { date: "2024-11-22", dayOfWeek: "QUA" },
    { date: "2024-11-23", dayOfWeek: "QUI" },
  ];

  const events = [
    { id: "1", title: "Reunião com equipe", time: "10:00 AM", date: "2024-11-19" },
    { id: "2", title: "Treino na academia", time: "15:00 PM", date: "2024-11-19" },
    { id: "3", title: "Estudo de React Native", time: "19:00 PM", date: "2024-11-20" },
    { id: "4", title: "Caminhada", time: "07:00 AM", date: "2024-11-21" },
  ];

  const [selectedDay, setSelectedDay] = useState(days[0].date);

  const filteredEvents = events.filter((event) => event.date === selectedDay);

  return (
    <View style={styles.container}>

      <View style={styles.date}>
        <Text>
          <Text style={styles.hoje}>Hoje</Text>
          <Text style={{fontSize: 24}}>, 1 fev 2020</Text>
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
          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventTime}>{item.time}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={[styles.secundaryColorBold, {fontSize: 18}]}>Adicionar Refeição</Text>
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
    fontFamily: "NewYork"
   }, 
   
  date: { 
    marginBottom: 20,
    marginLeft: 20
  }, 
  hoje: {
    color: "#00664E",
    fontWeight: "800",
    fontSize: 24,
    fontWeight: 900,
    fontFamily: "NewYork"
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
    justifyContent: "space-around"
  },
  dayText: {
    color: "#818181",
    fontSize: 15,
    fontWeight: "bold"
  },
  dateText: {
    color: "#818181",
    fontSize: 16,
    fontWeight: "bold",
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
    marginTop: 150    
  },
  eventItem: {
    backgroundColor: "#FFF",
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventTime: {
    fontSize: 14,
    color: "#757575",
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

export default Agenda;
