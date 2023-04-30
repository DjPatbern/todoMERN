import React, { useEffect, useState } from "react";
import { useGetUsername } from "../Hooks/useGetUsername";
import { useCookies } from "react-cookie";
import { useGetId } from "../Hooks/useGetId";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Home = () => {
  const userId = useGetId();
  const username = useGetUsername();
  const [postImage, setPostImage] = useState("");
  const [cookies, _] = useCookies(["access_token"]);
  let url = "";
  const [filename, setFilename] = useState(null);

  const [allTasks, setAllTasks] = useState({
    taskName: "",
    dateAdded: new Date().toLocaleDateString(),
    deadline: "",
    completed: false,
    userOwner: userId,
    image: "",
  });

  const [shownTasks, setShownTask] = useState();

  const handleChange = (e) => {
    // e.preventDefault();
    const { name, value } = e.target;
    setAllTasks({ ...allTasks, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(postImage);
    

    try {
      await axios.post("http://localhost:5000/todolists", allTasks, {
        headers: {
          authorization: cookies.access_token,
        },
      });
      alert("Todo Task Created");

      // navigate("/")
    
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

 

  useEffect(() => {
    const getTask = async () => {
      const response = await axios.get("http://localhost:5000/todolists", {
        userId,
      });
      setShownTask(response.data);
      console.log(response.data);
    };
    getTask();
  }, []);

  const handleDelete = async (id) => {
    const newTodo = await axios.delete(`http://localhost:5000/todolists/${id}`);
    setAllTasks(newTodo.data);
    window.location.reload();
    // console.log(id);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault()
    const base64 = await convertToBase64(filename);
    setPostImage(base64);
    allTasks.image = postImage
    console.log(allTasks.image);
  };
  

  return (
    <>
      <div>Welcome {username}</div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Task Name"
          name="taskName"
          id="taskName"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="mm/dd/yy"
          name="deadline"
          id="deadline"
          onChange={handleChange}
        />
        <input
          type="file"
          name="image"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => setFilename(e.target.files[0])}
        />
        <button type="button" onClick={(e) => handleFileUpload(e)}>upload</button>
        <button type="submit">Add Task</button>
      </form>
      <img src={postImage} alt="" />

      <div>
        <div className="span-div task-header">
          <span>Task Name</span>
          <span>Date Added</span>
          <span>Deadline</span>
          <span>Completed?</span>
        </div>
        {shownTasks?.map((task) => (
          <div key={task._id}>
            {task.userOwner === userId && (
              <div className="span-div">
                <span>{task.taskName}</span>
                <span>{task.dateAdded}</span>
                <span>{task.deadline}</span>
                {
                  task.image && <img src={task.image} alt="" />
                }
                
                <span>{`${task.completed === false ? "False" : "True"}`}</span>
                <Link to={`/${task._id}`}>Edit</Link>
                <span onClick={() => handleDelete(task._id)}>X</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
