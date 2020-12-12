import { SHOW_ALERT, HIDEN_ALERT } from '../../types/index';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:

      return {
        alert: action.payload
      }

    case HIDEN_ALERT:
      return {
        alert: null
      }

    default:
      return state;
  }
}