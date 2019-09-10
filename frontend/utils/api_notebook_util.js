
export const fetchNotebooks = () => {
  return $.ajax({
    url: `api/notebooks`,
    method: "GET"
  })
}

export const fetchNotebook = (id) => {
  return $.ajax({
    url: `api/notebooks/${id}`,
    method: "GET"
  })
}

export const createNotebook = (notebook) => {
  return $.ajax({
    url: `api/notebooks`,
    method: "POST",
    data: {
      notebook: notebook
    }
  })
}

export const updateNotebook = (notebook) => {
  return $.ajax({
    url: `api/notebooks/${notebook.id}`,
    method: "PATCH",
    data: {
      notebook: notebook
    }
  })
}

export const destroyNotebook = (id) => {
  return $.ajax({
    url: `api/notebooks/${id}`,
    method: "DELETE"
  })
}
