function getById(desiredArray, id){
  return desiredArray.find((item) => item.id === id);
}

export {getById};
