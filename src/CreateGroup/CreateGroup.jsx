import React, {useState} from 'react';
import styles from './creategroup.module.css';

const CreateGroup = ({ addGroup }) => {
    const [groupName, setGroupName] = useState('');
    const [selectedColor, setSelectedColor] = useState();

    // to handle input change
    const handleInputChange = (e) => {
        setGroupName(e.target.value);
      };

    // to handle group when click button is clicked
    const handleCreateClick = () => {
        if (groupName.trim() && selectedColor) {
          addGroup(groupName,selectedColor); 
          setGroupName('');
          setSelectedColor('');
        }
      };
  
  // button enabled
  const isButtonDisabled = !groupName.trim() || !selectedColor;
  
  return (
    <div className={styles.popup}>
      <h2>Create New Group</h2>
    
      <div className={styles.groupDetail}>
        <h3>Group Name</h3>
        <input type="text" placeholder="Enter group name" className={styles.input} onChange={handleInputChange} value={groupName}/>
      </div>
      
      <div className={styles.colorSelection}>
       <h3>Choose Colour</h3>
        <div className={styles.colorOptions}>
            {['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'].map(color => (
              <div
                key={color}
                className={`${styles.color} ${selectedColor === color ? styles.selected : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                
              />
            ))}
        </div>
      </div>
      
      
      <button className={styles.createButton} onClick={handleCreateClick} disabled={isButtonDisabled}>Create</button>
    </div>
  );
};

export default CreateGroup;

