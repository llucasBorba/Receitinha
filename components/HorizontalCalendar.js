import React from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Pressable } from "react-native";

export default function HorizontalCalendar ({days, setSelectedDay, selectedDay})  {
  return (
    <View style={styles.daysContainer}>
        <FlatList
          data={days}
          horizontal
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.dayItem,
                selectedDay === item.date && styles.selectedDay,
              ]}
              onPress={() => setSelectedDay(item.date)}
            >
              <Text
                style={[
                  styles.dayText,
                  selectedDay === item.date && styles.secundaryColorBold,
                ]}
              >
                {item.dayOfWeek}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  selectedDay === item.date && styles.secundaryColorBold,
                ]}
              >
                {item.date.slice(8, 10)}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={days.findIndex((day) => day.date === selectedDay)}
          getItemLayout={(data, index) => ({
            length: 65, 
            offset: 100 * index, 
            index, 
          })}
        />
      </View>
  )
}
const styles = StyleSheet.create({
  secundaryColorBold: {
    color: "#AADCC8",
    fontWeight: "bold",
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 10,
    height: 150,
    padding: 12,
  },
  dayItem: {
    alignItems: "center",
    borderRadius: 30,
    height: 99,
    width: 61,
    borderColor: "#0E6E5E",
    borderWidth: 2,
    justifyContent: "space-around",
    marginRight: 10,
  },
  dayText: {
    color: "#818181",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "NewYorkSmall-Bold",
  },
  dateText: {
    color: "#818181",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "NewYorkSmall-Bold",
  },
  selectedDay: {
    backgroundColor: "#0E6E5E",
    borderRadius: 30,
    borderWidth: 0,
    padding: 5,
  }
});