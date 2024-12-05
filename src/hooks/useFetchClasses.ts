import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setClasses } from "../redux/classesSlice";
import { fetchClasses } from "../services/classes.service";
import { ClassItem } from "../interfaces/class.interface";

const useFetchClasses = () => {
  const dispatch = useDispatch();
   const classrooms: ClassItem[] = useSelector(
    (state: RootState) => state.classrooms.classesData
  );

  const { data, isLoading, error } = useQuery<ClassItem[]>("classes", fetchClasses, {
    onSuccess: (data) => {
      if (data) {
        dispatch(setClasses(data));
      }
    },
    staleTime: Infinity,
  });

  if (isLoading) return null;
  if (error) {
    console.log("Error fetching students", error)
  }

  return data || classrooms;
};

export default useFetchClasses;
