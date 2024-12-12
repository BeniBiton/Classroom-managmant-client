import { useQuery } from "react-query";
import { RootState } from "../redux/store";
import { setStudents } from "../redux/studentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { IStudent } from "../interfaces/student.interface";
import { fetchAllStudents } from "../services/students.service";


const useFetchStudents = () => {
  const dispatch = useDispatch();
  const students = useSelector((state: RootState) => state.students.studentsData);

  const { data, error, isLoading } = useQuery<IStudent[]>(
    "students",
    fetchAllStudents,
    {
      onSuccess: (data) => {
        dispatch(setStudents(data));
      },
      staleTime: Infinity,
    }
  );
  if (isLoading) return null;
  if (error) {
    console.log("Error fetching students");

  }

  return students || data || [];
};


export default useFetchStudents;
