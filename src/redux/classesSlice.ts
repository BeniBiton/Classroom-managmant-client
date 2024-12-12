import { ClassItem } from "../interfaces/class.interface";
import { IStudent } from "../interfaces/student.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClassesState {
  classesData: ClassItem[];
}

const initialState: ClassesState = {
  classesData: [],
};

const classesSlice = createSlice({
  name: "classes",
  initialState: initialState,
  reducers: {
    setClasses: (state, action: PayloadAction<ClassItem[]>) => {
      const classrooms = action.payload
      state.classesData = classrooms;
    },
    deleteClass: (state, action: PayloadAction<string>) => {
      const classId = action.payload
      state.classesData = state.classesData.filter(
        (classItem: { id: string }) => classItem.id !== classId
      );
    },
    removeStudentFromClass: (state, action: PayloadAction<string>) => {  
      const  studentId  = action.payload    
      state.classesData = state.classesData.map((classItem) => {
        classItem.students = classItem.students.filter(
          (studentItem) => studentItem.id !== studentId
        );

        return classItem;
      });
    },
    updateStudentByClass: (
      state,
      action: PayloadAction<{ student: IStudent; classId: string }>
    ) => {
      const { student, classId } = action.payload;
      const classItem = state.classesData.find((classItem) => classItem.id === classId);
      if (classItem) {
        const studentExists = classItem.students.some(
          (existingStudent) => existingStudent.id === student.id
        );
        if (!studentExists) {
          classItem.students.push(student);
        }
      }
    },


  },
});

export const { setClasses, deleteClass, removeStudentFromClass, updateStudentByClass } = classesSlice.actions;
export default classesSlice.reducer;
