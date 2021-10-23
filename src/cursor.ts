export const generateCursorProperty = (size: number, color: string = 'black') => {
  const radius = size / 2;
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-50 -50 100 100' width='${size}' height='${size}'%3E%3Ccircle cx='0' cy='0' r='50' fill='${encodeURIComponent(color)}' /%3E%3C/svg%3E") ${radius} ${radius}, crosshair`;
};
