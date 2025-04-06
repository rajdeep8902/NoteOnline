const express = require('express');
const router = express.Router()
var fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')

//ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login req
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors);
        }
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})
//ROUTE 2: Add a new note using: POST "/api/notes/addnote". Login req
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be 5 char').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors);
        }
        const note = new Notes({
            user: req.user.id, title, description, tag
        })
        const savedNote = await note.save();
        res.send(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

//ROUTE 3: Update a note using: POST "/api/notes/addnote". Login req

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) newNote.title = title;
    if (title) newNote.description = description;
    if (title) newNote.tag = tag;

    var note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send('Not found');
    }
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.send(note);
})

module.exports = router