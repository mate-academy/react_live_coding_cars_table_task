import colorsFromServer from '../api/colors';

export function getColorsById(colorId) {
  return colorsFromServer.find(color => color.id === colorId) || 'unknown';
}
