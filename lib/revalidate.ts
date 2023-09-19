import axios from 'axios';

export async function revalidate(tag: string) {
  axios.post(`https://hlinoteka.cz/api/revalidate?tag=${tag}&secret=b6zJ7huYMLM`)
}
