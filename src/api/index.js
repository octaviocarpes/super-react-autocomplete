const BASE_URL = 'https://swapi.dev/api'

export const fetchPeople = (name) => fetch(`${BASE_URL}/people?search=${name}`, { method: 'GET' }).then(result => result)
