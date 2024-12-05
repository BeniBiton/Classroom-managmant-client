import api from "../api/api";
import { ClassItem } from "../interfaces/class.interface";
import { IStudent } from "../interfaces/student.interface";

export const fetchClasses = async (): Promise<ClassItem[]> => {
  const response = await api.get("/classes");
  return response.data;
};

export const deleteClass = async (id: string): Promise<void> => {
  await api.delete(`/classes/${id}`);
};

export const addClass = async (
  newClass: { id: string; className: string; totalPlaces: number }
) => {
  const response = await api.post("/classes", newClass);
  return response.data;
};

export const unassignStudent = async (studentId: string) => {
  const response = await api.patch(`/students/${studentId}/unassign`, { classId: null });
  return response.data;
};
export const fetchStudentsForClass = async (classId: string): Promise<IStudent[]> => {
  const response = await api.get(`/classes/${classId}/students`);
  return response.data;
};
