export default (storeState, {payload}) => {
  let newState = Object.assign({}, storeState);

  newState.pokemon = payload;

  return newState;
};
