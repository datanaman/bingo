import { combineReducers } from 'redux';

const INITIAL_STATE = {
  current: 'current value',
  possible: 'future value',
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_FRIEND':
      // Pulls current and possible out of previous state
      // We do not want to alter state directly in case
      // another action is altering it at the same time
      const {
        current,
        possible,
      } = state;

      // Pull friend out of friends.possible
      // Note that action.payload === friendIndex
      //const addedFriend = possible.splice(action.payload, 1);

      // And put friend in friends.current
      current = action.payload;
      console.log(action);

      // Finally, update our redux state
      const newState = { current, possible };
      return newState;
    default:
      return state
  }
};

export default combineReducers({
  games: gameReducer,
});

export const addFriend  = (friendIndex) => (
  {
    type: 'ADD_FRIEND',
    payload: friendIndex,
  }
);