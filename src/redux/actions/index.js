export default {
  selectStep: (bool) =>
  (dispatch) => {
    dispatch({
      type: 'SELECT_STEP',
      payload: bool
    })
  },

  activeStepIndex: (bool) =>
  (dispatch) => {
    dispatch({
      type: 'SELECT_INDEX',
      payload: bool
    })
  },

  submit: (bool) =>
  (dispatch) => {
    dispatch({
      type: 'SUBMIT',
      payload: bool
    })
  }

}