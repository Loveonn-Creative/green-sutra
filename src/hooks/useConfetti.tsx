import { useState, useCallback } from 'react';

interface ConfettiHook {
  showConfetti: boolean;
  triggerConfetti: (message?: string) => void;
  confettiMessage: string;
  hideConfetti: () => void;
}

export const useConfetti = (): ConfettiHook => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiMessage, setConfettiMessage] = useState('');

  const triggerConfetti = useCallback((message: string = 'Great job! 🎉') => {
    setConfettiMessage(message);
    setShowConfetti(true);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  }, []);

  const hideConfetti = useCallback(() => {
    setShowConfetti(false);
  }, []);

  return {
    showConfetti,
    triggerConfetti,
    confettiMessage,
    hideConfetti
  };
};