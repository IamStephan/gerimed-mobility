function SanitizeErrors(e) {
  console.log(e.response)
  if(typeof e.response?.data?.message === 'object' && typeof e.response?.data?.message[0] === 'object') {
    /**
     * Defined strapi errors
     */
    const errors = e.response.data.message
    const listOfErrors = []

    errors.forEach(({ messages }) => {
      messages.forEach(({ message, id }) => {
        listOfErrors.push({
          id: id,
          message: message
        })
      })
    })

    return listOfErrors

  } else if(e.response?.data?.message) {
    /**
     * Not yet clearly defined errors
     */
    switch(e.response.data.message) {
      case 'already.confirmed': {
        return [
          {
            id: Math.random(),
            message: 'Your email has already been confirmed'
          }
        ]
      }

      default: {
        return [
          {
            id: Math.random(),
            message: 'There seems to be a problem'
          }
        ]
      }
    }
  } else {
    /**
     * Generic errors
     */
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