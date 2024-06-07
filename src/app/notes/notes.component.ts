import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

import { notesAction } from '../shared/enums/noteActions.enum';
import { writeNotesAction } from '../shared/constants/write-note';
import { INoteActions } from '../shared/interfaces/noteAction.interface';

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
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent {
  note: FormControl<string | null> = new FormControl('', [
    Validators.minLength(1),
    Validators.required,
  ]);
  public notes: Array<any> = [];
  public activeAction: string = 'chat';

  get actions(): string[] {
    return Object.keys(notesAction).filter((key) =>
      isNaN(Number(key))
    ) as Array<string>;
  }

  get notePlaceholder(): string {
    return writeNotesAction[this.activeAction as keyof INoteActions];
  }

  submitNotes() {
    const body = {
      note: this.note.getRawValue(),
      type: 0,
      date: new Date().toISOString(),
    };
    this.notes.unshift(body);
  }
}
