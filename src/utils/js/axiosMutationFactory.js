import axios from 'axios'

/**
 * NOTE:
 * =====
 * Mutations with strapi are extreamly weird
 * on errors the response code is 200 which
 * makes no sense. The problem with this is
 * that xstate does not properly pick up these
 * errors, therefore i have to fabricate some
 * form of pseudo type request that is
 * specifically made to deal with this 
 */ 

function axiosMutationFactory(url, data, options = {}, carryData = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, options).then(({ data }) => {
      if(data.errors) {
        reject({
          ...data,
          // So i know i should do a deep dive for error messages
          strapiErrors: true
        })
      } else {
        // You know, just to keep with the consistency of idiocy 👍
        resolve({ data, carryData })
      }
    }).catch((err) => {
      reject(err)
    })
  })
}

export {
  axiosMutationFactory
}