# [Note](https://note-ac.herokuapp.com/#/)

------

### Tech Stack

* Javascript
* React
* Redux
* Ruby
* Rails
* PostgreSQL

------

Note is a note taking and organizational application. In Note, you can use notebooks, notes, and tags to keep every thought organized. Notebooks can be used to store groups of related notes. And tags can be used to sort and group notes that have similar content. And of course notes are the heart of Note, where any and every thought and idea can be stored and edited.

![Screenshot of Note](https://github.com/ahhchooey/Note/blob/master/images/note_screenshot.png)

### How It Works
------
1. Note is built off of a Ruby on Rails backend. There, it keeps track of users. This allows users to log in and log out, all while retaining a sense of privacy, as notes can only be accessed by their owners.
2. The backend, built with Postgresql, also keeps track of all notes, notebooks, and tags. And any relationships between them.
3. The frontend, built with React and Redux, make the entirety of the ui/ux design.
4. The text editor is built off of Slate.js. Using the library, rich text editing, with images and tables are implemented to make the note taking experience more pleasant.

### How To Use
------
To use Note, it is as simple as signing up for an account, creating some notes, notebooks, and tags. And start taking some notes!

### Example Code
------

An example of the react lifecycle methods in the tagbar component.
```js
componentDidMount() {
  this.setState({noteId: this.props.noteId})
  fetchTags().then(res => {
    this.setState({allTags: res})
  })
}

componentDidUpdate(prevProps) {
  if (this.state.noteId != this.props.noteId) {
    this.setState({noteId: this.props.noteId})
    fetchTags(this.props.noteId).then(res => {
      this.setState({tags: res})
    })
  }
}
```

An example of the rendering methods inside of the Text Editor.
```js
...
renderMark(props, editor, next) {
  const { children, mark, attributes } = props

  switch (mark.type) {
    case 'bold':
      return <strong {...attributes}>{children}</strong>
    case 'code':
      return <code className="code-block" {...attributes}>{children}</code>
    case 'italic':
      return <em {...attributes}>{children}</em>
    case 'underlined':
      return <u {...attributes}>{children}</u>
    case 'highlight':
      return <mark {...attributes}>{children}</mark>

    default:
      return next()
  }
}

renderBlock(props, editor, next) {
  const { attributes, children, node, isFocused } = props

  switch (node.type) {
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':

...
```
