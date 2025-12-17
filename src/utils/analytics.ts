export function toLocalISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}



export function getGrowth(a: number, b: number): number | null {
  return b ? (a - b) / b : null
}



export function getPeriodBetweenDates(date1 : Date, date2 : Date) {
  const d1  = new Date(date1);
  const d2 = new Date(date2);

  const diffInMs = Math.abs(d2.getTime() - d1.getTime());
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  // Years (approx. 365 days)
  const years = Math.floor(diffInDays / 365);
  if (years >= 1) {
    return { value: years, period: "year" };
  }

  // Months (approx. 30.44 days avg)
  const months = Math.floor(diffInDays / 30.44);
  if (months >= 1) {
    return { value: months, period: "month" };
  }

  // Weeks
  const weeks = Math.floor(diffInDays / 7);
  if (weeks >= 1) {
    return { value: weeks, period: "week" };
  }

  // Days
  return { value: diffInDays, period: "day" };
}