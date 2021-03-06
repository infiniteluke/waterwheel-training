import { ADD_TODO, DELETE_TODO, EDIT_TODO, LIKE_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'

const initialState = [
  {
    text: 'Add a like button',
    completed: true,
    id: 2,
    numLikes: 0,
  },
  {
    text: 'Use Redux',
    completed: true,
    id: 1,
    numLikes: 0,
  },
  {
    text: 'Connect to Drupal with Waterwheel!',
    completed: false,
    id: 0,
    numLikes: 0,
  }
]

export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text,
          numLikes: 0,
        },
        ...state
      ]

    case DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      )

    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, text: action.text } :
          todo
      )

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, completed: !todo.completed } :
          todo
      )

    case LIKE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, numLikes: todo.numLikes + 1 } :
          todo
      )

    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}
