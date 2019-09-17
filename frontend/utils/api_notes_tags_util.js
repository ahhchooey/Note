
export const linkNoteTag = (note_id, tag_id) => {
  return $.ajax({
    url: `api/notes_tags`,
    method: "POST",
    data: {
      note_id: note_id,
      tag_id: tag_id
    }
  })
}

export const unlinkNoteTag = (note_id, tag_id) => {
  return $.ajax({
    url: `api/notes_tags/0`,
    method: "DELETE",
    data: {
      note_id: note_id,
      tag_id: tag_id
    }
  })
}
