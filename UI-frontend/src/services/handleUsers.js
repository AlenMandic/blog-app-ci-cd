import axios from 'axios'
const baseUrl = 'http://localhost:3000/users'

const getAllUsers = async () => {

    try {
        const response = await axios.get(baseUrl)
        return response.data

    } catch(err) {
        throw err.response?.data?.error || err.message || 'An unknown error occured'
    }
}

const getIndividualUser = async (userId) => {

    try {

       const response = await axios.get(`${baseUrl}/${userId}`)
       return response.data

    } catch(err) {

        if (err.response) {
            if (err.response.status === 404) {
                throw new Error('User not found');
            } else if (err.response.status === 400) {
                throw new Error('Invalid user ID');
            } else {
                throw new Error(`Server error: ${err.response.status}`);
            }
        } else if (err.request) {
            throw new Error('No response received from server');
        } else {
            throw new Error('Error setting up the request');
        }
    }
}

export default { getAllUsers, getIndividualUser }