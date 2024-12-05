import api from "../api/api";
import { IStudent } from "../interfaces/student.interface";

export const fetchAllStudents = async (): Promise<IStudent[]> => {
  const response = await api.get<IStudent[]>("/students");
  return response.data;
};

export const deleteStudent = async (
  studentId: string
): Promise<void> => {
  await api.delete(`/students/${studentId}`);
};

export const assignStudentToClass = async (
  studentId: string,
  classId: string
) => {
  await api.post("/students/assign-to-class", { studentId, classId });
};

export const addStudent = async (newStudent: {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  profession: string;
}) => {
  const response = await api.post("/students", newStudent);
  return response.data;
};