import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadMeals = async (setMeals) => {
    try {
      const storedMeals = await AsyncStorage.getItem("@meals");
      if (storedMeals) {
        setMeals(JSON.parse(storedMeals));
      }
    } catch (error) {
      console.error("Erro ao carregar refeições:", error);
    }
  };

  export const saveMeals = async (updatedMeals) => {
    try {
      await AsyncStorage.setItem("@meals", JSON.stringify(updatedMeals));
    } catch (error) {
      console.error("Erro ao salvar refeições:", error);
    }
  };

  export const handleDeleteMeal = async (id, setMeals) => {
    const updatedMeals = meals.filter((meal) => meal.id !== id);
    setMeals(updatedMeals);
    await saveMeals(updatedMeals); // Atualiza o AsyncStorage
  };