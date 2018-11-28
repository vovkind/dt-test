export const loadRestarauntsAction = (data) => {
  return {
    type: 'LOAD_DATA',
    data: data,
  }
}

export const saveDuplicateRestarauntsAction = (data) => {
  return {
    type: 'LOAD_DUPLICATE_DATA',
    data: data,
  }
}