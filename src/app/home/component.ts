import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Path } from '../app-routing.module';

@Component({
  selector: 'app-home',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {}

  redirectToNewGame(): void {
    this.route.navigateByUrl('/' + Path.Game);
  }
}
