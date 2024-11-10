// MainPage.js

import React, { useState, useEffect } from 'react';
import styles from './mainpage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateGroup from '../CreateGroup/CreateGroup';
import NoteDisplay from '../NoteDisplay/NoteDisplay';

const MainPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [notes, setNotes] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Load groups and notes from localStorage when it is loaded
    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || {};
    setGroups(storedGroups);
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    // Save groups to localStorage
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    // Save notes to localStorage
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  const onCreate = () => {
    setShowPopup(true);
  };

  const closePopup = (e) => {
    if (e.target.id === 'popup-container') {
      setShowPopup(false);
    }
  };

  const handleBackToGroupList = () => {
    setSelectedGroup(null);
  };

  const addGroup = (groupName, color) => {
    const initials = groupName.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase();
    const newGroup = { name: groupName, color, initials, id: Date.now() };
    setGroups([...groups, newGroup]);
    setShowPopup(false);
  };

  const addNote = (groupId, text) => {
    if (text.trim()) {
      const timestamp = formatDate(new Date());
      const newNotes = { ...notes };
      if (!newNotes[groupId]) {
        newNotes[groupId] = [];
      }
      newNotes[groupId].push({ text, timestamp });
      setNotes(newNotes);
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${day} ${month} ${year} • ${hour12}:${formattedMinutes} ${ampm}`;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 425);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (showPopup) {
      document.addEventListener('click', closePopup);
    } else {
      document.removeEventListener('click', closePopup);
    }
    return () => document.removeEventListener('click', closePopup);
  }, [showPopup]);

  return (
    <div className={styles.container}>
      <div className={`${styles.groupList} ${isMobile && selectedGroup ? styles.hidden : ''}`}>
        <div className={styles.heading}>
          <h1>Pocket Notes</h1>
        </div>
        <div className={styles.listContainer}>
          <ul>
            {groups.map((group) => (
              <li key={group.id} className={styles.groupItem} onClick={() => handleGroupClick(group)}>
                <div className={styles.groupIcon} style={{ backgroundColor: group.color }}>
                  {group.initials}
                </div>
                <span>{group.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.btn} onClick={onCreate}>
          <FontAwesomeIcon icon={faPlus} size="2x" />
        </div>
      </div>
  
      <div className={`${styles.noteDisplay} ${isMobile && !selectedGroup ? styles.hidden : styles.show}`}>
        {selectedGroup ? (
          <NoteDisplay
            group={selectedGroup}
            notes={notes[selectedGroup.id] || []}
            addNote={addNote}
            onBack={handleBackToGroupList}
          />
        ) : (
          <div className={styles.imgContainer}>
            <img src="https://s3-alpha-sig.figma.com/img/f2b5/d356/00b6d4748cd536df01bd2b4fecc1d821?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aD2Bf80EeBa6oAql2KO7pwJLIeRmuDeQNMeNT3vU8JH0znwlmvviiOQypMn0Rk~jxEYr6rPmE8-Ecs0csnwvYIHzdi7flaHXfVAYlPgwlpZx3hXIN~np4q3QAZGi6OwnS~K-OYz-gjzXkhB7dYctrO2XDRV0cd5IB4dc0O9e3I3DTb1T-nhlji6HbTpidNbMl3AvfxI7QJ4URKha-Yb78fHI6SahJ8wt0cnf4701KGyW1Ko483RvflRxQKQjr0mq5pee8v9ZPyD~v-Z23gFFlR19uC0T8jmu9GGy4I3krl~zAaXnvhRGgC1DmkgSlPO3LeKDKMO3mNdlOsjd27nLYw__" alt="Pocket Notes" />
            <h1>Pocket Notes</h1>
            <h4>Send and receive messages without keeping your phone online.</h4>
            <h4>Use Pocket Notes on up to 4 linked devices and 1 mobile phone</h4>
            <h6>
              <FontAwesomeIcon icon={faLock} /> end-to-end encrypted
            </h6>
          </div>
        )}
      </div>
  
      {showPopup && (
        <div id="popup-container" className={styles.popupContainer}>
          <CreateGroup addGroup={addGroup} />
        </div>
      )}
    </div>
  );
};

export default MainPage;
