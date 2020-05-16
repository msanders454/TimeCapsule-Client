let apiCall = 'https://localhost:8000/api/capsule'
let AUTH_TOKEN = 'bd990ba4-228b-11ea-978f-2e728ce88125'

const ApiService = {

    getCapsules() {
        return fetch('https://localhost:8000/api/capsule')
        .then(capsules => {
            return (!capsules.ok)
                ? capsules.json().then(e => Promise.reject(e))
                : capsules.json()
        })
    },

    getCapsulesById(id) {
        return fetch(`http://localhost:8000/api/capsule/${id}`)
            .then(capsule => {
                return (!capsule.ok)
                    ? capsule.json().then(e => Promise.reject(e))
                    : capsule.json()
            })
    },

    deleteCapsules(id) {
        return fetch(`http://localhost:8000/api/capsule/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                return (!res.ok)
                    ? res.then(e => Promise.reject(e))
                    : res
            })
    },

    postCapsules(newCapsule) {
        console.log(newCapsule)
        return fetch('http://localhost:8000/api/capsule', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newCapsule)
        })
            .then(capsule => {
                return (!capsule.ok)
                    ? capsule.json().then(e => Promise.reject(e))
                    : capsule.json()
            })
    },

    patchCapsules(newCapsule, id) {
        console.log(id)
        return fetch(`http://localhost:8000/api/capsule/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newCapsule)
        })
            .then(capsule => {
                return (!capsule.ok)
                    ? capsule.json().then(e => Promise.reject(e))
                    : capsule.json()
            })
    }
    




}

export default ApiService