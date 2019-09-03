
const initialState = {
  submit: false,
  stepName: '',
  activeStep: ''
}

export default function dishes(state = initialState, action) {
  const { payload } = action

  switch (action.type) {
    case 'SELECT_STEP':
      return {
        ...state, stepName: payload
      }
    
    case 'SELECT_INDEX':
      return {
        ...state, activeStep: payload
      }
    
    case 'SUBMIT':
      return {
        ...state, submit: payload
      }

    default:
      return state
  }
}