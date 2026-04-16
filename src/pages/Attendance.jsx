import React, { useState } from 'react';
import { Calendar, CheckCircle2, XCircle, AlertCircle, CalendarClock, UserCheck, UserX, Loader2, Download, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Table from '../components/Table';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export default function Attendance() {
  const { state, isLoading } = useData();
  const { role } = useAuth();
  const { addToast } = useToast();
  
  const [markedToday, setMarkedToday] = useState(false);

  const isManager = role === 'admin' || role === 'hr';

  const markAttendance = (status) => {
    setMarkedToday(true);
    addToast(`You have marked yourself as ${status.toUpperCase()} today.`, status === 'present' ? 'success' : 'warning');
  };

  const attendanceLogHeaders = ["Date", "Shift", "Status", "In Time", "Out Time", "Overtime", "Notes"];
  
  // Dummy data specifically for the logged in user
  const personalLogs = [
    { date: 'Oct 18, 2023', shift: 'Shift A', status: 'Present', time: '07:55 AM', outTime: '04:15 PM', overtime: '15m', notes: 'On Time' },
    { date: 'Oct 17, 2023', shift: 'Shift A', status: 'Present', time: '08:02 AM', outTime: '05:30 PM', overtime: '1h 30m', notes: 'Grace Period' },
    { date: 'Oct 16, 2023', shift: 'Shift A', status: 'Late', time: '08:45 AM', outTime: '04:00 PM', overtime: '0m', notes: 'Traffic' },
    { date: 'Oct 14, 2023', shift: 'Shift B', status: 'Absent', time: '--', outTime: '--', overtime: '--', notes: 'Sick Leave applied' },
  ];

  const exportCSV = () => {
    const headers = attendanceLogHeaders.join(",");
    const rows = personalLogs.map(log => 
      `"${log.date}","${log.shift}","${log.status}","${log.time}","${log.outTime}","${log.overtime}","${log.notes}"`
    ).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance_log.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
    
    addToast("CSV Export downloaded successfully!", "success");
  };

  const renderLog = (log) => (
    <React.Fragment key={log.date}>
       <td className="px-6 py-4 font-semibold text-gray-800">{log.date}</td>
       <td className="px-6 py-4 text-gray-500 font-medium">{log.shift}</td>
       <td className="px-6 py-4">
         <Badge variant={log.status === 'Present' ? 'success' : log.status === 'Late' ? 'warning' : 'danger'}>{log.status}</Badge>
       </td>
       <td className="px-6 py-4 font-bold text-gray-700">{log.time}</td>
       <td className="px-6 py-4 font-bold text-gray-700">{log.outTime}</td>
       <td className="px-6 py-4">
         {log.overtime !== '0m' && log.overtime !== '--' ? (
           <span className="text-orange-600 font-bold bg-orange-50 px-2 py-1 rounded">{log.overtime}</span>
         ) : (
           <span className="text-gray-400 font-medium">{log.overtime}</span>
         )}
       </td>
       <td className="px-6 py-4 text-sm text-gray-500 italic">{log.notes}</td>
    </React.Fragment>
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-40 bg-gray-200 rounded-3xl animate-pulse" />
          <div className="h-40 bg-gray-200 rounded-3xl animate-pulse" />
          <div className="md:col-span-3 h-24 bg-gray-200 rounded-xl animate-pulse border border-gray-100" />
        </div>
        <div className="glass-panel p-6 rounded-3xl h-[400px] flex items-center justify-center animate-pulse border border-gray-100">
           <Loader2 className="w-8 h-8 text-[#2E7D32] animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Attendance & Shifts</h2>
        <p className="text-gray-500 font-medium text-sm mt-1">Track check-ins, logs, and mark daily availability.</p>
      </div>
      
      {/* Daily Actions for Employee OR General Metrics for Manager */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6 rounded-3xl md:col-span-2 border border-[#66BB6A]/30 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-8 w-full h-full pointer-events-none overflow-hidden">
             <CalendarClock className="w-64 h-64 text-[#66BB6A]/10 absolute -right-10 -top-10 scale-150 transform rotate-12" />
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Today's Shift</h3>
              <p className="font-bold text-[#003D1F] bg-[#E8F5E9] inline-block px-3 py-1 rounded-lg">Shift A (08:00 AM - 04:00 PM)</p>
              <p className="text-sm text-gray-500 font-medium mt-3">October 18, 2023</p>
            </div>
            
            <div className="flex gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
               {markedToday ? (
                 <div className="px-6 py-3 bg-green-50 text-green-700 font-bold rounded-xl border border-green-100 flex items-center gap-2">
                   <CheckCircle2 className="w-5 h-5" /> Attendance Recorded
                 </div>
               ) : (
                 <>
                   <Button onClick={() => markAttendance('present')} className="bg-[#2E7D32]"><CheckCircle2 className="w-4 h-4 mr-2" /> Mark Present</Button>
                   <Button onClick={() => markAttendance('absent')} variant="outline" className="border-red-200 text-red-600 hover:bg-red-50"><UserX className="w-4 h-4 mr-2" /> Mark Absent</Button>
                 </>
               )}
            </div>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-6 rounded-3xl flex flex-col items-center justify-center border border-gray-100">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">M-T-D Pulse</h3>
          <div className="w-full flex justify-between items-end border-b border-gray-100 pb-2 mb-2">
             <span className="font-bold text-gray-800">Present</span>
             <span className="font-bold text-[#2E7D32] text-xl">16 days</span>
          </div>
          <div className="w-full flex justify-between items-end border-b border-gray-100 pb-2 mb-2">
             <span className="font-bold text-gray-800">Late</span>
             <span className="font-bold text-yellow-600 text-xl">01 days</span>
          </div>
          <div className="w-full flex justify-between items-end">
             <span className="font-bold text-gray-800">Absent</span>
             <span className="font-bold text-red-600 text-xl">01 days</span>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="glass-panel p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between bg-orange-50/30">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
             <Clock className="w-6 h-6" />
           </div>
           <div>
             <h3 className="text-lg font-bold text-gray-800 tracking-tight">Overtime Tracked</h3>
             <p className="text-sm text-gray-500 font-medium">Total accumulated overtime for the current cycle</p>
           </div>
        </div>
        <div className="text-right">
           <p className="text-3xl font-black text-orange-600">12h 45m</p>
           <p className="text-xs text-orange-800/60 font-bold uppercase tracking-wider mt-1">+ ₹3,400 Estimated</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-panel p-6 rounded-3xl border border-gray-100 shadow-sm mt-8">
         <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">My Monthly Logs</h3>
            <Button variant="outline" className="py-2 px-4 shadow-none bg-white" onClick={exportCSV}>
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
         </div>
         <Table headers={attendanceLogHeaders} data={personalLogs} renderRow={renderLog} />
      </motion.div>
    </div>
  );
}
