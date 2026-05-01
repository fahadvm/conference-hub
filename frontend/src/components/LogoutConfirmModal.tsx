import { Button } from '@/components/ui/button';
import { LogOut, X } from 'lucide-react';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutConfirmModal({ isOpen, onClose, onConfirm }: LogoutConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-background border border-gridline p-8 shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-subtletext hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-destructive/10 text-destructive flex items-center justify-center mb-4 border border-destructive/20">
            <LogOut className="w-6 h-6" />
          </div>
          <h2 className="font-heading text-2xl uppercase tracking-wide mb-2 text-foreground">
            Confirm Logout
          </h2>
          <p className="font-paragraph text-subtletext mb-8">
            Are you sure you want to log out? You will need to sign in again to access your account.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-2 border-gridline hover:border-foreground py-6 text-sm font-paragraph uppercase tracking-wider"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              variant="destructive"
              className="flex-1 py-6 text-sm font-paragraph uppercase tracking-wider"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
