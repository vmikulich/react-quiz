import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-d8dee.firebaseio.com/'
})