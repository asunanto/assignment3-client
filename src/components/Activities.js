import React from 'react'
// import { fetchActivity } from '../services/ActivityService';
// import {withRouter} from 'react-router-dom'

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
                        {/* <button onClick={() => {
                            fetchActivity(activity._id);
                             props.history.push(`/activities/${activity._id}`);
                             }}>View</button> */}
                        <a href={`/activities/${activity._id}`}><button>View</button></a>
                        <a href={`/activities/${activity._id}/edit`}><button>Edit</button></a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Activities