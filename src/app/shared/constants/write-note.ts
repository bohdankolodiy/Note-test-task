import { INoteActions } from '../interfaces/note-action.interface';

export const writeNotesAction: INoteActions = {
  chat: <string>'Add a note about ',
  call: <string>'Add a call with ',
  coffee: <string>'Add a coffee with ',
  person: <string>'Add a meetting with ',
  local_drink: <string>'Add a local drink with ',
};
