import { useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getAllCustomers } from '../../features/customers/customersSlice';

function CustomersAddForm() {
    const [data, setData] = useState(false);
    const refForm = useRef(null);
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = Object.fromEntries([...new FormData(refForm.current).entries()]);
        console.log(data)

        // axios.post('/api/customers', data)
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

        const response = await fetch('api/customers', {
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
            dispatch(getAllCustomers())
        } else {

            console.log(response)
        }
    }

    return (
    <form onSubmit={handleSubmit} ref={refForm}>
        <label htmlFor="name">Name</label>
        <input type="text" id='name' name="name" required></input>
        <br></br>
        <label htmlFor="phoneNumber">phoneNumber</label>
        <input type="text" id="phoneNumber" name="phoneNumber" required></input>
        <br></br>
        <label htmlFor="note">Note</label>
        <input type="text" id="note" name="note" required></input>
        <br></br>
        <button type="submit" style={{"background": "green"}}>Add note</button>
    </form>
    )
}

export default CustomersAddForm
