import studentsReducer from './studentsSlice'
import classroomsReducer from './classesSlice';
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
