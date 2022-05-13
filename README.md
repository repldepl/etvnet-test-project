# Requirements

ReactJS test task

Initially, you have header with text "Employees" and button with text "GET".
On clicking the button employees list should be fetched from http://dummy.restapiexample.com/api/v1/employees
After button is clicked, it's changed to any spinner or "Loading" text.
As soon as the data is fetched, the loading indicator is changed to employees list.
If employees list couldn't be fetched, error message "Something went wrong" is displayed instead
Employees list consists of 1 employee per row.
Employee has 4 columns employee_name, employee_age, employee_salary and delete button.
When the delete button is clicked ,the employee is removed from the list.

Requirements:
1. Use axios package for data fetching. Consider success only if status === 200, otherwise display error.
2. Use async/await.
3. Use useReducer hook for state management.

# Npm scripts:

To start the project:

```bash
npm install
npm start
```

Launch unit tests:
```bash
npm test
```
