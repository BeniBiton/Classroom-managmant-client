import React, { ReactNode } from "react";
import useFetchClasses from "../../../../hooks/useFetchClasses";
import useFetchStudents from "../../../../hooks/useFetchStudents";

interface FetchLayoutProps {
  children?: ReactNode;
}

const FetchLayout: React.FC<FetchLayoutProps> = ({ children }) => {
  useFetchClasses();
  useFetchStudents();


  return <>{children}</>; 
};

export default FetchLayout;
