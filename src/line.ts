export type LineToPathOptions = {
  strokeWidth?: number | string;
};

export const lineToPath = (
  d: string,
  {
    strokeWidth
  }: LineToPathOptions = {},
): SVGPathElement => {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);
  path.setAttribute('stroke', 'black');
  path.setAttribute('fill', 'transparent');
  if (strokeWidth != null) {
    path.setAttribute('stroke-width', `${strokeWidth}`);
  }
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute('stroke-linecap', 'round');
  return path;
};
