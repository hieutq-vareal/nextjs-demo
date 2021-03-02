import defaultState from '../stateDefinitions';
import SET_POKEMON from './setPokemon';

const reducers = {
  SET_POKEMON
};

export default (state = defaultState, action = {}) => {
  if (reducers[action.type] === undefined) {
    return state;
  }
  return reducers[action.type](state, action);
};
