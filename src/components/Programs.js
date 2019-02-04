import React from 'react'

export default function Programs(props) {
    const programs = props.programs

    return (
        <div>
            <h1>Programs</h1>
            <ul>
                {programs.map(program => (
                    <li key={program._id}>
                        <p>{program.name}</p>
                        <p>{program.description}</p>
                        <a href={`/programs/${program._id}`}><button>View</button></a>
                        <a href={`/programs/${program._id}/editprogram`}><button>Edit</button></a>
                    </li>
                ))}
            </ul>
        </div>
    )
}