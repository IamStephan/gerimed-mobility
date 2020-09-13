/**
 * Return an image url based on the
 * prefered image size
 * 
 * When the prefered format does not exist then
 * use the base url
 * 
 * Strapi does not generate image formats of a particular
 * size if the image is to small
 */
function strapiImageUrl(prefered, baseUrl, url, formats = {}) {
  let urlToUse = url

  for(const [key, value] of Object.entries(formats)) {
    if(key === prefered) {
      urlToUse = value.url
    }
  }

  return `${baseUrl}${urlToUse}`
}

export {
  strapiImageUrl
}