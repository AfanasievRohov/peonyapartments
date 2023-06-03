function NavbarListComponent({menuName, img, menuPath, activeMenu, menuHandler}) {
    return (
        <li className={`sidebar__menu-item ${activeMenu === menuName ? 'active' : ''}`} onClick={(e) => menuHandler(e, menuPath, menuName)}>
            <div className="sidebar__menu-icon">
                <img
                    src={`./images/${img}`}
                    className="sidebar__menu-icon-svg"
                    alt=""
                />
            </div>
            <div className="sidebar__menu-item-title">
                <a href="#" onClick={(e) => e.preventDefault()}>{menuName}</a>
            </div>
        </li>
    )
}

export default NavbarListComponent
