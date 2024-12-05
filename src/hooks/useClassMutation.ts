import { useMutation, useQueryClient } from "react-query";
import { addClass, deleteClass, unassignStudent } from "../services/classes.service";
import { addStudent, deleteStudent } from "../services/students.service";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent as deleteStudentRedux, removeStudentInClass, setStudents } from "../redux/studentsSlice"; // Import Redux actions
import { deleteClass as deleteClassRedux, removeStudentFromClass, setClasses } from "../redux/classesSlice"; // If you have a classes slice
import { RootState } from "../redux/store";



export const useUnassignStudent = () => {
  const dispatch = useDispatch();

  return useMutation(unassignStudent, {
    onSuccess: (_, studentId) => {
      dispatch(removeStudentFromClass(studentId));
      dispatch(removeStudentInClass(studentId))
    },
    onError: (error) => {
      console.error("Failed to unassign student:", error);
    },
  });
};


export const useDeleteClass = () => {
  const dispatch = useDispatch();

  return useMutation(deleteClass, {
    onSuccess: (_, classId) => {
      dispatch(deleteClassRedux(classId));
    },
    onError: (error) => {
      console.error("Failed to delete class:", error);
    },
  });
};

export const useDeleteStudent = () => {
  const dispatch = useDispatch();

  return useMutation(deleteStudent, {
    onSuccess: (_, studentId) => {
      dispatch(deleteStudentRedux(studentId)); 
    },
    onError: (error) => {
      console.error("Failed to delete student:", error);
    },
  });
};

export const useAddStudent = () => {
  const students = useSelector((state: RootState) => state.students.studentsData);

  const dispatch = useDispatch();
  const mutation = useMutation(addStudent, {
    onSuccess: (newStudent) => {
      const updatedStudents = [...students, newStudent];

      dispatch(setStudents(updatedStudents));
    },
    onError: (error) => {
      console.error("Error creating student:", error);
    },
  });

  return mutation;
};

export const useAddClass = () => {
  const classrooms = useSelector((state: RootState) => state.classrooms.classesData)

  const dispatch = useDispatch()
  const mutation = useMutation(addClass, {
    onSuccess: (newClass) => {
      const updatedClasses = [...classrooms, newClass]

      dispatch(setClasses(updatedClasses))
    },
    onError: (error) => {
      console.error("Error creating student:", error)
    }
  })
  return mutation
}



