import * as actionType from '../types';

const initialState = {
  counter: 0,
};

export default function regularReducer(state = initialState, action) {
  switch (action.type) {
    case actionType.INCREMENT:
      return {
        ...state,
        counter: state.counter + action.i,
      };
    case actionType.DECREMENT:
      return {
        ...state,
        counter: state.counter - action.i,
      };
    default:
      return state;
  }
}
