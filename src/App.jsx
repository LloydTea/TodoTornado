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
  const [listOfList, setListOfList] = useState([]);
  const [todoTitle, setTodoTitle] = useState(null);
  const [newTask, setNewTask] = useState(null);
  const [currentTodoList, setCurrentTodoList] = useState(null);
  const [todoList, setTodoList] = useState({});

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    const savedTodoList = JSON.parse(localStorage.getItem("todoList"));
    if (savedTodoList) {
      setTodoList(savedTodoList);
    }
  }, []);

  const addNewTodoList = () => {
    const updatedList = [...listOfList];
    if (!todoList[todoTitle]) {
      updatedList.push(todoTitle);
      setListOfList(updatedList);
      setTodoList({ ...todoList, [todoTitle]: [] });
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
                  placeholder='Todo List Title'></FormControl>
              </FloatingLabel>
              <Button className='btn btn-primary px-3' onClick={addNewTodoList}>
                Create New <i className='bi bi-plus-circle'></i>
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col
            md={3}
            className='border rounded-start p-0 bg-dark text-white text-start'>
            {listOfList.map((title, index) =>
              index < listOfList.length - 1 ? (
                <div
                  key={index}
                  className={`fs-5 p-3 border-bottom overflow-hidden text-nowrap position-relative ${
                    title === currentTodoList ? "bg-white bg-opacity-10" : ""
                  }`}>
                  {title}
                  <Button
                    onClick={() => setCurrentTodoList(title)}
                    className='stretched-link position-absolute end-0 me-3'>
                    <i className='bi bi-arrow-right-circle'></i>
                  </Button>
                </div>
              ) : (
                <div
                  key={index}
                  className={`fs-5 p-3 border-bottom overflow-hidden text-nowrap position-relative ${
                    title === currentTodoList ? "bg-white bg-opacity-10" : ""
                  }`}>
                  {title}
                  <Button
                    onClick={() => setCurrentTodoList(title)}
                    className='stretched-link position-absolute end-0 me-3'>
                    <i className='bi bi-arrow-right-circle'></i>
                  </Button>
                </div>
              )
            )}
          </Col>
          <Col md={6} className='todoContainter border p-3 rounded-end'>
            {currentTodoList !== null ? (
              <>
                <InputGroup className='mb-3'>
                  <FloatingLabel controlId='newTask' label='Enter New Task'>
                    <FormControl
                      type='text'
                      value={newTask || ""}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder='Enter New Task'></FormControl>
                  </FloatingLabel>
                  <Button className='btn btn-primary px-3' onClick={addNewTask}>
                    Add List <i className='bi bi-plus-circle'></i>
                  </Button>
                </InputGroup>
                {todoList[currentTodoList].map((task, index) => (
                  <div key={index} className='fs-5 mb-3'>
                    <FormCheck
                      type='checkbox'
                      checked={task.status === "done" ? true : false}
                      onChange={() => (task.status = "done")}
                      id={`${task.task}_${index}`}
                      label={task.task}></FormCheck>
                  </div>
                ))}
              </>
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
