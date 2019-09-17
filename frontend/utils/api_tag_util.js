
export const fetchTags = (note_id) => {
  let data;
  if (note_id) {
    data = {note_id: note_id}
  } else {
    data = {}
  }
  return $.ajax({
    url: `api/tags`,
    method: "GET",
    data: data
  })
}

export const createTag = (tag) => {
  return $.ajax({
    url: `api/tags`,
    method: "POST",
    data: {
      tag: tag
    }
  })
}

export const updateTag = (tag) => {
  return $.ajax({
    url: `api/tags/${tag.id}`,
    method: "PATCH",
    data: {
      tag: tag
    }
  })
}

export const destroyTag = (id) => {
  return $.ajax({
    url: `api/tags/${id}`,
    method: "DELETE"
  })
}

