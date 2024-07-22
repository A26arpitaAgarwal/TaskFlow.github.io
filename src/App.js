import React, { useState, useEffect } from "react";
import "./index.css";

// get the localStorage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // add the items fucnction
  const addItem = () => {
    if (!inputdata) {
      alert("First enter the task");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img
              src="data:image/jpeg;base64,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"
              alt="TodoImage"
            />
            <figcaption>TODO LIST</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder=" Add Your Task"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>

          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span> ALL ENTRIES </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
