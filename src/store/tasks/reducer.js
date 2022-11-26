import {ADD_TASK, EDIT_TASK, DELETE_TASK, TOGGLE_TASK} from "./actions";

const initialState = [
  {
    id: 1,
    title: 'do smth 1',
    date: '2022, 11, 19',
    done: false
  },
  {
    id: 2,
    title: 'do smth 2',
    date: '2022, 11, 20',
    done: true
  },
  {
    id: 3,
    title: 'do smth 3',
    date: '2022, 11, 21',
    done: false
  }
];

export const taskReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ADD_TASK:
      return [
        ...state,
        payload
      ]
    case EDIT_TASK:
      state[state.findIndex(item => item.id === payload.id)] = payload;
      return state;
    case DELETE_TASK:
      state = state.filter(item => item.id !== payload);
      return state;
    case TOGGLE_TASK:
      return state.map(item => {
        if (item.id === payload) {
          item.done = !item.done;
          return item;
        } else {
          return item;
        }
      })
    default:
      return state;
  }
}