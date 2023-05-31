import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const refForm = useRef(null);
    const navigate = useNavigate()

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
            navigate('/')
        } else {
            console.log(response)
        }
    }

return (
    <div>
        <button onClick={() => navigate('/main')}>Back to main page</button>
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
