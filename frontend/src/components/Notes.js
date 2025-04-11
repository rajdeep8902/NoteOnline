import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, setnotes } = context;
    return (
        <div className="row my-3">
            <h1>Your Notes</h1>
            {notes.map((note) => {
                return <Noteitem note={note}/>;
            })}
        </div>
    )
}

export default Notes
