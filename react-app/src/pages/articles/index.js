import React from "react";
import List from "./List";
import Form from "./Form";
import {Link} from "react-router-dom";

function Articles(){

    return (
      <>
        <Link to="/">Home</Link>
        <div>
          <h2>Articles</h2>
          <List />
        </div>
        <div>
          <h2>Add a new article</h2>
          <Form />
        </div>
      </>
    )
}

export default Articles;
