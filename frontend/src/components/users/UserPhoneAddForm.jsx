import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../features/users/usersSlice';

function UserPhoneAddForm() {
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

        const response = await fetch('api/administration/signupPhoneNumbers', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        });

        if (response.ok) {
            refForm.current.reset();
            dispatch(getAllUsers())
        } else {
            console.log(response)
        }
    }

    return (
    <form onSubmit={handleSubmit} ref={refForm}>
        <label htmlFor="phoneNumber">phoneNumber</label>
        <input type="text" id="phoneNumber" name="phoneNumber" required></input>
        <br></br>
        <button type="submit" style={{"background": "green"}}>Add Phone number</button>
    </form>
    )
}

export default UserPhoneAddForm
