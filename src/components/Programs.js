import React from 'react'

export default function Programs(props) {
    const programs = props.programs

    return (
        <div>
            <h1>Programs</h1>
            <ul>
                {programs.map(program => (
                    <li>
                        <p>{program.name}</p>
                        <p>{program.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}