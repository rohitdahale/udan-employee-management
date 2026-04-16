import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarRange, Check, X, ClipboardList } from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export default function Leaves() {
  const { state, dispatch } = useData();
  const { user, role } = useAuth();
  const { addToast } = useToast();
  
  const [activeTab, setActiveTab] = useState('my_leaves'); // 'my_leaves', 'approvals'
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [formData, setFormData] = useState({ type: 'Casual Leave', startDate: '', endDate: '', reason: '' });

  const isManager = role === 'admin' || role === 'hr';

  // Filters for DataContext based on Tab/Role
  const myLeaves = state.leaves.filter(l => l.empId === user?.id);
  const pendingApprovals = state.leaves.filter(l => l.status === 'Pending');

  const handleApplySubmit = (e) => {
    e.preventDefault();
    const newLeave = {
      id: `L${String(Math.floor(Math.random() * 900) + 100)}`,
      empId: user?.id,
      empName: user?.name,
      ...formData,
      status: 'Pending'
    };
    dispatch({ type: 'ADD_LEAVE', payload: newLeave });
    addToast('Leave request submitted and pending approval!', 'success');
    setIsApplyModalOpen(false);
    setFormData({ type: 'Casual Leave', startDate: '', endDate: '', reason: '' });
  };

  const handleAction = (leave, status) => {
    dispatch({ type: 'UPDATE_LEAVE', payload: { ...leave, status } });
    addToast(`Leave request ${status.toLowerCase()}!`, status === 'Approved' ? 'success' : 'error');
  };

  const myLeavesHeaders = ["Leave Type", "Duration", "Applied On", "Status", "Reason"];
  const approvalsHeaders = ["Employee", "Leave Type", "Duration", "Reason", "Action"];

  const renderMyLeaveRow = (leave) => (
    <React.Fragment key={leave.id}>
      <td className="px-6 py-4 font-bold text-gray-800">{leave.type}</td>
      <td className="px-6 py-4 text-gray-600 font-medium">{leave.startDate} <span className="text-gray-400 mx-1">to</span> {leave.endDate}</td>
      <td className="px-6 py-4 text-gray-500 font-medium">Oct 16, 2023</td>
      <td className="px-6 py-4">
        <Badge variant={leave.status === 'Approved' ? 'success' : leave.status === 'Pending' ? 'warning' : 'danger'}>{leave.status}</Badge>
      </td>
      <td className="px-6 py-4 text-gray-500 italic max-w-xs truncate">{leave.reason}</td>
    </React.Fragment>
  );

  const renderApprovalRow = (leave) => (
    <React.Fragment key={leave.id}>
      <td className="px-6 py-4 font-bold text-[#003D1F]">{leave.empName} <span className="block text-xs text-gray-400 font-medium">ID: {leave.empId}</span></td>
      <td className="px-6 py-4 font-bold text-gray-800">{leave.type}</td>
      <td className="px-6 py-4 text-gray-600 font-medium">{leave.startDate} <span className="text-gray-400 mx-1">to</span> {leave.endDate}</td>
      <td className="px-6 py-4 text-gray-500 italic max-w-xs">{leave.reason}</td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
           <button onClick={() => handleAction(leave, 'Approved')} className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors focus:ring-2 focus:ring-green-300"><Check className="w-5 h-5"/></button>
           <button onClick={() => handleAction(leave, 'Rejected')} className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors focus:ring-2 focus:ring-red-300"><X className="w-5 h-5"/></button>
        </div>
      </td>
    </React.Fragment>
  );

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Leave Management</h2>
          <p className="text-gray-500 font-medium text-sm mt-1">Apply for time off and track request status.</p>
        </div>
        <Button onClick={() => setIsApplyModalOpen(true)} className="py-3 px-5"><CalendarRange className="w-5 h-5 mr-2" /> Apply for Leave</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-5 rounded-2xl border border-green-100 shadow-sm flex items-center justify-between bg-green-50/50">
           <div><p className="text-sm font-bold text-green-800 mb-1">Casual Leave (CL)</p><h3 className="text-3xl font-black text-green-700">08<span className="text-sm font-medium text-green-600/60 ml-2">/ 12 remaining</span></h3></div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-blue-100 shadow-sm flex items-center justify-between bg-blue-50/50">
           <div><p className="text-sm font-bold text-blue-800 mb-1">Sick Leave (SL)</p><h3 className="text-3xl font-black text-blue-700">05<span className="text-sm font-medium text-blue-600/60 ml-2">/ 07 remaining</span></h3></div>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-purple-100 shadow-sm flex items-center justify-between bg-purple-50/50">
           <div><p className="text-sm font-bold text-purple-800 mb-1">Earned Leave (EL)</p><h3 className="text-3xl font-black text-purple-700">14<span className="text-sm font-medium text-purple-600/60 ml-2">/ 20 remaining</span></h3></div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-4 md:p-6 rounded-3xl shadow-sm border border-gray-100 bg-white">
        
        {isManager && (
          <div className="flex gap-4 border-b border-gray-100 mb-6 px-2">
            <button 
              onClick={() => setActiveTab('my_leaves')}
              className={`py-3 px-4 font-bold transition-all relative ${activeTab === 'my_leaves' ? 'text-[#003D1F]' : 'text-gray-400 hover:text-gray-600'}`}
            >
               My Leaves
               {activeTab === 'my_leaves' && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 w-full h-1 bg-[#66BB6A] rounded-t-full" />}
            </button>
            <button 
              onClick={() => setActiveTab('approvals')}
              className={`py-3 px-4 font-bold transition-all relative flex items-center gap-2 ${activeTab === 'approvals' ? 'text-[#003D1F]' : 'text-gray-400 hover:text-gray-600'}`}
            >
               Team Approvals
               {pendingApprovals.length > 0 && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{pendingApprovals.length}</span>}
               {activeTab === 'approvals' && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 w-full h-1 bg-[#66BB6A] rounded-t-full" />}
            </button>
          </div>
        )}

        <div className="pt-2">
          {activeTab === 'my_leaves' ? (
            myLeaves.length > 0 ? (
              <Table headers={myLeavesHeaders} data={myLeaves} renderRow={renderMyLeaveRow} />
            ) : (
              <div className="text-center p-10 bg-gray-50 border border-dashed rounded-xl border-gray-200 mt-4">
                 <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                 <p className="font-semibold text-gray-600">No leave requests found.</p>
              </div>
            )
          ) : (
            pendingApprovals.length > 0 ? (
               <Table headers={approvalsHeaders} data={pendingApprovals} renderRow={renderApprovalRow} />
            ) : (
              <div className="text-center p-10 bg-green-50/50 border border-dashed border-green-100 rounded-xl mt-4">
                 <Check className="w-12 h-12 text-green-300 mx-auto mb-3" />
                 <p className="font-semibold text-green-700">All caught up! No pending approvals.</p>
              </div>
            )
          )}
        </div>
      </motion.div>

      <Modal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} title="Apply for Leave">
         <form onSubmit={handleApplySubmit} className="space-y-5">
           <div>
             <label className="block text-sm font-bold text-gray-700 mb-1.5">Leave Type</label>
             <select required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#66BB6A]/50 outline-none bg-gray-50 focus:bg-white appearance-none">
               <option value="Casual Leave">Casual Leave (CL)</option>
               <option value="Sick Leave">Sick Leave (SL)</option>
               <option value="Earned Leave">Earned Leave (EL)</option>
             </select>
           </div>
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-bold text-gray-700 mb-1.5">Start Date</label>
               <input required type="date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#66BB6A]/50 outline-none bg-gray-50 focus:bg-white text-gray-800" />
             </div>
             <div>
               <label className="block text-sm font-bold text-gray-700 mb-1.5">End Date</label>
               <input required type="date" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#66BB6A]/50 outline-none bg-gray-50 focus:bg-white text-gray-800" />
             </div>
           </div>
           <div>
             <label className="block text-sm font-bold text-gray-700 mb-1.5">Reason for Leave</label>
             <textarea required rows="3" value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#66BB6A]/50 outline-none bg-gray-50 focus:bg-white" placeholder="Briefly explain the reason..." />
           </div>
           <div className="pt-4 flex justify-end gap-3 mt-6 border-t border-gray-100 pt-6">
             <Button type="button" variant="outline" onClick={() => setIsApplyModalOpen(false)}>Cancel</Button>
             <Button type="submit">Submit Request</Button>
           </div>
         </form>
      </Modal>
    </div>
  );
}
