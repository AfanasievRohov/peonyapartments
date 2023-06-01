import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavbarListComponent from './NavbarListComponent';
import { changeMenu } from '../../features/dashboard-menu/dashboardMenuSlice';

function Navbar() {
    const { profile } = useSelector(state => state.profile);
    const { menu, activeMenu } = useSelector(state => state.menu);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const menuHandler = (e, path, menuName) => {
        e.preventDefault();
        dispatch(changeMenu(menuName))
        navigate(path);
    }

    return (
            <aside className="sidebar">
                <div className="sidebar__container">
                    <div className="sidebar__logo logo">
                        <img src="./images/logo.png" alt="" />
                    </div>
                    <div className="sidebar__line"></div>
                    <ul className="sidebar__menu">
                        {menu.map((elem, index) => <NavbarListComponent key={index} activeMenu={activeMenu} menuHandler={menuHandler} {...elem} />)}
                    </ul>
                    <div className="sidebar__user-block ">
                    <div className="user-name">Hello, {profile.user.name}</div>
                    <div className="user-photo">
                        <img src={profile.user.photo} alt=""></img>
                    </div>
                    <div className="user-phone">{profile.user.phoneNum}</div>
                    </div>
                </div>
            </aside>

    )

}

export default Navbar
