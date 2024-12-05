import classroomsReducer from './classesSlice';
import studentsReducer from './studentsSlice'
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    classrooms: classroomsReducer,
    students: studentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
