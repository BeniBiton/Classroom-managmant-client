import { useQuery } from "react-query";
import { RootState } from "../redux/store";
import { setClasses } from "../redux/classesSlice";
import { useDispatch, useSelector } from "react-redux";
import { ClassItem } from "../interfaces/class.interface";
import { fetchClasses } from "../services/classes.service";

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
    console.log("Error fetching classes")
  }

  return data || classrooms || [];
};

export default useFetchClasses;
