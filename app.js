import express from 'express';
import cors from 'cors';

const app = express();
const uuidv4 = require('uuid/v4');
app.use(cors())
app.use(express.json());

// first express is invoked which creates an Express application.
// then the express method use is invoked on the application and the callback function being invoked is cors a middleware package which applies itself to all routes on the application
// then the express method use is invoked again on the application instead the argument is instead an Express built in middleware that will only parse JSON and only handle requests with the header content-type of json in it

app.locals.notes = [];

// Some application level data is created with the property of notes and a value of an empty array. This is added to the locals object on the application or server.


app.get('/api/v1/notes', (request, response) => {
  const notes = app.locals.notes
  return response.status(200).json({ notes })
});
// When the server recieves a request with the verb GET at the end point https://domain.com/api/v1/notes
// it creates a copy of all the notes (not entirely sure why we did that I believe that could be removed)
// then it returns the response with a status code of 200 added with the express status method. 
// Finally it attaches a json.stringify version of all the notes from app.locals with the Content-Type portion of the header filled out application/json or text/json not particularly sure.


app.post('/api/v1/notes', (request, response) => {
  const id = uuidv4();
  const { listItems, title } = request.body
  if(!listItems && !title) return response.status(422).json('Please provide a title or a list item.')
  const newNote = {
    id,
    ...request.body
  }
  app.locals.notes.push(newNote);
  response.status(201).json(newNote);
});

// When the server recieves a POST request from the server with the route /api/v1/notes First an id for the note being added.
// Then listItems and title are destructured from the request body (The note being submitted) with the body method from express.
// If listItems is undefined and title is undefined send a response with a status code for 422 and sends a stringified version of the string 'Please provide a title or a list item'.
// Otherwise create a newNote object with the unique id from line 36  and the listItems and title from the body
// then add that not to the notes array stored in the server.
// Send a response with a status code of 201 and the newNote obj that was created with the id and the info sent to the server.

app.delete('/api/v1/notes/:id', (request, response) => {
  const id = request.params.id;
  const newNotes = app.locals.notes.filter(note => note.id !== id);
  if (newNotes.length !== app.locals.notes.length) {
    app.locals.notes = newNotes
    return response.sendStatus(204);
  } else {
    return response.status(404).json({ error: 'No notes found'})
  }
});

// This function will run whenever the server recieves a DELETE request with the route /api/v1/notes/:id where the id is dynamic.
// First the id is grabbed from the request route with the method params. 
// An array called newNotes is created using the filter array prototype on the notes in the server returning all notes that do not match the id.
// If there are any notes filtered out set the notes stored on the server to the newNotes array,
// then send the client a response with the status code of 204 no body needed as a 204 just tells the client the task was completed.
// If no notes are filted out send a response the the client with a status code of 404 and stringified JSON object with a property of error and a value of 'No noted found'.


app.get('/api/v1/notes/:id', (request, response) => {
  const id = request.params.id;
  const note = app.locals.notes.find(note => note.id === id);
  if (!note) {
    return response.status(404).json({ error: 'No notes found'})
  }
  return response.status(200).json(note);
});

// The function runs whenever the server recieves a GET request with the route of /api/v1/notes/:id.
// The id is grabbed from the route once again with the method params from express.
// Then is creates a variable note and assigns it the value of the specific note object that matches the id  grabbed from the notes stored on the server using the array prototype find.
// If note is not defined the a response back to the client with the status code of 404 and stringified JSON object with a property of error and a value of 'No noted found'.
// Otherwise send a response back to the client with a status of 200 and the stringified note grabbed from the notes stored on the server.

app.put('/api/v1/notes/:id', (request, response) => {
  const { title, listItems } = request.body;
  const id = request.params.id;
  let noteWasFound = false;
  const updatedNotes = app.locals.notes.map(note => {
    if (note.id === id)  {
      noteWasFound = true;
      return { title: title || note.title, listItems: listItems || note.listItems, id: note.id }
    } else {
      return note
    }
  });

  if (!noteWasFound) {
    return response.status(404).json('No note found')
  }

  app.locals.notes = updatedNotes;
  return response.status(202).json('Successfully edited note');
});

// When the server recieves a PUT request at the route /api/v1/notes/:id it tnvokes the callback function that .put takes as a second argument.
// The first argument of the callback is the request object created by express and the second argument is the response object greated by express.
// First listItmes and title and destructured from the body of the request object
// the variable id is then set to the value provided but the parameter id from the route 
// Then a variable is created with let and assigned the value of false.
// next a variable updatedNotes is created by mapping over the notes on the server
// within each iteration of map if the note id matches the id from the route 
// noteWasFound is reassigned to true and the note is replaced for that iteration with the listItems and title grabbed from the body if it exists otherwise keep the current note title and listItem
// otherwise just return the note if the id didn't match
// After all that if noteWasFound is still false then send a response back with the status of 404 and a string of 'No note found'.
// Otherwise reassign the notes kept on the server to the updatedNotes
// return a response back to the client with the status code of 202 and the string of successfully edited note.

export default app;