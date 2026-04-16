import React, { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, Mail, Phone, Edit, Trash2, Eye, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Table from '../components/Table';
import Modal from '../components/Modal';
import EmptyState from '../components/EmptyState';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';
import { useAuth } from '../contexts/AuthContext';

export default function Employees() {
  const { state, dispatch } = useData();
  const { role } = useAuth();
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [modalType, setModalType] = useState(''); // 'edit', 'view', 'delete'
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({ name: '', role: '', dept: '', email: '', phone: '', status: 'Active' });

  const isManager = role === 'admin' || role === 'hr';

  const resetForm = () => setFormData({ name: '', role: '', dept: '', email: '', phone: '', status: 'Active' });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newEmp = { ...formData, id: `EMP${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}` };
    dispatch({ type: 'ADD_EMPLOYEE', payload: newEmp });
    addToast(`${newEmp.name} has been added successfully!`, 'success');
    setIsAddOpen(false);
    resetForm();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_EMPLOYEE', payload: { ...formData, id: selectedEmp.id } });
    addToast(`${formData.name}'s profile updated successfully!`, 'success');
    setModalType('');
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_EMPLOYEE', payload: selectedEmp.id });
    addToast(`Employee record permanently deleted.`, 'error');
    setModalType('');
  };

  const openModal = (emp, type) => {
    setSelectedEmp(emp);
    setFormData(emp);
    setModalType(type);
    setActiveMenuId(null);
  };

  const filteredEmployees = state.employees.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const headers = ["Employee", "Contact Info", "Department", "Status", ...(isManager ? ["Actions"] : [])];

  const renderRow = (emp) => (
    <React.Fragment key={emp.id}>
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#66BB6A] to-[#2E7D32] flex items-center justify-center text-white font-bold shadow-md shadow-green-900/10 text-lg">
            {emp.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-gray-800">{emp.name}</p>
            <p className="text-xs text-gray-500 font-semibold mt-0.5">{emp.role}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col gap-2 text-xs">
          <span className="flex items-center text-gray-600 font-medium"><Mail className="w-3.5 h-3.5 mr-2 text-[#66BB6A]" /> {emp.email}</span>
          <span className="flex items-center text-gray-600 font-medium"><Phone className="w-3.5 h-3.5 mr-2 text-[#66BB6A]" /> {emp.phone}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="font-semibold text-gray-700 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">{emp.dept}</span>
      </td>
      <td className="px-6 py-4">
         <Badge variant={emp.status === 'Active' ? 'success' : emp.status === 'On Leave' ? 'warning' : 'default'}>
           {emp.status}
         </Badge>
      </td>
      {isManager && (
         <td className="px-6 py-4 relative">
           <button 
             onClick={() => setActiveMenuId(activeMenuId === emp.id ? null : emp.id)}
             onBlur={() => setTimeout(() => setActiveMenuId(null), 200)}
             className="p-2 text-gray-400 hover:text-[#003D1F] hover:bg-[#E8F5E9] rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#66BB6A]"
           >
             <MoreVertical className="w-5 h-5" />
           </button>
           {activeMenuId === emp.id && (
             <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="absolute right-10 top-2 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-xl z-10 overflow-hidden py-1">
               <button onClick={() => openModal(emp, 'view')} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-3"><Eye className="w-4 h-4 text-blue-500" /> View Details</button>
               <button onClick={() => openModal(emp, 'edit')} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-3"><Edit className="w-4 h-4 text-yellow-500" /> Edit Profile</button>
               <div className="h-[1px] bg-gray-100 my-1"></div>
               <button onClick={() => openModal(emp, 'delete')} className="w-full text-left px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-3"><Trash2 className="w-4 h-4" /> Delete</button>
             </motion.div>
           )}
         </td>
      )}
    </React.Fragment>
  );

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Employees Directory</h2>
          <p className="text-gray-500 font-medium text-sm mt-1">Manage staff, roles, and contacts.</p>
        </div>
        {isManager && (
          <Button onClick={() => { resetForm(); setIsAddOpen(true); }} className="pl-3 py-3"><Plus className="w-5 h-5 mr-1" /> Add Employee</Button>
        )}
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search employee by name, ID or role..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#66BB6A]/50 transition-all focus:bg-white font-medium shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="px-6 py-3.5 bg-white"><Filter className="w-4 h-4 mr-2" /> Filters</Button>
        </div>

        {filteredEmployees.length > 0 ? (
          <Table headers={headers} data={filteredEmployees} renderRow={renderRow} />
        ) : (
          <EmptyState title="No employees found" description="We couldn't find any staff matching your search criteria." />
        )}
      </motion.div>

      {/* Add / Edit Modal */}
      <Modal 
        isOpen={isAddOpen || modalType === 'edit'} 
        onClose={() => { setIsAddOpen(false); setModalType(''); }}
        title={isAddOpen ? "Add New Employee" : "Edit Employee Details"}
      >
        <form onSubmit={isAddOpen ? handleAddSubmit : handleEditSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-2"><User className="w-4 h-4" /> Full Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#66BB6A]/50 outline-none bg-gray-50 focus:bg-white transition-colors" placeholder="e.g. Rahul Verma" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-2"><Plus className="w-4 h-4" /> Role</label>
              <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#66BB6A]/50 outline-none bg-gray-50 focus:bg-white transition-colors" placeholder="e.g. Technician" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-2"><Filter className="w-4 h-4" /> Department</label>
              <select required value={formData.dept} onChange={e => setFormData({...formData, dept: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#66BB6A]/50 outline-none bg-gray-50 focus:bg-white transition-colors appearance-none">
                <option value="">Select Dept</option>
                <option value="Production">Production</option>
                <option value="Quality">Quality</option>
                <option value="Packaging">Packaging</option>
                <option value="HR">HR</option>
                <option value="Accounts">Accounts</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-2"><Mail className="w-4 h-4" /> Email Line</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#66BB6A]/50 outline-none bg-gray-50 focus:bg-white transition-colors" placeholder="user@udan.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 flex items-center gap-2"><Phone className="w-4 h-4" /> Phone No</label>
              <input required type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#66BB6A]/50 outline-none bg-gray-50 focus:bg-white transition-colors" placeholder="+91 XXXX XXXX" />
            </div>
          </div>
          <div className="pt-5 flex justify-end gap-3 border-t border-gray-100 mt-6">
            <Button type="button" variant="outline" onClick={() => { setIsAddOpen(false); setModalType(''); }}>Cancel</Button>
            <Button type="submit">{isAddOpen ? 'Save Employee' : 'Update Profile'}</Button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      <Modal isOpen={modalType === 'view'} onClose={() => setModalType('')} title="Comprehensive File">
        {selectedEmp && (
          <div className="space-y-6 pb-2">
            <div className="flex items-center gap-5 bg-[#E8F5E9] p-5 rounded-2xl border border-[#66BB6A]/30 shadow-sm relative overflow-hidden">
               <div className="absolute right-0 top-0 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
               <div className="w-20 h-20 rounded-full bg-[#003D1F] flex items-center justify-center text-white text-3xl font-bold shadow-lg border-2 border-[#66BB6A] z-10">
                 {selectedEmp.name.charAt(0)}
               </div>
               <div className="z-10">
                  <h3 className="text-2xl font-bold text-[#003D1F]">{selectedEmp.name}</h3>
                  <p className="text-[#2E7D32] font-bold text-sm tracking-wide bg-white/50 px-2 py-0.5 rounded inline-block mt-1">{selectedEmp.role}</p>
               </div>
               <div className="ml-auto z-10 self-start">
                 <Badge variant={selectedEmp.status === 'Active' ? 'success' : 'default'} className="shadow-sm">{selectedEmp.status}</Badge>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 p-2">
               <div className="border-b border-gray-100 pb-3"><p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">Employee ID</p><p className="font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded inline-block">{selectedEmp.id}</p></div>
               <div className="border-b border-gray-100 pb-3"><p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">Department</p><p className="font-bold text-gray-800">{selectedEmp.dept}</p></div>
               <div className="border-b border-gray-100 pb-3"><p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">Email Address</p><p className="font-bold text-gray-800 flex items-center"><Mail className="w-4 h-4 mr-1.5 text-gray-400"/> {selectedEmp.email}</p></div>
               <div className="border-b border-gray-100 pb-3"><p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">Contact Phone</p><p className="font-bold text-gray-800 flex items-center"><Phone className="w-4 h-4 mr-1.5 text-gray-400"/> {selectedEmp.phone}</p></div>
            </div>
            <div className="pt-4 flex justify-end">
               <Button onClick={() => setModalType('')}>Done</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={modalType === 'delete'} onClose={() => setModalType('')} title="Confirm Revocation">
        <div className="bg-red-50 p-4 rounded-xl border border-red-100 mb-6 flex gap-4 items-start">
           <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
             <Trash2 className="w-5 h-5 text-red-600" />
           </div>
           <div>
             <h4 className="font-bold text-red-800 mb-1">Delete {selectedEmp?.name}?</h4>
             <p className="text-red-600 text-sm font-medium">This will permanently remove the employee from the corporate registry. This action cannot be undone.</p>
           </div>
        </div>
        <div className="flex justify-end gap-3 mt-2">
          <Button variant="outline" onClick={() => setModalType('')}>Keep Employee</Button>
          <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-100 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md">Yes, Delete Record</button>
        </div>
      </Modal>
    </div>
  );
}
