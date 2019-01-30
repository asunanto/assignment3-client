import store from '../config/store'
import { setProgramsAction, setProgramAction } from '../config/actions'
import { api } from '../api/init'

const fetchPrograms = () => {
    api.get('/programs').then((res) => {
        store.dispatch(setProgramsAction(res.data))
    }).catch((err) => {
        console.error('Could not fetch programs', err)
    })
}

const fetchProgram = (id) => {
    api.get(`/programs/${id}`).then((res) => {
        store.dispatch(setProgramAction(res.data))
    }).catch((err) => {
        console.error('Could not fetch program', err)
    })

}

export { fetchPrograms, fetchProgram }