export const formatDate = (value) => {
  if (!value) return '';
  const date = typeof value === 'string' ? new Date(value) : value;
  return new Intl.DateTimeFormat('ro-RO', { dateStyle: 'medium' }).format(date);
};

export const hasTimeConflict = (existingDate, existingTime, candidateDate, candidateTime) => {
  return existingDate === candidateDate && existingTime === candidateTime;
};
