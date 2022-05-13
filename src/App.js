import axios from "axios";
import { useReducer } from "react";
import EmployeeRecord from "./Employee";
import "./App.css";

const EMPLOYEES_ENDPOINT = "http://dummy.restapiexample.com/api/v1/employees";

const initialState = {
  isLoading: false,
  hasError: false,
  employees: [],
};

export function reducer(state, action) {
  switch (action.type) {
    case "fetching":
      return { ...initialState, isLoading: true };
    case "success":
      return { ...initialState, employees: action.payload };
    case "error":
      return { ...initialState, hasError: true };
    case "delete":
      return {
        ...initialState,
        employees: state.employees.filter(({ id }) => id !== action.payload),
      };
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchEmployees = async () => {
    dispatch({ type: "fetching" });
    try {
      const resp = await axios.get(EMPLOYEES_ENDPOINT, {
        validateStatus: (status) => status === 200,
      });
      dispatch({ type: "success", payload: resp.data.data });
    } catch (error) {
      dispatch({ type: "error" });
    }
  };
  return (
    <div className="App">
      <h1 className="App-header">Employees</h1>
      {state === initialState && (
        <button className="App-button" onClick={fetchEmployees}>
          GET
        </button>
      )}
      {state.isLoading && <div className="App-status">{"Loading"}</div>}
      {state.hasError && (
        <div className="App-error">{"Something went wrong"}</div>
      )}
      <div className="App-list">
        {state.employees.map(({ id, ...rest }) => (
          <EmployeeRecord
            key={id}
            {...rest}
            onDelete={() => dispatch({ type: "delete", payload: id })}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
