const convertDate = (inputDate = void 0) => {
  const date = inputDate ? new Date(inputDate.replaceAll("-", "/")) : /* @__PURE__ */ new Date();
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${inputDate}`);
  }
  const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const fullMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return {
    to(format) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const monthNumber = String(month + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDates = {
        "MMM-DD": `${shortMonthNames[month]} ${day}`,
        "MMM-YYYY": `${shortMonthNames[month]} ${year}`,
        "MMM-DD-YYYY": `${shortMonthNames[month]} ${day}, ${year}`,
        "MMMM-YYYY": `${fullMonthNames[month]} ${year}`,
        "YYYY-MM": `${year}-${monthNumber}`,
        "YYYY-MM-DD": `${year}-${monthNumber}-${day}`
      };
      return formattedDates[format];
    },
    nextMonth() {
      date.setMonth(date.getMonth() + 1);
      return { to: this.to };
    },
    prevMonth() {
      date.setMonth(date.getMonth() - 1);
      return { to: this.to };
    }
  };
};

export { convertDate as c };
