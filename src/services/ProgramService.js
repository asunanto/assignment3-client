import store from '../config/store'
import { setProgramsAction } from '../config/actions'
import { api } from '../api/init'

const fetchPrograms = () => {
    api.get('/programs').then((res) => {
        store.dispatch(setProgramsAction(res.data))
    }).catch((err) => {
        console.error('Could not fetch programs', err)
    })
}

export { fetchPrograms }