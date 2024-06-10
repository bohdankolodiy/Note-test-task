import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

import { notesAction } from '../shared/enums/note-actions.enum';
import { writeNotesAction } from '../shared/constants/write-note';
import { INoteActions } from '../shared/interfaces/note-action.interface';
import { NoteDetailsComponent } from '../shared/components/note-details/note-details.component';
import { DateService } from '../services/date.service';
import { INoteDetails } from '../shared/interfaces/note-details.interface';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    NoteDetailsComponent,
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent {
  note: FormControl<string | null> = new FormControl('', [
    Validators.minLength(1),
    Validators.required,
  ]);
  public notes: Array<INoteDetails> = [
    {
      note: 'And a more formal meeting.',
      type: 'person',
      date: '06/7/2024, 12:44',
      id: 0,
      createdBy: 'You',
      relevantPerson: 'Milton Romaguera',
    },
    {
      note: 'Then we had a follow-up phone call.',
      type: 'call',
      date: '06/5/2024, 12:44',
      id: 1,
      relevantPerson: 'Milton Romaguera',
      createdBy: 'You',
    },
    {
      note: 'We had coffe!',
      type: 'coffee',
      date: '06/4/2024, 12:44',
      id: 2,
      relevantPerson: 'Milton Romaguera',
      createdBy: 'You',
    },
    {
      note: 'A test note of message type!',
      type: 'chat',
      date: '05/27/2024, 12:44',
      id: 4,
      relevantPerson: 'Milton Romaguera',
      createdBy: 'You',
    },
  ];
  public activeAction: string = 'chat';
  public isFormFieldFocused = signal(false);
  public relevantPerson: string = 'Milton Romaguera';
  public createdBy: string = 'You';

  get actions(): string[] {
    return Object.keys(notesAction).filter((key) =>
      isNaN(Number(key))
    ) as Array<string>;
  }

  get notePlaceholder(): string {
    return (
      writeNotesAction[this.activeAction as keyof INoteActions] +
      this.relevantPerson +
      '...'
    );
  }
  constructor(private dateService: DateService) {}

  onDelete(id: any) {
    this.notes.splice(
      this.notes.findIndex((el) => el.id == id),
      1
    );
  }

  submitNotes() {
    const body: INoteDetails = {
      note: this.note.getRawValue()!,
      type: this.activeAction,
      date: this.dateService.formatToLocaleDateTime(new Date()),
      id: this.notes.length,
      relevantPerson: this.relevantPerson,
      createdBy: this.createdBy,
    };
    this.notes.unshift(body);
    this.resetForm();
  }

  resetForm() {
    this.note.reset();
    this.isFormFieldFocused.set(false);
  }
}
