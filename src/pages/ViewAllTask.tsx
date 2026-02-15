import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Card, Button, Tag, Input, Select } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./../style.css";

const API_URL = process.env.REACT_APP_API_URL;

interface Task {
  id: number;
  name: string;
  description: string;
  status: string;
}

const { Option } = Select;

const ViewAllTask = () => {
  const navigate = useNavigate(); // ✅ FIXED (inside component)

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchTasks = useCallback(async () => {
    try {
      const params: any = {};
      if (filterName) params.name = filterName;
      if (filterStatus !== "All") params.status = filterStatus;

      const res = await axios.get(`${API_URL}/tasks`, { params });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [filterName, filterStatus]);

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <>
      <div className="filter-bar">
        <Input
          placeholder="Search by task name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          style={{ width: "250px" }}
        />

        <Select
          value={filterStatus}
          onChange={(value) => setFilterStatus(value)}
          style={{ width: "180px" }}
        >
          <Option value="All">All</Option>
          <Option value="Complete">Complete</Option>
          <Option value="Incomplete">Incomplete</Option>
        </Select>

        <Button type="primary" onClick={fetchTasks}>
          Apply Filters
        </Button>

        <Link to="/">
          <Button>Home</Button>
        </Link>
      </div>

      <div className="view-all-container">
        {tasks.length === 0 && (
          <p style={{ color: "white" }}>No tasks found.</p>
        )}

        {tasks.map((task) => (
          <Card key={task.id} className="task-card">
            <div className="task-title">{task.name}</div>

            <div className="task-details">
              <div>
                <strong>Description:</strong> {task.description}
              </div>

              <div>
                <strong>Status:</strong>{" "}
                <Tag color={task.status === "Complete" ? "green" : "red"}>
                  {task.status}
                </Tag>
              </div>
            </div>

            <div className="task-buttons">
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => navigate(`/add/${task.id}`)}
              >
                Update
              </Button>

              <Button
                type="primary"
                icon={<DeleteOutlined />}
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ViewAllTask;
