const { Router } = require("express");
const router = Router();
const fs = require("fs");

//leemos el archivo de manera asincrónica, haceindo uso del filesystem fs.
const moviesFile = fs.readFileSync("./movies.json", "utf-8");
let movies = JSON.parse(moviesFile); //convertimos a un objeto.

router.get("/", (req, res) => {
  res.json("API REST Movies");
});

router.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

router.get('/movies/:id', (req, res) => {
  //console.log({movies})
  //const m;
  const m =movies.filter(movie =>movie.id == req.params.id);

  //const json_movies = JSON.stringify(m);
  if(m.length===0) {res.status(304).send("NO existe la pelicula")}else{
    res.status(200).json(m)
    id=null;
  }
});
router.post("/movies", (req, res) => {
const { title, director, year, duration, genre, poster } = req.body;
    
    //Validamos los datos
    if (!title || !director || !year || !duration || !genre || !poster) {
      res.status(401).json({ error: "Debe completar todos los datos." });
    } else {
       const id = movies.length + 1;
       let newMovie = {
        id,
        title,
        director,
        year,
        duration,
        genre,
        poster,
      };
      //const newMovie = { ...req.body, id };
      movies.push(newMovie);
      const json_movies = JSON.stringify(movies);
       
      fs.writeFileSync("./movies.json", json_movies, "utf-8");
      res.status(200).json(movies);
    }
});

router.put("/movies/:id", (req, res) => {
  const { title, director, year, duration, genre, poster } = req.body;
  const id = req.params.id;

  if (!title || !director || !year || !duration || !genre || !poster || !id) {
    res.status(401).json(
        { error: "Debe completar todos los datos y/o especificar el id." });
  } else {
      
      movies.filter((movie) => {
          //comparamos el id del objeto con el id del parametro  
      if (movie.id == id) {
        //Actualizamos el objeto
        movie.title = title;
        movie.director = director;
        movie.year = year;
        movie.duration = duration;
        movie.genre = genre;
        movie.poster = poster;
      }

    });
    
    const json_movies = JSON.stringify(movies);
    fs.writeFileSync("./movies.json", json_movies, "utf-8");

    res.status(200).json(movies);
  }
});

router.delete("/movie/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    res
      .status(401)
      .json({ error: "Debe especificar el id del elemento a eliminar." });
  } else {
    const indexMovie = movies.findIndex((movie) => movie.id === id);
    movies.splice(indexMovie, 1);

    const json_movies = JSON.stringify(movies);
    fs.writeFileSync("./movies.json", json_movies, "utf-8");

    res.status(200).json(movies);
  }
});

module.exports = router;
