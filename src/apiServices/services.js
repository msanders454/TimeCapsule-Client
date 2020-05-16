//Functions used to access Time-capsule Api

const ApiService = {

    getCapsules() {
        return fetch('https://damp-refuge-24075.herokuapp.com/api/capsule')
        .then(capsules => {
            return (!capsules.ok)
                ? capsules.json().then(e => Promise.reject(e))
                : capsules.json()
        })
    },

    getCapsulesById(id) {
        return fetch(`https://damp-refuge-24075.herokuapp.com/api/capsule/${id}`)
            .then(capsule => {
                return (!capsule.ok)
                    ? capsule.json().then(e => Promise.reject(e))
                    : capsule.json()
            })
    },

    deleteCapsules(id) {
        return fetch(`https://damp-refuge-24075.herokuapp.com/api/capsule/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                return (!res.ok)
                    ? res.then(e => Promise.reject(e))
                    : res
            })
    },

    postCapsules(newCapsule) {
        return fetch('https://damp-refuge-24075.herokuapp.com/api/capsule', {
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
        return fetch(`https://damp-refuge-24075.herokuapp.com/api/capsule/${id}`, {
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