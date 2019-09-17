
//sorts notes by putting most recently changed note into index 0
export const sortNotesByDate = (notes) => {
  if (notes.length <= 1) return notes;

  let piv = notes[0];
  let left = [];
  let right = [];
  for (let i = 1; i < notes.length; i++) {
    (new Date(notes[i].updated_at) > new Date(piv.updated_at))
      ? left.push(notes[i])
      : right.push(notes[i])
  }

  return sortNotesByDate(left).concat([piv], sortNotesByDate(right))
}

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
//sorts tags by title, alphabetically
export const sortTagsByTitle = (tags) => {
  if (tags.length <= 1) return tags;

  let piv = tags[0];
  let left = [];
  let right = [];
  for (let i = 1; i < tags.length; i++) {
    (ALPHABET.indexOf(tags[i].title[0].toLowerCase()) < ALPHABET.indexOf(piv.title[0].toLowerCase()))
      ? left.push(tags[i])
      : right.push(tags[i])
  }

  return sortTagsByTitle(left).concat([piv], sortTagsByTitle(right))
}
