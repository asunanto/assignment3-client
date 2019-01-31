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

export { fetchActivities, fetchActivity, removeActivity, addActivity }