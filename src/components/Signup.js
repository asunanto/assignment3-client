import React from 'react'

export default ({ handleSignup, signupError }) => (
    <form onSubmit={handleSignup}>
        {signupError && <p>{signupError}</p>}
        <label>Email: <input type="email" name="email" /></label><br />
        <label>Password: <input type="password" name="password" /></label><br />
        <button type="submit">Sign Up</button>
    </form>
)