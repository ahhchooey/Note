
export const fetchNotes = (notebook_id) => {
  let data;
  if (notebook_id) {
    data = {notebook_id: notebook_id}
  } else {
    data = {}
  }
  return $.ajax({
    url: `api/notes`,
    method: "GET",
    data: data
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
      note: note,
      id: note.id
    }
  })
}

export const destroyNote = (id) => {
  return $.ajax({
    url: `api/notes/${id}`,
    method: "DELETE"
  })
}
