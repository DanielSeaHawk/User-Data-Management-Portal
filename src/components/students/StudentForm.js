import React, { useEffect, useState } from "react";
import './StudentForm.css'
import {
  useAddStudentMutation,
  useGetStudentByIdQuery,
  useUpdateStudentMutation,
} from "../../store/api/StudentApi";

const StudentForm = (props) => {
  const [inputData, setInputData] = useState({
    Name: "",
    Gender: "Male",
    Age: "",
    Address: "",
  });

  const { data: stuData, isSuccess } = useGetStudentByIdQuery(props.stuId,{
    skip:!props.stuId,
    refetchOnMountOrArgChange:false
  });
  // console.log(isSuccess, stuData)
  const [addStudent, { isSuccess: isAddSucess }] = useAddStudentMutation();
  
  const [updateStudent] = useUpdateStudentMutation();
  
  useEffect(() => {
    if (isSuccess) {
      setInputData(stuData.attributes);
    }
  }, [isSuccess]);

  const nameChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, Name: e.target.value }));
  };
  const genderChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, Gender: e.target.value }));
  };
  const ageChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, Age: +e.target.value }));
  };

  const addressChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, Address: e.target.value }));
  };

  const submitHandler = () => {
    addStudent(inputData);
    setInputData({
      Name: "",
      Gender: "Male",
      Age: "",
      Address: "",
    });
  };

  const updateHandler = () => {
    updateStudent({
      id: props.stuId,
      attributes: inputData,
    });
    props.onCancel();
  };

  return (
    <>
      <tr className="studentForm">
        <td>
          <input
            onChange={nameChangeHandler}
            value={inputData.Name}
            type="text"
          />
        </td>
        <td>
          <select onChange={genderChangeHandler} value={inputData.Gender}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </td>
        <td>
          <input
            onChange={ageChangeHandler}
            value={inputData.Age}
            type="number"
          />
        </td>
        <td>
          <input
            onChange={addressChangeHandler}
            value={inputData.Address}
            type="text"
          />
        </td>
        <td>
          {props.stuId && (
            <>
              <button onClick={updateHandler}>Confirm</button>
              <button onClick={() => props.onCancel()}>Cancel</button>
            </>
          )}
          {!props.stuId && <button onClick={submitHandler}>Add Data</button>}
        </td>
      </tr>
      {/* {loading && (
        <tr>
          <td colSpan={5}>Adding...</td>
        </tr>
      )}
      {error && (
        <tr>
          <td colSpan={5}>Failed to add!</td>
        </tr>
      )} */}
    </>
  );
};

export default StudentForm;
