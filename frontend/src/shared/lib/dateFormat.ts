export const dateFormat = (timestamp: string, full = false): string => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  if (full) {
    dateOptions.month = "long";
    dateOptions.hour = "numeric";
    dateOptions.minute = "numeric";
  }

  return new Date(timestamp).toLocaleString("ru", dateOptions);
};
