import { useDispatch } from 'react-redux'
import { changePage } from '../../features/pages/pagesSlice';

function MainPage() {
    const dispatch = useDispatch();

    return (
        <div>
            <h1>Peony apartments</h1>
            <img src='https://c8.alamy.com/comp/2BNC3D1/map-of-the-central-part-of-the-uzhgorod-town-2BNC3D1.jpg' style={{width: "500px"}}></img>
            <div>
                <button onClick={() => dispatch(changePage("login"))}>Login</button>
                <button onClick={() => dispatch(changePage("signup"))}>Signup</button>
            </div>
        </div>
    )
}

export default MainPage
