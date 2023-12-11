import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  FormCheck,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import "../build/styles.css";

function App() {
  const [todoTitle, setTodoTitle] = useState(null);
  const [newTask, setNewTask] = useState(null);
  const [currentTodoList, setCurrentTodoList] = useState(null);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = JSON.parse(localStorage.getItem("todoList"));
    return savedTodoList || {};
  });
  const [listOfList, setListOfList] = useState(() => {
    const listoflist = [];
    for (let i = 0; i < Object.keys(todoList).length; i++) {
      listoflist.push(Object.keys(todoList)[i]);
    }
    return listoflist || [];
  });

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    console.log(`Saved ${localStorage.getItem("todoList")}`);
  }, [todoList]);

  const addNewTodoList = () => {
    const updatedList = [...listOfList];
    if (!todoList[todoTitle]) {
      updatedList.push(todoTitle);
      setListOfList(updatedList);
      const updatedTodoList = { ...todoList, [todoTitle]: [] }; // Keep existing structure and add new todo list
      setTodoList(updatedTodoList);
    }

    setCurrentTodoList(todoTitle);
    setTodoTitle("");
  };

  const addNewTask = () => {
    if (newTask !== null && newTask !== "" && currentTodoList) {
      const updatedTodoList = { ...todoList };
      updatedTodoList[currentTodoList].push({
        task: newTask,
        status: "undone",
      });
      setTodoList(updatedTodoList);
      setNewTask("");
    }
  };

  const updateTaskStatus = (index, e) => {
    const updatedTodoList = [...todoList[currentTodoList]]; // Create a new copy of the tasks array
    updatedTodoList[index].status = e.target.checked ? "done" : "undone";

    const updatedList = { ...todoList };
    updatedList[currentTodoList] = updatedTodoList; // Update the specific todo list

    setTodoList(updatedList);
  };
  const taskMenuController = () => {
    setOpenSideBar(!openSideBar);
  };
  return (
    <>
      <Container className='my-4'>
        <Row className='justify-content-center'>
          <Col md={6} className='align-self-center'>
            <InputGroup className='mb-3'>
              <FloatingLabel controlId='todoListTitle' label='Todo List Title'>
                <FormControl
                  type='text'
                  value={todoTitle || ""}
                  onChange={(e) => setTodoTitle(e.target.value)}
                  onKeyDown={(e) => {
                    e.key === "Enter" ? addNewTodoList() : null;
                  }}
                  placeholder='Todo List Title'></FormControl>
              </FloatingLabel>
              <Button className='btn btn-primary px-3' onClick={addNewTodoList}>
                Create New <i className='bi bi-plus-circle'></i>
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col md={10} className={`d-md-flex rounded mainContainer`}>
            <div
              className={`border rounded-start p-0 bg-dark text-white text-start sidebar h-100 ${
                !openSideBar ? "closeTaskList" : "openTaskList"
              }`}>
              <div
                className={`p-2 d-md-none ${
                  !openSideBar ? "text-center" : "text-end"
                }`}>
                <Button variant='outline-primary' onClick={taskMenuController}>
                  <i
                    className={`${
                      !openSideBar ? "bi bi-menu-button-wide" : "bi bi-x-lg"
                    }`}></i>
                </Button>
              </div>
              {listOfList.map((title, index) => (
                <div
                  key={index}
                  style={{ textOverflow: "ellipsis" }}
                  onClick={() => {
                    openSideBar ? setOpenSideBar(!openSideBar) : null;
                    setCurrentTodoList(title);
                  }}
                  className={`fs-5 p-3 border-bottom overflow-hidden text-nowrap position-relative ${
                    title === currentTodoList ? "bg-white bg-opacity-10" : ""
                  }`}>
                  <span className='hideOnExpand d-md-none border border-white rounded p-1'>
                    {title.slice(0, 2).toUpperCase()}
                  </span>
                  <span className='task'>{title}</span>
                  <Button
                    className='task position-absolute end-0 me-3'
                    style={{ marginTop: "-4px" }}>
                    <i className='bi bi-arrow-right-circle'></i>
                  </Button>
                </div>
              ))}
            </div>
            <div className='todoContainter rounded-end border p-3 h-100'>
              {currentTodoList !== null ? (
                <>
                  <InputGroup className='mb-3'>
                    <FloatingLabel controlId='newTask' label='Enter New Task'>
                      <FormControl
                        type='text'
                        value={newTask || ""}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" ? addNewTask() : null
                        }
                        placeholder='Enter New Task'></FormControl>
                    </FloatingLabel>
                    <Button
                      className='btn btn-primary px-3'
                      onClick={addNewTask}>
                      <span className='d-none d-md-inline'>Add List</span>
                      <i className='bi bi-plus-circle'></i>
                    </Button>
                  </InputGroup>
                  {todoList[currentTodoList].map((task, index) => (
                    <div key={index} className='fs-5 mb-3'>
                      <FormCheck
                        type='checkbox'
                        checked={task.status === "done" || false}
                        onChange={(e) => updateTaskStatus(index, e)}
                        id={`${task.task}_${index}`}
                        label={`${task.task}`}></FormCheck>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
