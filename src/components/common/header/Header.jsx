import React, { useEffect, useRef, useState } from 'react'
import NotifyList from './NotifyList';

function Header() {
  const [showProfile, setShowProfile] = useState(false)
  const [showNotify, setShowNotify] = useState(false)
  const handleNotificationClick = () => {
    setShowNotify(prev => !prev)
  }

  const addClass = () => {
    document.body.classList.toggle("open-sidebar")
  }
  const NotifyRef = useRef()
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (NotifyRef.current && !NotifyRef.current.contains(event.target)) {
        setShowNotify(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <>
      <header className='header'>
        <div className="main-header">
          <div className='lft-hdr'>
            <div className="navmenu-hdr">
              <div class="navbar-icon" onClick={addClass}>
                <span></span>
              </div>
            </div>
          </div>
          <div className='rght-hdr'>
            <div className='hdrmr-main'>
              <div ref={NotifyRef} className="notification-main">
                <div className="notification-icon" onClick={handleNotificationClick}>
                  <span><i class="fa-solid fa-bell"></i></span>
                </div>
                {showNotify && <NotifyList />}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header