import { setStudents } from "../redux/studentsSlice";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { IStudent } from "../interfaces/student.interface";
import { fetchAllStudents } from "../services/students.service";


const useFetchStudents = () => {
  const dispatch = useDispatch();
  const students = useSelector((state: RootState) => state.students.studentsData);

  const { data, isLoading, error } = useQuery<IStudent[]>(
    "students",
    fetchAllStudents,
    {
      onSuccess: (data) => {
        dispatch(setStudents(data)); 
      },
      staleTime: Infinity, 
    }
  );

  return students.length ? students : data || [];
};


export default useFetchStudents;
