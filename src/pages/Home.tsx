import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal  } from "antd";
import { EyeOutlined, DeleteOutlined, SwapOutlined } from "@ant-design/icons";
import "./../style.css";
const API_URL = process.env.REACT_APP_API_URL;

interface Task {
  id: number;
  name: string;
  description: string,
  status: string;
}

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const deleteTask = async (id: number) => {
    await axios.delete(`${API_URL}/tasks/${id}`);
    fetchTasks();
  };

  const toggleStatus = async (task: Task) => {
    await axios.put(`${API_URL}/tasks/${task.id}`, {
      ...task,
      status: task.status === "Complete" ? "Incomplete" : "Complete",
    });
    fetchTasks();
  };

  const viewTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="home-container">
      <h1>Task List</h1>

      <Link to="/add" className="add-task-button">
        <Button type="primary" size="large">
          Add New Task
        </Button>
      </Link>

      {tasks.length === 0 && <p>No tasks found.</p>}

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <div className="task-info">
              <span style={{ fontWeight: "bold" }}>{task.name}</span>
              <span>Status: {task.status}</span>
            </div>
            <div className="task-buttons">
              <Button
                type="default"
                icon={<SwapOutlined />}
                onClick={() => toggleStatus(task)}
              >
                Toggle
              </Button>
              <Button
                type="primary"
                icon={<EyeOutlined />}
                onClick={() => viewTask(task)}
              >
                View
              </Button>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Link to="/view-all" >
        <Button type="default" size="small" className="view-task-button">
          View All Tasks
        </Button>
      </Link>

      <Modal
        title="Task Details"
        visible={isModalOpen}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedTask && (
          <div>
            <p><strong>Name:</strong> {selectedTask.name}</p>
            <p><strong>Description:</strong>{selectedTask.description}</p>
            <p><strong>Status:</strong> {selectedTask.status}</p>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default Home;
