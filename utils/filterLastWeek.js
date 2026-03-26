function filterLastWeek(transactions) {
  const todayStr = getFormattedDate();
  const lastWeekStr = getLastWeekStart();

  return transactions.filter(t => {
    const tComparable = convertToComparable(t.date);
    const lastWeekComparable = convertToComparable(lastWeekStr);
    const todayComparable = convertToComparable(todayStr);

    return tComparable >= lastWeekComparable && tComparable <= todayComparable;
  });
}
