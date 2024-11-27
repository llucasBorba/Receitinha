import React from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Pressable } from "react-native";

export default function Today ( )  {
  return (
    <View style={styles.date}>
    <Text>
      <Text style={styles.hoje}>Hoje</Text>
      <Text style={{ fontSize: 24, fontFamily: "NewYorkMedium-Semibold" }}>
        , {new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" }).replace(".", "")}
      </Text>
    </Text>
  </View>
  )
}
const styles = StyleSheet.create({

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
    }
  });