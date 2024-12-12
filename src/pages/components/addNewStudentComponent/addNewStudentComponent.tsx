import Box from "@mui/material/Box";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAddStudent } from "../../../hooks/useClassMutation";
import { useStyles } from "./addNewStudentComponent.styles";

const AddStudentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    age: 0,
    profession: "",
  });

  const { mutate: addNewStudent, isLoading, isSuccess } = useAddStudent();
  const classes = useStyles()
  

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    addNewStudent(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? parseInt(value) : value,
    }));
  };
  const isValidForm = (): boolean => {
    return (
      formData.id !== "" &&
      formData.firstName !== "" &&
      formData.lastName !== "" &&
      formData.profession !== "" &&
      formData.age > 0
    );
  };

  if(isSuccess){
    setFormData({
      id: "",
      firstName: "",
      lastName: "",
      profession: "",
      age: 0
    })
  }

  
  

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className={classes.container}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        id="student-id"
        label="ID"
        variant="outlined"
        onChange={handleChange}
      />
      <TextField
        required
        id="first-name"
        label="First Name"
        variant="outlined"
        onChange={handleChange}
      />
      <TextField
        required
        id="last-name"
        label="Last Name"
        variant="outlined"
        onChange={handleChange}
      />
      <TextField
        id="age"
        label="Age"
        variant="outlined"
        type="number"
        onChange={handleChange}
      />
      <TextField
        required
        id="profession"
        label="Profession"
        variant="outlined"
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2, width: "300px" }}
        disabled={isLoading || !isValidForm()} 
      >
        {isLoading ? "Creating..." : "Create Student"}
      </Button>
    </Box>
  );
};

export default AddStudentForm;
