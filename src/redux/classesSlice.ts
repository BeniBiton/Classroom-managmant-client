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
      state.classesData = action.payload;
    },
    deleteClass: (state, action: PayloadAction<string>) => {
      state.classesData = state.classesData.filter(
        (classItem: { id: string }) => classItem.id !== action.payload
      );
    },
    removeStudentFromClass: (state, action: PayloadAction<string>) => {
      state.classesData = state.classesData.map((classItem) => {
        classItem.students = classItem.students.filter(
          (studentItem) => studentItem.id !== action.payload
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
