/* 
    This ProgramList component is a grid list of all program items shown as ProgramCards.
*/

import React from 'react'
import Program from './Program'

// Should be renamed to ProgramList for clarity
function Programs(props) {
    const programs = props.programs
    return (
        <div>
            <h1>Programs List</h1>
            <ul>
            {/* For each program in the programs array, pass key info to ProgramCard and display all programs as list items*/}
                {programs.map(program => (
                    <li>
                        {/* Display a program item as a ProgramCard instance */}
                        <Program key={program._id} program={program}></Program>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Programs