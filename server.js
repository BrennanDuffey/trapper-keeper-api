const express = require('express');
const app = express();
const uuidv4 = require('uuid/v4');

app.set('port', process.env.PORT || 3000);
app.locals.notes = [
  { 
    title: 'randomnote', 
    id: '1', 
    listItems: [
      { id: '1', body: 'asdf', completed: false }
    ]
  },
  { 
    title: 'randomnoteTWO', 
    id: '2', 
    listItems: [
      { id: '2', body: 'asdf', completed: false }
    ]
  }
];

app.get('/api/v1/notes', (request, response) => {
  const notes = app.locals.notes
  return response.status(200).json({ notes })
});

app.use(express.json());

app.post('/api/v1/notes', (request, response) => {
  const note = request.body;
  const id = uuidv4();
  note.id = id;
  app.locals.notes.push(note);
  response.status(201).json({ id });
})

app.delete('/api/v1/notes', (request, response) => {
  const id = request.body.id;
  const newNotes = app.locals.notes.filter(note => note.id !== id);
  if (newNotes.length !== app.locals.notes.length) {
    app.locals.notes = newNotes
    response.status(202).json('Successfully deleted note');
  } else {
    return response.status(404).json({ error: 'No notes found'})
  }
})

app.get('/api/v1/notes/:id', (request, response) => {
  const id = request.params.id;
  const note = app.locals.notes.find(note => note.id === id);
  if (!note) {
    return response.status(404).json({ error: 'No notes found'})
  }
  return response.status(200).json(note);
})

app.put('/api/v1/notes/:id', (request, response) => {
  const newNote = request.body;
  const id = request.params.id;
  const updatedNotes = app.locals.notes.filter(note => note.id !== id);
  if (updatedNotes.length !== app.locals.notes.length) {
    app.locals.notes = [ ...updatedNotes, newNote ];
    return response.status(202).json('Successfully edited note');
  } else {
    return response.status(404).json({ error: 'No notes found to edit'})
  }
})

app.listen(app.get('port'), () => {
  console.log('Something running in 3000');
})
