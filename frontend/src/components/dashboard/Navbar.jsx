import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ProfileImage = styled.img`
border-radius: 50%;
width: 200px;`

function Navbar() {
    const { profile } = useSelector(state => state.profile);
    const navigate = useNavigate();

    return (
    <div>
        <nav>
            <button onClick={()=> navigate('/dashboard')}>Apartments</button>
            <button onClick={()=> navigate('/dashboard-customers')}>Customers</button>
            <button onClick={()=> navigate('/dashboard-map')}>Map</button>
            <button onClick={()=> navigate('/dashboard-users')}>Users</button>
            <button onClick={()=> navigate('/dashboard-deleted-apartments')}>Deleted Apartments</button>
            <button onClick={()=> navigate('/dashboard-add-apatment')}>Add Apartment</button>
            <button onClick={()=> navigate('/dashboard-user-list')}>User List</button>
        </nav>
        <div>
            <p>Hello, {profile.user.name}!</p>
            <ProfileImage src={profile.user.photo}></ProfileImage>
            <p>{profile.user.phoneNum}</p>
        </div>
    </div>
    )
}

export default Navbar
