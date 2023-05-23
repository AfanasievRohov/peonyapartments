import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { changePage } from '../../features/pages/pagesSlice';

function SignUpTest() {
    const dispatch = useDispatch();
    const [data, setData] = useState(false);
    const refForm = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = Object.fromEntries([...new FormData(refForm.current).entries()]);
        console.log(data)
        const response = await fetch('/api/users/signup', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            setData(true);
            refForm.current.reset();
            location.reload()
        } else {

            console.log(response)
        }
    }

    return (
    <div>
    <button onClick={() => dispatch(changePage("main"))}>Back to main page</button>
    {data && <p>success</p>}
        <form onSubmit={handleSubmit} ref={refForm}>
            <label htmlFor="name">Name</label>
            <input type="text" id='name' name="name" required></input>
            <br></br>
            <label htmlFor="phoneNum">phoneNum</label>
            <input type="text" id="phoneNum" name="phoneNum" required></input>
            <br></br>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" required></input>
            <br></br>
            <label htmlFor="password">password</label>
            <input type="password" id="password" name="password" required></input>
            <br></br>
            <label htmlFor="passwordConfirm">passwordConfirm</label>
            <input type="password"id="passwordConfirm" name="passwordConfirm" required></input>
            <br></br>
            <button type="submit" style={{"background": "red"}}>Submit</button>
        </form>
    </div>
  )
}

export default SignUpTest
