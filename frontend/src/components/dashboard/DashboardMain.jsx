import Navbar from './Navbar'
import DashboardProfile from './DashboardProfile'

function DashboardMain({children}) {
    return (
        <div className="wrapper">
            <Navbar />
            {children}
            <DashboardProfile />
        </div>
    )
}

export default DashboardMain
