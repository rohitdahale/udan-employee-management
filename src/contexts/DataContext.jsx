import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const DataContext = createContext();

const initialData = {
  employees: [],
  leaves: [],
  attendance: [],
  notices: [],
};

function dataReducer(state, action) {
  switch (action.type) {
    case 'SET_INITIAL_DATA':
      return { ...state, ...action.payload };
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
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const [state, dispatch] = useReducer(dataReducer, initialData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!isAuthenticated) return;
      setIsLoading(true);
      try {
        const [empRes, leaveRes, attRes, notRes] = await Promise.all([
          api.getEmployees(),
          api.getLeaves(),
          api.getAttendance(),
          api.getNotices()
        ]);
        
        dispatch({ 
          type: 'SET_INITIAL_DATA', 
          payload: {
            employees: empRes?.data || [],
            leaves: leaveRes?.data || [],
            attendance: attRes?.data || [],
            notices: notRes?.data || []
          }
        });
      } catch (error) {
        console.error("Failed to load initial data", error);
        addToast("Failed to sync backend data. Some information may be missing.", "error");
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, [isAuthenticated, addToast]);

  return (
    <DataContext.Provider value={{ state, dispatch, isLoading }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
