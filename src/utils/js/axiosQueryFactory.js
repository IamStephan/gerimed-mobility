import axios from 'axios'

/**
 * NOTE:
 * =====
 * Some queries require authentication but,
 * again strapi sends and status code 200,
 * and a list of errors. Just check the errors
 * 
 * this is basically an exact copy of the mutation
 * but im splitting them incase i need to make changes
 */ 

function axiosQueryFactory(url, data, options = {}) {
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
        resolve({ data })
      }
    }).catch((err) => {
      reject(err)
    })
  })
}

export {
  axiosQueryFactory
}