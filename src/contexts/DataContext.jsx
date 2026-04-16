import React, { createContext, useContext, useReducer } from 'react';

const DataContext = createContext();

const initialData = {
  employees: [
    { id: 'EMP001', name: 'Rajesh Kumar', role: 'Production Manager', dept: 'Production', email: 'rajesh@udan.com', phone: '+91 98765 43210', status: 'Active' },
    { id: 'EMP002', name: 'Amit Sharma', role: 'Quality Analyst', dept: 'Quality', email: 'amit@udan.com', phone: '+91 98765 43211', status: 'Active' },
    { id: 'EMP003', name: 'Priya Singh', role: 'HR Executive', dept: 'HR', email: 'priya@udan.com', phone: '+91 98765 43212', status: 'On Leave' },
    { id: 'EMP004', name: 'Vikram Patel', role: 'Machine Operator', dept: 'Production', email: 'vikram@udan.com', phone: '+91 98765 43213', status: 'Active' },
    { id: 'EMP005', name: 'Neha Gupta', role: 'Accountant', dept: 'Accounts', email: 'neha@udan.com', phone: '+91 98765 43214', status: 'Inactive' },
  ],
  leaves: [
    { id: 'L001', empId: 'EMP003', empName: 'Priya Singh', type: 'Sick Leave', startDate: '2023-11-01', endDate: '2023-11-03', status: 'Approved', reason: 'Viral Fever' },
    { id: 'L002', empId: 'EMP004', empName: 'Vikram Patel', type: 'Casual Leave', startDate: '2023-11-10', endDate: '2023-11-12', status: 'Pending', reason: 'Family Function' },
  ],
  attendance: [
    { date: '2023-10-18', present: 238, absent: 10, late: 2 },
    { date: '2023-10-17', present: 240, absent: 8, late: 2 },
  ]
};

function dataReducer(state, action) {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      return { ...state, employees: [action.payload, ...state.employees] };
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map(emp => emp.id === action.payload.id ? action.payload : emp)
      };
    case 'DELETE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.filter(emp => emp.id !== action.payload)
      };
    case 'ADD_LEAVE':
      return { ...state, leaves: [action.payload, ...state.leaves] };
    case 'UPDATE_LEAVE':
      return {
        ...state,
        leaves: state.leaves.map(leave => leave.id === action.payload.id ? action.payload : leave)
      };
    default:
      return state;
  }
}

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialData);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
