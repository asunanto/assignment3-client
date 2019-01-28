import React from 'react'

export default function Activities(props) {
    const activities = props.activities

    return (
        <div>
            <h1>Activities</h1>
            <ul>
                {activities.map(activity => (
                    <li>
                        <p>Activity Title: {activity.title}</p>
                        <p>Description: {activity.description}</p>
                        <p>Age Level: {activity.ageLevel.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}