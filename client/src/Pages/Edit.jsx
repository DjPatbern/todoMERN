import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetId } from "../Hooks/useGetId";

const Edit = () => {
  const userId = useGetId();
  const [task, setTask] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  // const [isCompleted, setIsCompleted] = useState(task.completed);
  const [editTasks, setEditTasks] = useState({
    taskName: task.taskName,
    dateAdded: task.dateAdded,
    deadline: task.deadline,
    completed: task.completed,
    userOwner: userId,
  });
  
  const params = useParams();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setEditTasks({ ...editTasks, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTasks.taskName !== "") {
        await axios.put(
          `http://localhost:5000/todolists/edit-task/${params.id}`,
          editTasks,
          {
            headers: {
              authorization: cookies.access_token,
            },
          }
        );
        alert("Task Edited Successfully");
        console.log("Submitted");
        window.location.reload();
      } else {
        alert("Please add value to edited task");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const taskId = `http://localhost:5000/todolists/each-task/${params.id}`;
    axios.get(taskId).then((response) => {
      setTask(response.data);
      console.log(response.data);
    });
  }, [params]);

  // console.log(isCompleted);

  return (
    <div>
      <div>
        <p>{task.taskName}</p>
        <p>{task.dateAdded}</p>
        <p>{task.deadline}</p>
      </div>

      <input
        type="text"
        name="taskName"
        onChange={handleChange}
        placeholder={task.taskName}
      />
      <input
        type="text"
        name="deadline"
        onChange={handleChange}
        placeholder={task.deadline}
      />
      <button onClick={() => editTasks.completed = !task.completed}>
        Completed
      </button>

      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default Edit;
