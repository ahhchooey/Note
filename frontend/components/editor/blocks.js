import React from "react";


export const CodeBlock = (props) => {
  return (
    <code className="code-block" {...props.attributes}>
      {props.children}
    </code>
  )
}

export const HighlightBlock = (props) => {
  return (
    <span className="highlight-block" {...props.attributes}>
      {props.children}
    </span>
  )
}

export const OrderedList = (props) => {
  return (
    <ol className="ordered-list" {...props.attributes}>
      <li>{props.children}</li>
    </ol>
  )
}

export const UnorderedList = (props) => {
  return (
    <ul className="unordered-list" {...props.attributes}>
      <li>{props.children}</li>
    </ul>
  )
}
