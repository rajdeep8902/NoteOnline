import React, { useEffect } from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, setnotes, getNotes } = context;
    useEffect(() => {
        getNotes()
    }, []);

    return (
        <>
            <AddNote />
            <div className="row my-3">
                <h1>Your Notes</h1>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes
