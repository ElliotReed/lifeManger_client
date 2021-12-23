export function replaceItemInArray(newItem, array) {
  const index = array.map((item) => item.id).indexOf(newItem.id);

  return [...array.slice(0, index), newItem, ...array.slice(index + 1)];
}

export function removeItemFromArray(id, array) {
  return array.filter((item) => item.id !== id);
}

export function insertItemIntoArray(item, array) {
  return array.push(item);
}
