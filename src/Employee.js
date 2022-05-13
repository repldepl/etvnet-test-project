function EmployeeRecord({
  employee_name,
  employee_age,
  employee_salary,
  onDelete,
}) {
  return (
    <div className="employee-row">
      <div className="employee-col">{employee_name}</div>
      <div className="employee-col">{employee_age}</div>
      <div className="employee-col">{employee_salary}</div>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default EmployeeRecord;
