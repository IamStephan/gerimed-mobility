import axios from 'axios'

// Error Handling
import { SanitizeErrors } from '../sanitizers'

export async function GetFeaturedProducts() {
  /**
   * Keep in mind that client might end up having less
   * than the prefered items featured.
   * 
   * Therefore if there are less than desired get the latest products based on
   * creation date NOT updated date
   */

  try {
    const serverUrl = `${process.env.PROTOCOL}://${process.env.SERVER}:${process.env.PORT}`
    const data = await axios.get(`${serverUrl}/featured`)
    
    return {
      type: 'success',
      data
    }
  } catch(e) {
    return {
      type: 'error',
      notis: SanitizeErrors(e)
    }
  }
}