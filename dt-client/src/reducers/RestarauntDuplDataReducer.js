const RestarauntDuplDataReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_DUPLICATE_DATA':
      return action.data;

    default:
      return state;
  }
}

export default RestarauntDuplDataReducer