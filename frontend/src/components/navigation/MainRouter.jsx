import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../../App';
import Login from '../authorization/Login';
import SignUpTest from '../authorization/SignUpTest';


function MainRouter() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUpTest />} />
            </Routes>
        </Router>
    )
}

export default MainRouter
