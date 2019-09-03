export default {
  requiredValidate: (name) => {
    let error = ''
    const nameArray = name.trim()

    if (nameArray.length < 1) {
      error = 'Required'
    }

    return error

  }
}
