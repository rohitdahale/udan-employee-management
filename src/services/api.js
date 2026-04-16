const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock database
let mockDB = {
  employees: [
    { id: 'EMP001', name: 'Rajesh Kumar', role: 'Production Manager', dept: 'Production', email: 'rajesh@udan.com', phone: '+91 98765 43210', status: 'Active', avatar: null, joinDate: '2020-01-15' },
    { id: 'EMP002', name: 'Amit Sharma', role: 'Quality Analyst', dept: 'Quality', email: 'amit@udan.com', phone: '+91 98765 43211', status: 'Active', avatar: null, joinDate: '2021-03-10' },
    { id: 'EMP003', name: 'Priya Singh', role: 'HR Executive', dept: 'HR', email: 'priya@udan.com', phone: '+91 98765 43212', status: 'On Leave', avatar: null, joinDate: '2022-06-01' },
    { id: 'EMP004', name: 'Vikram Patel', role: 'Machine Operator', dept: 'Production', email: 'vikram@udan.com', phone: '+91 98765 43213', status: 'Active', avatar: null, joinDate: '2023-01-20' },
    { id: 'EMP005', name: 'Neha Gupta', role: 'Accountant', dept: 'Accounts', email: 'neha@udan.com', phone: '+91 98765 43214', status: 'Inactive', avatar: null, joinDate: '2019-11-05' },
    { id: 'EMP006', name: 'Sanjay Mishra', role: 'Technician', dept: 'Maintenance', email: 'sanjay@udan.com', phone: '+91 98765 43215', status: 'Active', avatar: null, joinDate: '2023-09-15' },
    { id: 'EMP007', name: 'Kavita Iyer', role: 'Sales Lead', dept: 'Sales', email: 'kavita@udan.com', phone: '+91 98765 43216', status: 'Active', avatar: null, joinDate: '2023-10-01' },
  ],
  leaves: [
    { id: 'L001', empId: 'EMP003', empName: 'Priya Singh', type: 'Sick Leave', startDate: '2023-11-01', endDate: '2023-11-03', status: 'Approved', reason: 'Viral Fever', comments: [] },
    { id: 'L002', empId: 'EMP004', empName: 'Vikram Patel', type: 'Casual Leave', startDate: '2023-11-10', endDate: '2023-11-12', status: 'Pending', reason: 'Family Function', comments: [] },
  ],
  attendance: [
    { date: '2023-10-18', present: 238, absent: 10, late: 2 },
    { date: '2023-10-17', present: 240, absent: 8, late: 2 },
  ],
  notices: [
    { id: 1, title: 'Annual Quality Audit Update', date: 'Oct 24, 2023', type: 'Important' },
    { id: 2, title: 'Shift Timings Updated for Winter', date: 'Oct 22, 2023', type: 'General' },
    { id: 3, title: 'Diwali Bonus Announcement', date: 'Oct 18, 2023', type: 'Good News' },
  ]
};

// Core Fetch Wrapper
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const USE_MOCK = import.meta.env.VITE_ENABLE_MOCK_FALLBACK === 'true';

async function fetchClient(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      // Backend returned an error response (4xx, 5xx)
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      const error = new Error(errorData.message || 'API request failed');
      error.status = response.status;
      error.data = errorData;
      throw error; // Let the caller or interceptor catch this
    }

    return await response.json();
  } catch (error) {
    // If it's a structural network failure, handle fallback
    if (error.name === 'TypeError' || error.message === 'Failed to fetch') {
      if (USE_MOCK) {
        console.warn(`Backend unreachable for ${endpoint}, falling back to mock data...`);
        return null; // Signals the caller to use mock bypass
      }
    }
    // Re-throw genuine backend errors
    throw error;
  }
}

// Fallback simulator
const fallbackDelay = async (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Live + Fallback API methods
export const api = {
  // Auth API
  login: async (credentials) => {
    try {
      const resp = await fetchClient('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
      if (resp) return resp; // real data
      throw new Error("Trigger fallback");
    } catch(err) {
      if (err.status) throw err; // Real backend 400/401 error
      await fallbackDelay(1000);
      
      // Mock validation
      if(credentials.password !== 'password') {
         const mockErr = new Error('Invalid credentials'); mockErr.status = 401; throw mockErr;
      }
      
      // Mock Login
      let role = 'employee';
      if(credentials.email?.includes('admin')) role = 'admin';
      else if (credentials.email?.includes('hr')) role = 'hr';
      
      return {
        token: `mock-jwt-token-${role}`,
        user: {
          id: role === 'admin' ? 'EMP001' : role === 'hr' ? 'EMP003' : 'EMP042',
          name: role === 'admin' ? 'Admin Manager' : role === 'hr' ? 'HR Director' : 'Rohit Sharma',
          role: role
        }
      };
    }
  },

  getCurrentUser: async () => {
    try {
      const resp = await fetchClient('/auth/me');
      if (resp) return resp;
      throw new Error("Trigger fallback");
    } catch (err) {
      if (err.status) throw err;
      await fallbackDelay();
      const token = localStorage.getItem('token');
      if(!token) { const e = new Error('Not auth'); e.status = 401; throw e; }
      const role = token.split('-')[2] || 'employee';
      return {
        user: {
          id: role === 'admin' ? 'EMP001' : role === 'hr' ? 'EMP003' : 'EMP042',
          name: role === 'admin' ? 'Admin Manager' : role === 'hr' ? 'HR Director' : 'Rohit Sharma',
          role: role
        }
      };
    }
  },

  // Employees API
  getEmployees: async () => {
    try {
      const resp = await fetchClient('/employees');
      if (resp) return resp;
      throw new Error("Trigger fallback");
    } catch(err) {
      if(err.status) throw err;
      await fallbackDelay();
      return { data: [...mockDB.employees] };
    }
  },
  createEmployee: async (employeeData) => {
    try {
      const resp = await fetchClient('/employees', { method: 'POST', body: JSON.stringify(employeeData) });
      if (resp) return resp;
      throw new Error("Trigger fallback");
    } catch(err) {
      if(err.status) throw err;
      await fallbackDelay();
      const newEmployee = { ...employeeData, id: `EMP${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}` };
      mockDB.employees = [newEmployee, ...mockDB.employees];
      return { data: newEmployee };
    }
  },
  updateEmployee: async (id, updates) => {
    try {
      const resp = await fetchClient(`/employees/${id}`, { method: 'PUT', body: JSON.stringify(updates) });
      if (resp) return resp;
      throw new Error("Trigger fallback");
    } catch(err) {
      if(err.status) throw err;
      await fallbackDelay();
      mockDB.employees = mockDB.employees.map(emp => emp.id === id ? { ...emp, ...updates } : emp);
      return { data: mockDB.employees.find(e => e.id === id) };
    }
  },
  deleteEmployee: async (id) => {
    try {
      const resp = await fetchClient(`/employees/${id}`, { method: 'DELETE' });
      if (resp) return resp;
      throw new Error("Trigger fallback");
    } catch(err) {
      if(err.status) throw err;
      await fallbackDelay();
      mockDB.employees = mockDB.employees.filter(emp => emp.id !== id);
      return { success: true };
    }
  },
  
  // Leaves API
  getLeaves: async () => {
    try {
      const resp = await fetchClient('/leaves');
      if (resp) return resp;
      throw new Error("Trigger fallback");
    } catch(err) {
      if(err.status) throw err;
      await fallbackDelay();
      return { data: [...mockDB.leaves] };
    }
  },
  createLeave: async (leaveData) => {
    try {
      const resp = await fetchClient('/leaves', { method: 'POST', body: JSON.stringify(leaveData) });
      if (resp) return resp;
      throw new Error("Trigger fallback");
    } catch(err) {
      if(err.status) throw err;
      await fallbackDelay();
      const newLeave = { ...leaveData, id: `L${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`, comments: [] };
      mockDB.leaves = [newLeave, ...mockDB.leaves];
      return { data: newLeave };
    }
  },
  updateLeave: async (id, updates) => {
    try {
      const resp = await fetchClient(`/leaves/${id}`, { method: 'PUT', body: JSON.stringify(updates) });
      if (resp) return resp;
      throw new Error("Trigger fallback");
    } catch(err) {
      if(err.status) throw err;
      await fallbackDelay();
      mockDB.leaves = mockDB.leaves.map(l => l.id === id ? { ...l, ...updates } : l);
      return { data: mockDB.leaves.find(l => l.id === id) };
    }
  },

  // Attendance API
  getAttendance: async () => {
    try {
      const resp = await fetchClient('/attendance');
      if (resp) return resp;
      throw new Error("Trigger fallback");
    } catch(err) {
      if(err.status) throw err;
      await fallbackDelay();
      return { data: [...mockDB.attendance] };
    }
  },

  // Notices API
  getNotices: async () => {
    try {
      const resp = await fetchClient('/notices');
      if (resp) return resp;
      throw new Error("Trigger fallback");
    } catch(err) {
      if(err.status) throw err;
      await fallbackDelay();
      return { data: [...mockDB.notices] };
    }
  }
};
