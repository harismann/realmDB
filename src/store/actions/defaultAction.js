import * as actionType from '../types';

export const increment = i => ({type: actionType.INCREMENT, i: i ? i : 1});
export const decrement = i => ({type: actionType.INCREMENT, i: i ? i : 1});
