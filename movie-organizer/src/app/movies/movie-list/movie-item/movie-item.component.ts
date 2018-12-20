import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {

  constructor() { }

  @Input() movie: Movie;

  @Input() index: number;

  ngOnInit() {
  }

}
