import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
