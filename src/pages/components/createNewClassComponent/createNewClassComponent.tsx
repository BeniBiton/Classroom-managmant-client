import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAddClass } from "../../../hooks/useClassMutation";


const CreateClassForm = () => {
  const {mutate: addNewClass, isLoading, error, isError} = useAddClass()
  
  const [formData, setFormData] = useState({
    id: "",
    className: "",
    totalPlaces: 0,
  });



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
        disabled={isLoading}
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
