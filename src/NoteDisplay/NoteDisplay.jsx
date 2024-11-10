import React, { useState } from 'react';
import styles from './notedisplay.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const NoteDisplay = ({ group, notes, addNote, onBack }) => {
  const [text, setText] = useState("");

  const handleTextChange = (e) => setText(e.target.value);

  const addNewNote = () => {
    if (text.trim()) {
      addNote(group.id, text);
      setText("");
    }
  };

  return (
    <div className={styles.noteContainer}>
      <div className={styles.groupHeader}>
        {/* Left arrow button to go back */}
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={styles.backArrow}
          onClick={onBack}
        />
        <div className={styles.groupIcon} style={{ backgroundColor: group.color }}>
          {group.initials}
        </div>
        <h2 className={styles.groupName}>{group.name}</h2>
      </div>

      <div className={styles.noteList}>
        {notes.map((note, index) => (
          <div key={index} className={styles.noteItem}>
            {note.text}
            <div className={styles.timestamp}>{note.timestamp}</div>
          </div>
        ))}
      </div>

      <div className={styles.notes}>
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Here's the sample text for sample work"
          className={styles.textbox}
        ></textarea>
        <FontAwesomeIcon
          icon={faPaperPlane}
          className={styles.icon}
          onClick={addNewNote}
        />
      </div>
    </div>
  );
};

export default NoteDisplay;
