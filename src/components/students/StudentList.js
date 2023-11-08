import React from "react";
import Student from "./Student";
import StudentForm from "./StudentForm";
import { useGetStudentsQuery } from "../../store/api/StudentApi";
import './StudentForm.css'

const StudentList = (props) => {
  const { data: stus, isSuccess } = useGetStudentsQuery();
  console.log(stus);
  return (
    <table>
      <caption>Student List</caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {isSuccess && stus.map(stu => <Student key={stu.id} stu={stu} />)}
      </tbody>
      <tfoot>
        <StudentForm />
      </tfoot>
    </table>
  );
};

export default StudentList;
