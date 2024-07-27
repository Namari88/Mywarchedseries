import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-new-serie',
  templateUrl: './new-serie.component.html',
  styleUrls: ['./new-serie.component.css'],

  providers: [MessageService]
})
export class NewSerieComponent {
  value: string | undefined;


  ingredient!: string;



  constructor() {}

}
