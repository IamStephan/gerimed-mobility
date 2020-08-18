function SanitizeErrors(e) {
  /**
   * This checks for starpi errors
   */
  if(e.response?.data?.message) {
    const errors = e.response?.data?.message?.[0]?.messages

    const listOfErrors = []
    
    for(let i = 0; i < errors.length; i++) {
      listOfErrors.push({
        id: errors[i].id,
        message: errors[i].message
      })
    }

    return listOfErrors

  } else {
    return [
      {
        id: Math.random(),
        message: e.message
      }
    ]
  }
}

export {
  SanitizeErrors
}