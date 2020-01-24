import React from "react";
import { useSelector } from "react-redux";

function List() {
  const counter = useSelector(state => state);
  const articles = counter.articles;
  console.log({counter, articles});
  articles.map((ar, i) => 
    console.log({ar, i})
  );
  return (
    <ul>
      {articles.map((ar, i) => (
        <li key={i}>{ar}</li>
      ))}
    </ul>
  )
}

export default List;
