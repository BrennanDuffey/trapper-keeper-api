const express = require('express');
const app = express();
const uuidv4 = require('uuid/v4');

app.set('port', process.env.PORT || 3000);
app.locals.notes = [
  { 
    title: 'randomnote', 
    id: "7b36eed8-16c6-4342-91c2-3d238e47abba", 
    listItems: [
      { id: 1, body: 'asdf', completed: false }
    ]
  },
  { 
    title: 'randomnoteTWO', 
    id: "7b36eed8-16c6-4342-91c2-3d238e47abbb", 
    listItems: [
      { id: 2, body: 'asdf', completed: false }
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



app.listen(app.get('port'), () => {
  console.log('something running in 3000');
})
