import { useNavigate } from 'react-router-dom';

function MainPage() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Peony apartments</h1>
            <img src='https://c8.alamy.com/comp/2BNC3D1/map-of-the-central-part-of-the-uzhgorod-town-2BNC3D1.jpg' style={{width: "500px"}}></img>
            <div>
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/signup")}>Signup</button>
            </div>
        </div>
    )
}

export default MainPage
