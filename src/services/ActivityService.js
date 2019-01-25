import store from '../config/store'
import { setActivitiesAction } from '../config/actions'
import { api } from '../api/init'

const fetchActivities = () => {
    api.get('/activities').then((res) => {
        store.dispatch(setActivitiesAction(res.data))
    }).catch((err) => {
        console.error('Could not fetch activities', err)
    })
}

export { fetchActivities }