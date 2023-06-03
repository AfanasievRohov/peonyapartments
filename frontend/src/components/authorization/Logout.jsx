import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {logout} from '../../features/profile/profileSlice'

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async(event) => {
        event.preventDefault();

        const response = await fetch('/api/users/logout', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST"
        });

        if (response.ok) {
            dispatch(logout());

            navigate('/')
        } else {
            console.log(response)
        }
    }

    return (
        <div>
            <button onClick={handleLogout} style={{"background": "red"}} >Logout</button>
        </div>
    )
}

export default Logout
