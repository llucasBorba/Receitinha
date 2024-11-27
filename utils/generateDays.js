export const generateDays = (month, year, setDays, setSelectedDay) => {    
    const daysInMonth = new Date(year, month, 0).getDate();

    const daysArray = Array.from({ length: daysInMonth }, (_, index) => {
      const currentDate = new Date(year, month - 1, index + 1);
      return {
        date: `${year}-${String(month).padStart(2, "0")}-${String(
          index + 1
        ).padStart(2, "0")}`,
        dayOfWeek: currentDate
          .toLocaleDateString("pt-BR", { weekday: "short" })
          .toUpperCase()
          .replace(".", ""),
      };
    });

    setDays(daysArray);

    const today = new Date();
    const todayFormatted = today.toISOString().split("T")[0];
    setSelectedDay(todayFormatted);
  };