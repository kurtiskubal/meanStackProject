import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { Movie } from "./movie.model";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  moviesChanged = new Subject<Movie[]>();

  private movies: Movie[] = [];

  constructor(private http: HttpClient,
              private router: Router) { }

  setMovies(movies: Movie[]) {
    this.movies = movies;
    this.moviesChanged.next(this.movies.slice());
  }
  
  getMovies() {
    this.http
      .get<{ message: string; movies: any }>(
        "http://localhost:3000/movies"
      )
      .pipe(map((movieData) => {
        return movieData.movies.map(movie => {
          return {
            title: movie.title,
            releaseDate: movie.releaseDate,
            imagePath: movie.imagePath,
            id: movie._id
          };
        });
      }))
      .subscribe(transMovies => {
        this.movies = transMovies;
        this.moviesChanged.next([...this.movies]);
      });
  }
  
  getMovie(index: number) {
    return this.movies[index];
  }
  
  addMovie(video: Movie) {
    const title = video.title;
    const releaseDate = video.releaseDate;
    const imagePath = video.imagePath;
    const movie: Movie = { id: null, title: title, releaseDate: releaseDate, imagePath: imagePath };
    this.http
      .post<{ message: string, movieID: string }>("http://localhost:3000/movies", movie)
      .subscribe(responseData => {
        const id = responseData.movieID;
        movie.id = id;
        this.movies.push(movie);
        this.moviesChanged.next([...this.movies]);
      });
  }
  
  updateMovie(index: number, newMovie: Movie) {
    this.movies[index] = newMovie;
    this.moviesChanged.next(this.movies.slice());
  }
  
  deleteMovie(index:number) {
    this.movies.splice(index, 1);
    this.moviesChanged.next(this.movies.slice());
  }
}
