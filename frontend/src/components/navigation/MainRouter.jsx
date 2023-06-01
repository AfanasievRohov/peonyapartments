import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App';
import Login from '../authorization/Login';
import SignUpTest from '../authorization/SignUpTest';
import Authentication from '../authentication/Authentication';
import DashboardMain from '../dashboard/DashboardMain';
import ApartmentsGrid from '../apartments/ApartmentsGrid';
import Customers from '../customers/Customers';

function MainRouter() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUpTest />} />
                <Route path='/dashboard' element={
                <Authentication>
                    <DashboardMain>
                        <ApartmentsGrid />
                    </DashboardMain>
                </Authentication>
                } />
                <Route path='/dashboard-customers' element={
                <Authentication>
                    <DashboardMain>
                        <Customers />
                    </DashboardMain>
                </Authentication>
                } />
                <Route path='/dashboard-map' element={
                <Authentication>
                    <DashboardMain>
                        <p>Map</p>
                    </DashboardMain>
                </Authentication>
                } />
                <Route path='/dashboard-users' element={
                <Authentication>
                    <DashboardMain>
                        <p>Users</p>
                    </DashboardMain>
                </Authentication>
                } />
                <Route path='/dashboard-deleted-apartments' element={
                <Authentication>
                    <DashboardMain>
                        <p>deleted-apartments</p>
                    </DashboardMain>
                </Authentication>
                } />
                <Route path='/dashboard-add-apatment' element={
                <Authentication>
                    <DashboardMain>
                        <p>add-apatment</p>
                    </DashboardMain>
                </Authentication>
                } />
                <Route path='/dashboard-user-list' element={
                <Authentication>
                    <DashboardMain>
                        <p>user-list</p>
                    </DashboardMain>
                </Authentication>
                } />
            </Routes>
        </Router>
    )
}

export default MainRouter
