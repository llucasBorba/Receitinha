import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";

export default function Home({ navigation }) {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Mês atual
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Ano atual

  // Função para buscar dados da API
  const fetchDaysFromAPI = async (month, year) => {
    const apiUrl = `https://api.api-ninjas.com/v1/worldtime?timezone=UCT`; // Atualize com a URL correta
    try {
      const response = await fetch(apiUrl, {
        headers: {
          "X-Api-Key": "fWXlitNqjJ8biPDbr+lUmw==pZKpMtPqxiKmJtFa", // Substitua por sua chave da API
        },
      });
      if (response.ok) {
        const data = await response.json();
        // Simula a criação de dias com base no mês selecionado
        const daysInMonth = new Date(year, month, 0).getDate(); // Dias no mês
        const daysArray = Array.from({ length: daysInMonth }, (_, index) => ({
          date: `${year}-${String(month).padStart(2, "0")}-${String(index + 1).padStart(2, "0")}`,
          dayOfWeek: new Date(year, month - 1, index + 1).toLocaleDateString("pt-BR", {
            weekday: "short",
          }).toUpperCase(),
        }));
        setDays(daysArray);
        setSelectedDay(daysArray[0]?.date || null); // Seleciona o primeiro dia
      } else {
        Alert.alert("Erro", `Erro ao buscar dados da API: ${response.status}`);
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao acessar a API.");
    }
  };

  // Atualiza os dias ao alterar o mês ou ano
  useEffect(() => {
    fetchDaysFromAPI(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  return (
    <View style={styles.container}>
      {/* Botões para escolher o mês */}
      <View style={styles.monthSelector}>
        <TouchableOpacity
          onPress={() => setSelectedMonth((prev) => (prev > 1 ? prev - 1 : 12))}
        >
          <Text style={styles.monthButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {new Date(selectedYear, selectedMonth - 1).toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric",
          })}
        </Text>
        <TouchableOpacity
          onPress={() => setSelectedMonth((prev) => (prev < 12 ? prev + 1 : 1))}
        >
          <Text style={styles.monthButton}>{">"}</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de dias */}
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
                selectedDay === day.date && styles.selectedDayText,
              ]}
            >
              {day.dayOfWeek}
            </Text>
            <Text
              style={[
                styles.dateText,
                selectedDay === day.date && styles.selectedDayText,
              ]}
            >
              {new Date(day.date).getDate()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão para adicionar uma refeição */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar Refeição</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#f5f5f5",
  },
  monthSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
  },
  monthButton: {
    fontSize: 24,
    fontWeight: "bold",
  },
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  dayItem: {
    width: "18%",
    alignItems: "center",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#e0e0e0",
  },
  selectedDay: {
    backgroundColor: "#4caf50",
  },
  dayText: {
    fontSize: 14,
  },
  dateText: {
    fontSize: 16,
  },
  selectedDayText: {
    color: "#fff",
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
