import React from 'react';
import { useRef } from 'react';

function Login() {
    const cookies = document.cookie;
  
    console.log(document)
    console.log(cookies)
    const refForm = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = Object.fromEntries([...new FormData(refForm.current).entries()]);
        console.log(data)
        const response = await fetch('/api/users/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include",
            method: "POST",
            body: JSON.stringify(data)
        });

        if (response.ok) {
            refForm.current.reset();
            location.reload()
        } else {
            console.log(response)
        }
    }

  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit} ref={refForm}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" required></input>
        <br></br>
        <label htmlFor="password">password</label>
        <input type="password" id="password" name="password" required></input>
        <br></br>
        <button type="submit" style={{"background": "red"}}>Submit</button>
    </form>
    </div>
)
}

export default Login
