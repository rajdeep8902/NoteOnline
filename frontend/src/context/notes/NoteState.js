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
        console.log(json);
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
        const json = response.json();
        const note = {
            "_id": "67f92df96402e807b737cb46",
            "user": "67cd446044cb116921a23be5",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2025-04-11T14:58:01.545Z",
            "__v": 0
        }
        setnotes(notes.concat(note))
    }

    //Delete a note
    const deleteNote = (id) => {
        console.log("del the note with id" + id)
        const newnotes = notes.filter((note) => { return note._id !== id })
        setnotes(newnotes);
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdjZDQ0NjA0NGNiMTE2OTIxYTIzYmU1In0sImlhdCI6MTc0MTUwNTYzMn0.t9vOUAgib2SAreTa7jgGHS01w1TGLq7Bme0aHmX6mbc"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();

        //Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }

    return (
        <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote,getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;