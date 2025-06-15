import { X, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error';
}

export function ConfirmationModal({
  isOpen,
  onClose,
  title,
  message,
  type = 'success',
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-slate-800 rounded-lg w-11/12 max-w-md p-6 shadow-xl animate-fade-in">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            {type === 'success' ? (
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-red-500" />
            )}
            <h2 className="text-lg font-semibold text-white">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white focus:outline-none"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-slate-300 mb-6">{message}</p>

        <button
          onClick={onClose}
          className={`w-full py-2 rounded-md font-medium transition-colors duration-200 ${
            type === 'success'
              ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-900'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          OK
        </button>
      </div>
    </div>
  );
}
