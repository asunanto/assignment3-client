import React from 'react'

export default function Activities(props) {
    const { _id, title, description } = props
    return (
        <div>
            <p>{title}</p>
            <p>{description}</p>
        </div>
    )
}