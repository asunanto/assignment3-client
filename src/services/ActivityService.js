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

const addActivity = (activity) => {
    api.post('/activities', {
        title: activity.title,
        description: activity.description,
        length: activity.length,
        ageLevel: activity.ageLevel
    }).then((res)=>{
        const newActivities = [...store.getState().activities,res.data]
        store.dispatch(setActivitiesAction(newActivities))
    }).catch((err) => {
        console.error('Could not add activities', err)
    })
}

const updateActivity = (activity) => {
    const {title, description, len, ageLevel, id} = activity
    const index = store.getState().activities.findIndex(activity => activity._id === id)
    api.put(`/activities/${id}`, {
        title,
        description,
        length: len,
        ageLevel
    }).then((res)=>{
        if (index >= 0) {
            const newActivities = [...store.getState().activities]
            newActivities[index] = res.data
            store.dispatch(setActivitiesAction(newActivities))
        }
    }).catch((err) => {
        console.error('Could not update activities', err)
    })
}

const removeActivity = (id) => {
    api.delete(`/activities/${id}`)
    const index = store.getState().activities.findIndex(activity => activity._id === id)
    if (index >= 0) {
      const newActivities = [...store.getState().activities]
      newActivities.splice(index, 1)
      store.dispatch(setActivitiesAction(newActivities))
    }
  
  }

export { fetchActivities, fetchActivity, removeActivity, addActivity, updateActivity }