import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../../../assets/images";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/Slices/AuthSlice";

const SideBar = () => {
  const sidebarMenu = [
    { name: "Dashboard", icon: "fa-solid fa-gauge", link: "/" },
    { name: "User", icon: "fa-solid fa-user-tie", link: "/user-list" },
    { name: "Worker", icon: "fa fa-wrench", link: "/worker" },
    { name: "Category", icon: "fa-solid fa-layer-group", link: "/category" },
    { name: "Services", icon: "fa fa-address-book", link: "/services" },
    { name: "Quotations", icon: "fa fa-file-text", link: "/quotation" },
    { name: "Completed Services", icon: "fa fa-list-alt", link: "/completed-service" },
    {
      name: "Settings",
      icon: "fa-solid fa-gear",
      link: "",
      submenus: [{ name: "Profile", link: "/my-profile" }],
    },
    { name: "Logout", icon: "fa-solid fa-right-to-bracket", link: "/login" },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const activePath = location.pathname;

  const activeSubMenuIndex = sidebarMenu.findIndex((menu) =>
    menu.submenus?.some((subMenu) => subMenu.link === activePath)
  );

  const [expandSubMenus, setExpandSubMenus] = useState(activeSubMenuIndex);

  useEffect(() => {
    setExpandSubMenus(activeSubMenuIndex);
  }, [activePath, activeSubMenuIndex]);

  const handleToggle = (idx, pathname) => {
    if (sidebarMenu[idx].name === "Logout") {
      dispatch(logout());
      navigate(pathname);
    } else {
      setExpandSubMenus((prevExpanded) => (prevExpanded === idx ? null : idx));
      if (!sidebarMenu[idx].submenus) {
        navigate(pathname);
      }
    }
  };

  const addClass = () => {
    document.body.classList.toggle("open-sidebar");
  };

  return (
    <aside className="sidenav">
      <div className="sidebar-top">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="navmenu-sidbar">
          <div className="navbar-icon" onClick={addClass}>
            <span></span>
          </div>
        </div>
      </div>
      <div className="navbar-inner">
        <ul>
          {sidebarMenu.map((menu, idx) => (
            <li
              key={idx}
              className={`menu-item ${idx === expandSubMenus ? "menu-accordion" : ""}`}
            >
              <a
                onClick={() => handleToggle(idx, menu.link)}
                className={`menu-link ${!menu.submenus && activePath === menu.link ? "active" : ""}`}
              >
                <span className="menu-icon">
                  <i className={menu.icon} aria-hidden="true"></i>
                </span>
                <span className="menu-title">{menu.name}</span>
                {menu.submenus && <span className="menu-arrow"></span>}
              </a>
              {menu.submenus && (
                <div
                  className={`menu-sub menu-sub-accordion ${idx === expandSubMenus ? "menu-active-bg" : ""}`}
                >
                  {menu.submenus.map((subMenu, subIdx) => (
                    <div key={subIdx} className="menu-item">
                      <Link
                        className={`menu-link ${activePath === subMenu.link ? "active" : ""}`}
                        to={subMenu.link}
                      >
                        <span className="menu-bullet">
                          <span className="bullet bullet-dot"></span>
                        </span>
                        <span className="menu-title">{subMenu.name}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
