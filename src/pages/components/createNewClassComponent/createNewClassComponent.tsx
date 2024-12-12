import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAddClass } from "../../../hooks/useClassMutation";
import { useStyles } from "./createNewClassComponent";


const CreateClassForm = () => {
  const {mutate: addNewClass, isLoading, error, isError, isSuccess} = useAddClass()
  const classes = useStyles()
  
  const [formData, setFormData] = useState({
    id: "",
    className: "",
    totalPlaces: 0,
  });

  const isFormValid = () => {
    return formData.id !== "" && formData.className !== "" && formData.totalPlaces > 0;
  };


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addNewClass(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalPlaces" ? parseInt(value) : value,
    }));
  };

  if (isSuccess) {
    setFormData({
      id: "",
      className: "",
      totalPlaces: 0,
    });
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
        id="id"
        name="id"
        label="ID"
        variant="outlined"
        value={formData.id}
        onChange={handleChange}
      />
      <TextField
        required
        id="className"
        name="className"
        label="Class Name"
        variant="outlined"
        value={formData.className}
        onChange={handleChange}
      />
      <TextField
        required
        id="totalPlaces"
        name="totalPlaces"
        label="Max Seats"
        variant="outlined"
        type="number"
        value={formData.totalPlaces}
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2, width: "300px" }}
        disabled={isLoading || !isFormValid()}
      >
        {isLoading ? "Creating..." : "Create Class"}
      </Button>

      {isError && (
        <Box sx={{ mt: 2, color: "red", textAlign: "center" }}>
          Error: {error instanceof Error ? error.message : "An error occurred"}
        </Box>
      )}
    </Box>
  );
};

export default CreateClassForm;
