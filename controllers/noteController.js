'use strict';

const firebase = require('../db')
const Note = require('../models/note')
const firestore = firebase.firestore();

const addNote = async (req, res, next) => {
    try {
        const newNote = req.body;
        const { id } = await firestore.collection('notes').add(newNote);
        newNote.id = id;
        res.send(newNote);
    } catch (error){
        res.status(400).send(error.message)
    }
}

const getAllNotes = async (req, res, next) => {
    try {
        const notes = await firestore.collection('notes');
        const data = await notes.get();
        const notesArray = [];
        if(data.empty)
            res.status(404).send('No notes record found')
        else{
            data.forEach(doc => {
                const note = new Note(
                    doc.id,
                    doc.data().title,
                    doc.data().description
                );
                notesArray.push(note);
            });
            res.send(notesArray);
        }
    } catch (error){
        console.log(error)
        res.status(400).send(error.message)
    }
}

const getNote = async (req, res, next) => {
    try {
        const id = req.params.id;
        const note = await firestore.collection('notes').doc(id);
        const data = await note.get();
        if(!data.exists)
            res.status(404).send('Note with the given ID not found');
        else
        res.send(data.data());
    }catch (error){
        console.log(error)
        res.status(400).send(error.message)
    }
}

const updateNote = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const note = await firestore.collection('notes').doc(id);
        await note.update(data);
        res.send('Note updated successfuly');
    }catch (error){
        console.log(error)
        res.status(400).send(error.message)
    }
}

const deleteNote = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('notes').doc(id).delete();
        res.send('Note deleted successfuly');
    }catch (error){
        console.log(error)
        res.status(400).send(error.message)
    }
}

module.exports = {
    addNote,
    getAllNotes,
    getNote,
    updateNote,
    deleteNote
}