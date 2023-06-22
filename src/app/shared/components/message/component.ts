import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import * as _ from 'underscore';
@Component({
  selector: 'app-message',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent implements OnInit {
  @Input() message: string;
  constructor(private windowRef: NbWindowRef) {}
  ngOnInit(): void {
    console.log(this.message);
  }

  complete(): void {
    this.windowRef.close(true);
  }

  close(): void {
    this.windowRef.close(false);
  }
}
