import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import "./../style.css";
const API_URL = process.env.REACT_APP_API_URL;

interface Task {
  id: number;
  name: string;
  description: string;
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
      <h1>
        <span style={{ color: "white" }}>TODO </span>
        <span style={{ color: "#4444b4" }}>LIST</span>
      </h1>

      

      {tasks.length === 0 && <p>No tasks found.</p>}

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <div className="task-info">
              <span
                className={`status-circle ${task.status === "Complete" ? "complete" : "incomplete"}`}
              >
                {task.status === "Complete" && "✓"}
              </span>
              <div className="task-text">
                <span className="task-name">{task.name}</span>
                <span className="task-desc">{task.description}</span>
              </div>
            </div>
            <div className="task-buttons">
              <Button
                type="primary"
                icon={<EyeOutlined />}
                onClick={() => viewTask(task)}
              >
                View
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="home-buttons">
  <Link to="/view-all">
    <Button size="middle" className="view-btn">
      View All Tasks
    </Button>
  </Link>

  <Link to="/add">
    <Button size="middle" className="add-btn">
      Add New Task
    </Button>
  </Link>
</div>

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
            <p>
              <strong>Name:</strong> {selectedTask.name}
            </p>
            <p>
              <strong>Description:</strong>
              {selectedTask.description}
            </p>
            <p>
              <strong>Status:</strong> {selectedTask.status}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Home;
