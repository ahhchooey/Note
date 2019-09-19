
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

export const sortNotesByTitle = (notes) => {
  if (notes.length <= 1) return notes;

  let piv = notes[0];
  let left = [];
  let right = [];
  for (let i = 1; i < notes.length; i++) {
    (ALPHABET.indexOf(notes[i].title[0].toLowerCase()) < ALPHABET.indexOf(piv.title[0].toLowerCase()))
      ? left.push(notes[i])
      : right.push(notes[i])
  }

  return sortNotesByTitle(left).concat([piv], sortNotesByTitle(right))
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

//function fakeSpaceship(thing1, thing2) {
//  if (!thing2) return 1;
//  if (!thing1) return -1;
//  if (thing1 < thing2) return -1;
//  if (thing1 > thing2) return 1;
//  if (thing1 === thing2) return 0;
//  return null;
//}
//
//const ALPHABET = "+123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
////sorts tags by title, alphabetically
//export const sortTagsByTitle = (tags, index = 0) => {
//  if (tags.length <= 1) return tags;
//  if (tags.some(tag => tag.title.length < index)) return tags.sort();
//
//  let piv = tags[0];
//  let thing;
//  let left = [];
//  let right = [];
//  for (let i = 1; i < tags.length; i++) {
//    switch(fakeSpaceship(
//      ALPHABET.indexOf(tags[i].title[index]),
//      ALPHABET.indexOf(piv.title[index])
//      )
//    ) {
//      case -1:
//        left.push(tags[i]);
//        break;
//      case 1:
//        right.push(tags[i]);
//        break;
//      case 0:
//        index++;
//        thing = (sortTagsByTitle([piv, tags[i]], index));
//        break;
//      default:
//        left.push(tags[i])
//        break;
//    }
//  }
//  if (thing === undefined) thing = piv;
//  return sortTagsByTitle(left).concat(thing, sortTagsByTitle(right))
//}

