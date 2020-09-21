function extractStrapiErrors(data) {
  let listOfErrors = []

  // I seriously have trust issues with strapi errors
  try {
    data.errors.forEach(errExt => {
      // These are errors based on strapi extentions
      errExt.extensions.exception.data.message.forEach((errMes) => {
        // These are errors based on the errors per this extention (Which for some reason has more arrays?!?!?!)
        errMes.messages.forEach((actualError) => {
          listOfErrors.push(actualError)
        })
      })
    })
  } catch(e) {
    listOfErrors.push({
      message: 'An unkown error occured'
    })
  }
  

  return listOfErrors
}

export {
  extractStrapiErrors
}