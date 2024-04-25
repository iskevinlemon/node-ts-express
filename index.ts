import * as express from "express";
import * as path from "path";

const app = express();
const port = process.argv[3] || 3000;
const bodyParser = require ("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post("/result", (req, res) => {
  var guess = req.body.guess;
  const randomNumber = Math.floor(Math.random() * 11);

  if(guess == ""){
    res.render("index", {
      errorMessage: "Please enter a number"
    });
  }
  else{
    res.render("result", {
      guess: guess,
      randomNumber: randomNumber
    });
  }

});

// Catch all route
app.get("*", (req, res) => {
  res.redirect("/"); // Send to / route on error
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
