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

// Simulated fetcher
export const api = {
  // Employees API
  getEmployees: async () => {
    await delay();
    return { data: [...mockDB.employees] };
  },
  createEmployee: async (employeeData) => {
    await delay();
    const newEmployee = { ...employeeData, id: `EMP${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}` };
    mockDB.employees = [newEmployee, ...mockDB.employees];
    return { data: newEmployee };
  },
  updateEmployee: async (id, updates) => {
    await delay();
    mockDB.employees = mockDB.employees.map(emp => emp.id === id ? { ...emp, ...updates } : emp);
    return { data: mockDB.employees.find(e => e.id === id) };
  },
  deleteEmployee: async (id) => {
    await delay();
    mockDB.employees = mockDB.employees.filter(emp => emp.id !== id);
    return { success: true };
  },
  
  // Leaves API
  getLeaves: async () => {
    await delay();
    return { data: [...mockDB.leaves] };
  },
  createLeave: async (leaveData) => {
    await delay();
    const newLeave = { ...leaveData, id: `L${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`, comments: [] };
    mockDB.leaves = [newLeave, ...mockDB.leaves];
    return { data: newLeave };
  },
  updateLeave: async (id, updates) => {
    await delay();
    mockDB.leaves = mockDB.leaves.map(l => l.id === id ? { ...l, ...updates } : l);
    return { data: mockDB.leaves.find(l => l.id === id) };
  },

  // Attendance API
  getAttendance: async () => {
    await delay();
    return { data: [...mockDB.attendance] };
  },

  // Notices API
  getNotices: async () => {
    await delay();
    return { data: [...mockDB.notices] };
  },

  // General Dashboard Stats API
  getDashboardStats: async () => {
    await delay();
    return {
      data: {
        totalEmployees: mockDB.employees.length,
        presentToday: 238, // Mock metric
        onLeave: mockDB.leaves.filter(l => l.status === 'Approved').length, // Simple mock calculation
        departments: [...new Set(mockDB.employees.map(e => e.dept))].length
      }
    };
  }
};
