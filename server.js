const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.locals.notes = [
  {note: 'randomnote'}
];

app.get('/api/v1/notes', (request, response) => {
  const notes = app.locals.notes
  return response.status(200).json({ notes })
});

app.use(express.json());

app.post('/api/v1/notes', (request, reesponse) => {
  
})

app.listen(app.get('port'), () => {
  console.log('something running in 3000');
})
