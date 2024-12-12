import { IStudent } from '../interfaces/student.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface StudentState {
  studentsData: IStudent[];
}

const initialState: StudentState = {
  studentsData: [],
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<IStudent[]>) => {
      const students = action.payload
      state.studentsData = students;
    },
    deleteStudent: (state, action: PayloadAction<string>) => {
      const studentId = action.payload
      state.studentsData = state.studentsData.filter(
        (student) => student.id !== studentId
      )
    },
    updateStudentClass: (
      state,
      action: PayloadAction<{ studentId: string; classId: string }>
    ) => {
      const { studentId, classId } = action.payload;

      state.studentsData = state.studentsData.map((studentItem) => {
        if (studentItem.id === studentId) {
          studentItem.classId = classId
        }
        return studentItem
      }
      );
    },

    removeStudentInClass: (state, action: PayloadAction<string>) => {
      const studentId = action.payload
      state.studentsData = state.studentsData.map((studentItem) => {
        if (studentItem.id === studentId) {
          return {
            ...studentItem,
            classId: null,
          };
        }
        return studentItem;
      });
    },



  },
});

export const { setStudents, deleteStudent, updateStudentClass, removeStudentInClass } = studentSlice.actions;
export default studentSlice.reducer;
