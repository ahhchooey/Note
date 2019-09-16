
export const fetchTags = () => {
  return $.ajax({
    url: `api/tags`,
    method: "GET"
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

