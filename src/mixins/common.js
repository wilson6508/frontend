import axios from "axios";
// axios.defaults.baseURL = "http://localhost:3000/";
// axios.defaults.timeout = 1200000

export default {
    methods: {
        postApi(url, params) {
            return new Promise((resolve, reject) => {
                axios.post(url, params)
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
    }
}