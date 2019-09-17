
export const fetchTrashes = () => {
  return $.ajax({
    url: `api/trashes`,
    method: "GET"
  })  
}

export const fetchTrash = (id) => {
  return $.ajax({
    url: `api/trashes/${id}`,
    method: "GET"
  })
}

export const createTrash = (trash) => {
  return $.ajax({
    url: `api/trashes`,
    method: "POST",
    data: {
      trash: trash
    }
  })
}

export const restoreTrash = (trash) => {
  return $.ajax({
    url: `api/trashes/${trash.id}`,
    method: "DELETE",
    data: {
      trash: trash
    }
  })
}

export const emptyTrash = () => {
  return $.ajax({
    url: `api/trashes/0`,
    method: "DELETE"
  })
}
