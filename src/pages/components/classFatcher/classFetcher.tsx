import React, { ReactNode } from "react";
import { useFetchClasses } from "../../../hooks/useFetchClasses";

interface ClassFetcherProps {
  children?: ReactNode;
}

const ClassFetcher: React.FC<ClassFetcherProps> = ({ children }) => {
  useFetchClasses(); 

  return <>{children}</>; 
};

export default ClassFetcher;
