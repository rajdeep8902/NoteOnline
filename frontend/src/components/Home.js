import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import Notes from './Notes';

const Home = (props) => {
  const {showAlert} =props;
  return (
    <div>
      <Notes showAlert={showAlert}/>
    </div>
  )
}

export default Home
