//Functions to verfy login and add new users to users database


const AuthApiService = {
    postLogin({ user_name, password }) {
        return fetch(`https://damp-refuge-24075.herokuapp.com/api/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ user_name, password }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },

    postUser(user) {
        return fetch(`https://damp-refuge-24075.herokuapp.com/api/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
                )
    }
};

export default AuthApiService;