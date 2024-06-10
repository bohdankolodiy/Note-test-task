import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { INoteDetails } from '../../interfaces/note-details.interface';
import { sendNotesAction } from '../../constants/send-note';
import { INoteActions } from '../../interfaces/note-action.interface';
import { DateService } from '../../../services/date.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteDetailsComponent {
  note = input.required<INoteDetails>();
  delete = output<number>();
  constructor(private dateService: DateService) {}

  get noteTitle(): string {
    return sendNotesAction[this.note().type as keyof INoteActions];
  }

  get timeSend(): string {
    return this.dateService.getDateDiff(this.note().date);
  }

  get noteType(): string {
    return this.note().type;
  }

  get noteText(): string {
    return this.note().note;
  }

  onDelete() {
    this.delete.emit(this.note().id);
  }
}
