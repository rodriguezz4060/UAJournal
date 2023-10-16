export const updateProfile = (formData) => {
  return {
    type: 'UPDATE_PROFILE',
    payload: formData,
  }
}
