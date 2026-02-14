import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input, Select, Button } from "antd";
import "./../style.css";
const API_URL = process.env.REACT_APP_API_URL;

const { Option } = Select;

interface FormValues {
  name: string;
  description: string;
  status: string;
}

const AddTask = () => {
  const navigate = useNavigate();

  const initialValues: FormValues = {
    name: "",
    description: "",
    status: "Incomplete",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Task name is required"),
    description: Yup.string().required("Task description is required"),
    status: Yup.string().required("Status is required"),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await axios.post(`${API_URL}/tasks`, values);
      navigate("/");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="add-task-container">
      <h1>Add Task</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ values, handleChange, setFieldValue }) => (
          <Form className="add-task-form">
            <div>
              <Input
                name="name"
                placeholder="Task name"
                value={values.name}
                onChange={handleChange}
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div>
              <Input
                name="description"
                placeholder="Task description"
                value={values.description}
                onChange={handleChange}
              />
              <ErrorMessage name="description" component="div" className="error" />
            </div>

            <div>
              <Select
                value={values.status}
                onChange={(value) => setFieldValue("status", value)}
              >
                <Option value="Incomplete">Incomplete</Option>
                <Option value="Complete">Complete</Option>
              </Select>
              <ErrorMessage name="status" component="div" className="error" />
            </div>

            <Button type="primary" htmlType="submit">
              Add Task
            </Button>
            <Link to='/'>
            <Button type="default" htmlType="submit">
              Home
            </Button>
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTask;
