import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import EmployeeRecord from "./Employee";
import axios from "axios";

jest.mock("axios");

test("renders correct header", () => {
  render(<App />);
  const headerElement = screen.getByText(/employees/i);
  expect(headerElement).toBeInTheDocument();
});

test("renders GET button correctly", () => {
  render(<App />);
  const buttonElement = screen.getByText(/GET/);
  expect(buttonElement).toBeInTheDocument();
});

test("should diplay 'fetching' status", async () => {
  render(<App />);
  fireEvent.click(screen.getByText("GET"));
  expect(await screen.findByText(/loading/i)).toBeInTheDocument();
  expect(axios.get).toHaveBeenCalledTimes(1);
});

test("should display error message if an error occured during fetch", async () => {
  axios.get.mockRejectedValue();
  render(<App />);
  fireEvent.click(screen.getByText("GET"));
  expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
});

test("should display employees after button click", async () => {
  const employees = {
    data: {
      data: [
        {
          id: 1,
          employee_name: "fedya",
          employee_age: 22,
          employee_salary: 3000,
        },
      ],
    },
  };
  axios.get.mockResolvedValue(employees);
  render(<App />);
  fireEvent.click(screen.getByText("GET"));
  expect(await screen.findByText("fedya")).toBeInTheDocument();
});

test("should delete an employee record if 'delete' button is clicked", async () => {
  const employees = {
    data: {
      data: [
        {
          id: 1,
          employee_name: "fedya",
          employee_age: 22,
          employee_salary: 3000,
        },
      ],
    },
  };
  axios.get.mockResolvedValue(employees);
  render(<App />);
  fireEvent.click(screen.getByText("GET"));
  expect(await screen.findByText("Delete")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Delete"));
  expect(screen.queryByText("fedya")).toBeNull();
});

test("should render employee record correctly", () => {
  const employee = {
    id: 1,
    employee_name: "fedya",
    employee_age: 22,
    employee_salary: 20000,
    some_key: "bar",
    onDelete: () => {},
  };
  render(<EmployeeRecord {...employee} />);
  expect(screen.getByText("fedya")).toBeInTheDocument();
  expect(screen.getByText(22)).toBeInTheDocument();
  expect(screen.getByText(20000)).toBeInTheDocument();
  expect(screen.queryByText("bar")).toBeNull();
});
