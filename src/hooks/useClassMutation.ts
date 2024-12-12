import { useMutation } from "react-query";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, deleteStudent } from "../services/students.service";
import { addClass, deleteClass, unassignStudent } from "../services/classes.service";
import { deleteClass as deleteClassRedux, removeStudentFromClass, setClasses } from "../redux/classesSlice";
import { deleteStudent as deleteStudentRedux, removeStudentInClass, setStudents } from "../redux/studentsSlice";



export const useUnassignStudent = () => {
  const dispatch = useDispatch();

  return useMutation(unassignStudent, {
    onSuccess: (_, studentId) => {
      dispatch(removeStudentFromClass(studentId));
      dispatch(removeStudentInClass(studentId))
    },
    onError: () => {
      console.error("Failed to unassign student");
    },
  });
};


export const useDeleteClass = () => {
  const dispatch = useDispatch();

  return useMutation(deleteClass, {
    onSuccess: (_, classId) => {
      dispatch(deleteClassRedux(classId));
    },
    onError: () => {
      console.error("Failed to delete class");
    },
  });
};

export const useDeleteStudent = () => {
  const dispatch = useDispatch();

  return useMutation(deleteStudent, {
    onSuccess: (_, studentId) => {
      dispatch(deleteStudentRedux(studentId)); 
    },
    onError: () => {
      console.error("Failed to delete student");
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
    onError: () => {
      console.error("Error creating student");
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
    onError: () => {
      console.error("Error creating student")
    }
  })
  return mutation
}



