import store from '../config/store'
import { setProgramsAction } from '../config/actions'
import { api } from '../api/init'

const fetchUser = () => {
    api.get('/users').then((res) => {
        store.dispatch(setProgramsAction(res.data))
    }).catch((err) => {
        console.error('Could not fetch user', err)
    })
}

export { fetchUser }