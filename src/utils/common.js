function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Генерирует случайный id от 0 до 2 */
function generateId() {
  return Math.floor(Math.random() * 3);
}

export {getRandomArrayElement, getRandomInt, generateId};
