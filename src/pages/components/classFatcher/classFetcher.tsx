import React, { ReactNode } from "react";
import useFetchClasses from "../../../hooks/useFetchClasses";
import useFetchStudents from "../../../hooks/useFetchStudents";

interface ClassFetcherProps {
  children?: ReactNode;
}

const ClassFetcher: React.FC<ClassFetcherProps> = ({ children }) => {
  useFetchClasses();
  useFetchStudents()


  return <>{children}</>; 
};

export default ClassFetcher;
