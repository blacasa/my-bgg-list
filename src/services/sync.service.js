
import axios from 'axios'

export default {
    sync(bggAccount) {
        return axios
            .get('https://bgg-json.azurewebsites.net/collection/'+bggAccount)
            .then(response => (response.data));
    }
}