import { IStudent } from "./student.interface";

export interface ClassItem {
    id: string;
    className: string;
    totalPlaces: number;
    students: IStudent[]
  }
  export type NavbarProps = {
    onMenuClick: () => void;
  };
  export interface StudentsListInClassProps {
    open: boolean;
    onClose: () => void;
    classId: string;
    students: IStudent[];
  }