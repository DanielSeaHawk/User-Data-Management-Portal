import React, { useState } from "react";
import StudentForm from "../students/StudentForm";
import { useDelStudentMutation } from "../../store/api/StudentApi";

const Student = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [delStudent, {isSuccess}] = useDelStudentMutation();
  // console.log(result)
  const deleteHandler = () => {
    delStudent(props.stu.id);
  };

  const cancelEdit = () => {
    setIsEdit(false);
  };
  return (
    <>
      {(!isEdit && !isSuccess) && (
        <tr>
          <td>{props.stu.attributes.Name}</td>
          <td>{props.stu.attributes.Gender}</td>
          <td>{props.stu.attributes.Age}</td>
          <td>{props.stu.attributes.Address}</td>
          <td>
            <button onClick={deleteHandler}>Delete</button>
            <button onClick={() => setIsEdit(true)}>Edit</button>
          </td>
        </tr>
      )}

        {isSuccess && <tr colspan="5">The data has been deleted!</tr>}

      {isEdit && <StudentForm stuId={props.stu.id} onCancel={cancelEdit} />}
    </>
  );
};

export default Student;
