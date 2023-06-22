import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import * as _ from 'underscore';
import { HttpService } from '../../services/http';
import { WordResponse } from '../../services/model';
import { RandomHelper } from '../../helper/random';
@Component({
  selector: 'app-new-word',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewWordComponent implements OnInit {
  newWord: string;
  constructor(
    private windowRef: NbWindowRef,
    private httpService: HttpService
  ) {}
  ngOnInit(): void {}

  onSave(): void {
    if (this.newWord?.trim().length > 0) {
      const newWord = {} as WordResponse;
      newWord.id = RandomHelper.generateText(5);
      newWord.word = this.newWord;
      this.httpService.post(newWord).subscribe((response) => {
        console.log(response);
      });
    }
  }

  close(): void {
    this.windowRef.close();
  }
}
