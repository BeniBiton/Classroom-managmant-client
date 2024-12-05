import Box from "@mui/material/Box";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAddStudent } from "../../../hooks/useClassMutation";

const AddStudentForm: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [profession, setProfession] = useState<string>("");

  const { mutate: addNewStudent, isLoading } = useAddStudent();

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    addNewStudent({ id, firstName, lastName, age, profession });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > :not(style)": { m: 1, width: "300px" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        id="student-id"
        label="ID"
        variant="outlined"
        onChange={(e) => setId(e.target.value)}
      />
      <TextField
        required
        id="first-name"
        label="First Name"
        variant="outlined"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        required
        id="last-name"
        label="Last Name"
        variant="outlined"
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        id="age"
        label="Age"
        variant="outlined"
        type="number"
        onChange={(e) => setAge(parseInt(e.target.value))}
      />
      <TextField
        required
        id="profession"
        label="Profession"
        variant="outlined"
        onChange={(e) => setProfession(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2, width: "300px" }}
        disabled={isLoading} // Disable button if loading
      >
        {isLoading ? "Creating..." : "Create Student"}
      </Button>
    </Box>
  );
};

export default AddStudentForm;
