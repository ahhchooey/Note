
export const fetchNotes = () => {
  return $.ajax({
    url: `api/notes`,
    method: "GET"
  })
}

export const fetchNote = (id) => {
  return $.ajax({
    url: `api/notes/${id}`,
    method: "GET"
  })
}

export const createNote = (note) => {
  return $.ajax({
    url: `api/notes`,
    method: "POST",
    data: {
      note: note
    }
  })
}

export const updateNote = (note) => {
  return $.ajax({
    url: `api/notes/${note.id}`,
    method: "PATCH",
    data: {
      note: note
    }
  })
}

export const destroyNote = (id) => {
  return $.ajax({
    url: `api/notes/${id}`,
    method: "DELETE"
  })
}
