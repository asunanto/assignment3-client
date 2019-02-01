import React from 'react'
import { removeActivity } from '../services/ActivityService'

function Activities(props) {
    const activities = props.activities
    return (
        <div>
            <h1>Activities</h1>
            <ul>
                {activities.map(activity => (
                    <li key={activity._id}>
                        <p>Activity Title: {activity.title}</p>
                        <p>Description: {activity.description}</p>
                        <p>Age Level: {activity.ageLevel.name}</p>
                        <a href={`/activities/${activity._id}`}><button>View</button></a>
                        <a href={`/activities/${activity._id}/edit`}><button>Edit</button></a>
                        <button onClick={() => removeActivity(activity._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Activities