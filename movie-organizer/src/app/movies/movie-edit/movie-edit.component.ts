import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MovieService } from '../movie.service';
@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  movieForm: FormGroup;

  constructor(
      private route: ActivatedRoute,
      private movieService: MovieService,
      private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.movieService.updateMovie(this.id, this.movieForm.value);
    }
    else {
      this.movieService.addMovie(this.movieForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let movieTitle = '';
    let movieReleaseDate = '';
    let movieImagePath = '';

    if (this.editMode) {
      const movie = this.movieService.getMovie(this.id);
      movieTitle = movie.title;
      movieReleaseDate = movie.releaseDate;
      movieImagePath = movie.imagePath;
    }

    this.movieForm = new FormGroup({
      'title': new FormControl(movieTitle, Validators.required),
      'releaseDate': new FormControl(movieReleaseDate, Validators.required),
      'imagePath': new FormControl(movieImagePath, Validators.required)
    });

  }

}
