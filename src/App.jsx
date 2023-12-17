import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  FormCheck,
  FormControl,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "react-bootstrap";
import "../build/styles.css";

function App() {
  const [todoTitle, setTodoTitle] = useState(null);
  const [newTask, setNewTask] = useState(null);
  const [currentTodoList, setCurrentTodoList] = useState(null);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [show, setShow] = useState(false);
  const [listDeleted, setListDeleted] = useState(false);

  //Load Item From Local Storage..
  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = JSON.parse(localStorage.getItem("todoList"));
    return savedTodoList || {};
  });

  // Collect The List Titles From The Loaded Todo List
  const [listOfList, setListOfList] = useState(() => {
    const listoflist = [];
    for (let i = 0; i < Object.keys(todoList).length; i++) {
      listoflist.push(Object.keys(todoList)[i]);
    }
    return listoflist || [];
  });

  // Loo
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    console.log(`Saved ${localStorage.getItem("todoList")}`);

    // If A List Get Deleted Refresh The Naviation Item
    if (listDeleted) {
      const listoflist = [];
      for (let i = 0; i < Object.keys(todoList).length; i++) {
        listoflist.push(Object.keys(todoList)[i]);
      }
      setListOfList(listoflist);
    }
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
    const hasUndone = updatedTodoList.some((task) => task.status === "undone");
    !hasUndone ? setShow(true) : null;
    setTodoList(updatedList);
  };

  const deleteCompletedTask = () => {
    const updatedTodoList = { ...todoList };
    console.log(delete updatedTodoList[currentTodoList]);
    console.log(updatedTodoList);
    // delete updatedTodoList[currentTodoList];
    setTodoList(updatedTodoList);
    setCurrentTodoList(null);
    setListDeleted(true);
    handleClose();
  };

  const handleClose = () => setShow(false);

  const taskMenuController = () => {
    setOpenSideBar(!openSideBar);
  };
  return (
    <>
      <Container className='my-4'>
        {/* Creating A New Todo List Input And Button */}
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
        {/* Form Ends Here */}

        {/* Todo List Containter Starts Here */}
        <Row className='justify-content-center'>
          <Col md={10} className={`d-md-flex rounded mainContainer`}>
            {/* Todo List Left Side Navigation Starts Here */}
            <div
              className={`border rounded-start p-0 bg-dark text-white text-start sidebar h-100 ${
                !openSideBar ? "closeTaskList" : "openTaskList"
              }`}>
              {/* Mobile Expension Nav Icon For Collapse And Expansion Of Menu Icon */}
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

              {/* Listing Of Naviation Items From Stored TodoList */}
              {listOfList.map((title, index) => (
                <div
                  key={index}
                  style={{ textOverflow: "ellipsis" }}
                  onClick={() => {
                    openSideBar ? setOpenSideBar(!openSideBar) : null;
                    setCurrentTodoList(title);
                  }}
                  className={`fs-5 p-3 pe-md-5 border-bottom overflow-hidden text-nowrap position-relative ${
                    title === currentTodoList ? "bg-white bg-opacity-10" : ""
                  }`}>
                  {/* Mobile Abbreviation Display First Two Letters */}
                  <span className='hideOnExpand d-md-none border border-white rounded p-1'>
                    {title.slice(0, 2).toUpperCase()}
                  </span>
                  <span className='task'>{title}</span>
                  <Button
                    variant='primary'
                    className='task position-absolute end-0 me-3 hover-text'
                    style={{ marginTop: "-4px" }}>
                    <i className='bi bi-arrow-right-circle'></i>
                  </Button>
                </div>
              ))}
            </div>
            <div className='todoContainter rounded-end border p-3 h-100 bg-dark'>
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
                    <div key={index} className='fs-5 mb-3 text-white'>
                      <Form.Check type='checkbox' id={`${task.task}_${index}`}>
                        <Form.Check.Input
                          type='checkbox'
                          checked={task.status === "done" || false}
                          onChange={(e) =>
                            updateTaskStatus(index, e)
                          }></Form.Check.Input>
                        <Form.Check.Label
                          className={
                            task.status === "done"
                              ? "text-decoration-line-through"
                              : null
                          }>
                          {`${task.task}`}
                        </Form.Check.Label>
                      </Form.Check>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
          </Col>
        </Row>
        <Modal show={show} onHide={handleClose} backdrop='static' centered>
          <ModalHeader closeButton>Completed Todolist</ModalHeader>
          <ModalBody className='text-center'>
            Woohoo, Todo List Completed! <br />
            Delete completed List
          </ModalBody>
          <ModalFooter className='bg-dark'>
            <Button variant='outline-primary' onClick={deleteCompletedTask}>
              Delete <i className='bi bi-archive-fill'></i>{" "}
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
}

export default App;
