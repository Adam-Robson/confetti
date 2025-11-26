import { JSX, useEffect, useRef } from 'react';
import Playlist from '@/components/playlist';

interface PlaylistDrawerProps {
  open: boolean;
  onClose: () => void;
  large: boolean;
}

export default function PlaylistDrawer({
  open, onClose, large
}: PlaylistDrawerProps
): JSX.Element | null {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Trap focus when open
  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    if (!drawer) return;
    const focusable = drawer.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    drawer.addEventListener('keydown', handleKeyDown);
    return () => {
      drawer.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={drawerRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      className={`
        fixed left-1/2
        ${large ? 'bottom-32' : 'bottom-16'}
        translate-x-[-50%] z-50
        min-w-80 max-w-lg
        bg-neutral-900/90 backdrop-blur-lg
        rounded-2xl shadow-2xl p-6
        transition-all duration-500
        ease-in-out animate-fade-in
      `}
      style={{
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
      }}
    >
      <button
        className="absolute right-4 top-4 text-gray-400 hover:text-white"
        onClick={onClose}
        aria-label="Close playlist drawer"
      >
        ×
      </button>
      <Playlist />
    </div>
  );
}
