export const dateTimeFormat = (timestamp: string): string => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  const todayDate = new Date();
  const today = getFullDate(todayDate);

  const timestampDate = new Date(timestamp);
  const timestampDay = getFullDate(timestampDate);

  if (todayDate.getFullYear() !== timestampDate.getFullYear()) {
    dateOptions.year = "numeric";
  }

  const dateStr = `${timestampDate.toLocaleString("ru", dateOptions)}  в `;
  const date = today === timestampDay ? "" : dateStr;

  const time = timestampDate.toLocaleString("ru", timeOptions);

  return date + time;
};

const getFullDate = (date: Date): string => {
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
