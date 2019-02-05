/* 
    This ActivityList component is a grid list of all activity items shown as ActivityCards.
*/

import React from 'react'
import Activity from './Activity.js'
import PropTypes from 'prop-types'

// Should be renamed to ActivityList for clarity
function Activities(props) {
    const activities = props.activities

    return (
        <div>
            <h1>Activities List</h1>
            <ul>
            {/* For each activity in the activities array, pass key info to the ActivityCard and display all cards as list items */}
                {activities.map(activity => (
                    <li key={activity._id} >
                        {/* Display an activity item as an ActivityCard instance */}
                        <Activity activity={activity}></Activity>
                    </li>
                ))}
            </ul>
        </div>
    )
}
Activities.propTypes = {
    activities: PropTypes.array
}

export default Activities