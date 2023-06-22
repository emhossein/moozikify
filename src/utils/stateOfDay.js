const stateOfDay = () => {
  const now = new Date();
  const hour = now.getHours();

  let state = "";

  if (hour >= 5 && hour < 12) {
    state = "morning";
  } else if (hour >= 12 && hour < 18) {
    state = "afternoon";
  } else if (hour >= 18 && hour < 22) {
    state = "evening";
  } else {
    state = "night";
  }

  return `Good ${state}`;
};

export default stateOfDay;
