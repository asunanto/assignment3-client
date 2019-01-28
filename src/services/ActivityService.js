import store from '../config/store'
import { setActivitiesAction, setActivityAction } from '../config/actions'
import { api } from '../api/init'

const fetchActivities = () => {
    api.get('/activities').then((res) => {
        store.dispatch(setActivitiesAction(res.data))
    }).catch((err) => {
        console.error('Could not fetch activities', err)
    })
   
}

const fetchActivity = (id) => {
    api.get(`/activities/${id}`).then((res) => {
        store.dispatch(setActivityAction(res.data))
    }).catch((err) => {
        console.error('Could not fetch activities', err)
    })
    
}

export { fetchActivities, fetchActivity }