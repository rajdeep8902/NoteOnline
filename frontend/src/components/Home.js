import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import Notes from './Notes';

const Home = () => {
  return (
    <div>
      <Notes/>
    </div>
  )
}

export default Home
