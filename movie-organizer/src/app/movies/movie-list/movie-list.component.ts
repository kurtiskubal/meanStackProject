import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../movie.model';
import { Subscription } from 'rxjs';
import { MovieService } from '../movie.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[];
  subscription: Subscription;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.movieService.getMovies();
    this.subscription = this.movieService.moviesChanged
      .subscribe((movies: Movie[]) => {
        this.movies = movies;
      });
  }

  onNewMovie() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
