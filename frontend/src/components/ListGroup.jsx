import { useState } from "react";

function ListGroup() {
  let items = ["Colombo", "Kandy", "Ratnapura", "Embilipitiya"];
  let selectedIndex = 0;
  useState(-1);

  function getMsg() {
    if (items.length == 0) {
      return <li>No items</li>;
    }
  }

  // function selectedItemCheck() {
  //   if (selectedIndex === index ) {
  //     return 'list-group-item active'
  //   } else {
  //     return 'list-group-item'
  //   }
  // }

  return (
    <>
      <h1>List Group</h1>
      {getMsg()}
      <ul className="List-group">
        {items.map((items, index) => (
          <li
            key={items}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              selectedIndex = index;
            }}
          >
            {items}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
