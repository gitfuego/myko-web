import styles from './DropDown.module.scss';
import { useEffect, useRef, useState } from 'react';

const DropdownMenu = ({ user, artist, children, userArtistIDs, setUserArtistIDs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [joined, setJoined] = useState(userArtistIDs.includes(artist));

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  let menuRef = useRef(null);

  useEffect(() => {
    function handler(e) {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  })

  function joinClub() {
    fetch('/api/followArtist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID: user.user_id, artistID: artist })
    })
    .then((response) => {
      setUserArtistIDs((prev) => [...prev, artist]);
      setJoined(true);
    })
    .catch(() => {
      console.log('error joining club')
    });
    setIsOpen(false);
  }

  function leaveClub() {
    fetch('/api/unfollowArtist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID: user.user_id, artistID: artist })
    })
    .then((response) => {
      setUserArtistIDs((prev) => [...prev].filter((el) => el != artist));
      setJoined(false);
    })
    .catch(() => {
      console.log('error leaving club')
    });
    setIsOpen(false);
  }

  return (
    <div className={styles.dropdown}>
      <button className={styles.menuButton} onClick={toggleDropdown}>
        {children}
      </button>
        <div ref={menuRef} className={isOpen ? styles.dropdownContent : styles.dropdownContentHidden}>
          {joined ? <button type="button" onClick={leaveClub}>Leave Club</button>
          : <button type="button" onClick={joinClub}>Join Club</button>}
        </div>
    </div>
  );
};

export default DropdownMenu;