import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, XCircle, X } from 'lucide-react';
import { cn } from '../utils/cn';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className={cn(
                "pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-xl border backdrop-blur-md min-w-[300px]",
                toast.type === 'success' ? 'bg-green-50/95 border-green-200 text-green-900' :
                toast.type === 'error' ? 'bg-red-50/95 border-red-200 text-red-900' :
                'bg-white/95 border-gray-200 text-gray-900'
              )}
            >
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />}
              {toast.type === 'error' && <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
              {toast.type === 'info' && <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />}
              <span className="font-semibold text-sm flex-1">{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} className="text-gray-400 hover:text-gray-700 transition-colors p-1 bg-white/50 rounded-full">
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
