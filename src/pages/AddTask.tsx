import { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [initialValues, setInitialValues] = useState<FormValues>({
    name: "",
    description: "",
    status: "Incomplete",
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("Task name is required"),
    description: Yup.string().required("Task description is required"),
    status: Yup.string().required("Status is required"),
  });

  
  useEffect(() => {
    if (isEditMode) {
      axios
        .get(`${API_URL}/tasks/${id}`)
        .then((res) => {
          console.log("Fetched task for editing:", res.data);
          setInitialValues({
            name: res.data.name,
            description: res.data.description,
            status: res.data.status,
          });
        })
        .catch((err) => console.error("Error fetching task:", err));
    }
  }, [id, isEditMode]);

  const onSubmit = async (values: FormValues) => {
    try {
      if (isEditMode) {
        await axios.put(`${API_URL}/tasks/${id}`, values);
      } else {
        await axios.post(`${API_URL}/tasks`, values);
      }

      navigate("/");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <div className="add-task-container">
      <h1>{isEditMode ? "Update Task" : "Add Task"}</h1>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form className="add-task-form">

            <div className="form-group">
              <label className="form-label">Title</label>
              <Input
                name="name"
                placeholder="Task name"
                value={values.name}
                onChange={handleChange}
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <Input.TextArea
                name="description"
                placeholder="Task description"
                value={values.description}
                onChange={handleChange}
                rows={4}
              />
              <ErrorMessage name="description" component="div" className="error" />
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <Select
                value={values.status}
                onChange={(value) => setFieldValue("status", value)}
                style={{ width: "100%" }}
              >
                <Option value="Incomplete">Incomplete</Option>
                <Option value="Complete">Complete</Option>
              </Select>
              <ErrorMessage name="status" component="div" className="error" />
            </div>

            <div className="form-buttons">
              <Button type="primary" htmlType="submit">
                {isEditMode ? "Update Task" : "Add Task"}
              </Button>

              <Link to="/">
                <Button type="default">
                  Home
                </Button>
              </Link>
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTask;
