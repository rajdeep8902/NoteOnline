import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setnotes] = useState(notesInitial)

    //Get all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdjZDQ0NjA0NGNiMTE2OTIxYTIzYmU1In0sImlhdCI6MTc0MTUwNTYzMn0.t9vOUAgib2SAreTa7jgGHS01w1TGLq7Bme0aHmX6mbc"
            }
        });
        const json = await response.json();
        setnotes(json);
    }

    //Add a note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdjZDQ0NjA0NGNiMTE2OTIxYTIzYmU1In0sImlhdCI6MTc0MTUwNTYzMn0.t9vOUAgib2SAreTa7jgGHS01w1TGLq7Bme0aHmX6mbc"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setnotes(notes.concat(note))
    }

    //Delete a note
    const deleteNote = async (id) => {
        console.log("del the note with id" + id)
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdjZDQ0NjA0NGNiMTE2OTIxYTIzYmU1In0sImlhdCI6MTc0MTUwNTYzMn0.t9vOUAgib2SAreTa7jgGHS01w1TGLq7Bme0aHmX6mbc"
            },
        });
        const json = await response.json();
        console.log(json);
        const newnotes = notes.filter((note) => { return note._id !== id })
        setnotes(newnotes);
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdjZDQ0NjA0NGNiMTE2OTIxYTIzYmU1In0sImlhdCI6MTc0MTUwNTYzMn0.t9vOUAgib2SAreTa7jgGHS01w1TGLq7Bme0aHmX6mbc"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json)

        //Logic to edit in client
        const updatedNotes = notes.map(note => {
            if (note._id === id) {
                return { ...note, title, description, tag };
            }
            return note;
        });
        setnotes(updatedNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;