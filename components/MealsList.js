import { View, Text, FlatList, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import React from 'react'

export default function MealsList({filteredMeals, navigation, handleDeleteMeal}) {
  return (
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
            <Pressable style={styles.check}
            onPress={() => handleDeleteMeal(item.id)}
            >
                <Text style={styles.buttonText}>Deletar</Text>
            </Pressable>
          </TouchableOpacity>
        )}
      />
  )
}

const styles = StyleSheet.create({
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
      justifyContent: "center"
    },
    buttonText: {
        color: "#AADCC8",
        fontSize: 16, 
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: "NewYorkMedium-Bold"
      },
  });
  