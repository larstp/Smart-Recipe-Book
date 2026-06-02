import { useEffect } from 'react';
import { Button } from './Button';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  action?: () => void;
  title: string;
  children: React.ReactNode;
};

export const Modal = ({
  isOpen,
  onClose,
  action,
  title,
  children,
}: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1000 p-4 flex justify-center items-center">
      <div
        className="absolute inset-0 bg-white/25 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 grid gap-4 w-full max-w-xl mx-auto p-8 rounded-2xl border border-gray-200 bg-white/90 shadow-sm"
      >
        {isOpen && (
          <>
            <div className="flex flex-wrap justify-between items-center">
              <h2 className="text-lg font-semibold">{title}</h2>
              <span
                aria-label="Close"
                onClick={onClose}
                className="justify-self-end px-2 py-1 w-fit h-fit rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200 cursor-pointer"
              >
                X
              </span>
            </div>

            <div className="grid gap-4">
              <div>{children}</div>

              {action && (
                <Button
                  aria-label="Submit"
                  type="submit"
                  onClick={action}
                  className="justify-self-end px-4! py-2! transition duration-200 cursor-pointer"
                >
                  Submit
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
