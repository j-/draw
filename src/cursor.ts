export const generateCursorProperty = (size: number, color: string = 'black') => {
  const radius = size / 2;
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2 2' width='${size}' height='${size}'%3E%3Ccircle cx='1' cy='1' r='1' fill='${encodeURIComponent(color)}' /%3E%3C/svg%3E") ${radius} ${radius}, crosshair`;
};
