import app from './app';

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log(`Something is running on http://localhost:${app.get('port')}`);
})
