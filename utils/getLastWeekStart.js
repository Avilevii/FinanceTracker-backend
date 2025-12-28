function getLastWeekStart() {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7); 

  const day = String(lastWeek.getDate()).padStart(2, '0');
  const month = String(lastWeek.getMonth() + 1).padStart(2, '0');
  const year = lastWeek.getFullYear();
  const hours = String(lastWeek.getHours()).padStart(2, '0');
  const minutes = String(lastWeek.getMinutes()).padStart(2, '0');
  const seconds = String(lastWeek.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
