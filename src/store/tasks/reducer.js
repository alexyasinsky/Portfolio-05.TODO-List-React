import {ADD_TASK} from "./actions";

const initialState = [
  {
    title: 'do smth 1',
    date: '19-11-2022',
    done: false
  },
  {
    title: 'do smth 2',
    date: '20-11-2022',
    done: true
  },
  {
    title: 'do smth 3',
    date: '21-11-2022',
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
    default:
      return state;
  }
}