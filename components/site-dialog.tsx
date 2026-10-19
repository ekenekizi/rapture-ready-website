"use client";

import {
  useEffect,
  useRef,
  type KeyboardEventHandler,
  type ReactNode,
} from "react";

type SiteDialogProps = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  className?: string;
  onKeyDown?: KeyboardEventHandler<HTMLDialogElement>;
};

export function SiteDialog({
  open,
  onClose,
  labelledBy,
  children,
  className = "",
  onKeyDown,
}: SiteDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;

    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onCancel={onClose}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose();
      }}
      className={`fixed inset-0 m-auto max-h-[95dvh] w-[calc(100%_-_24px)] overflow-y-auto border-0 bg-ivory p-5 text-navy shadow-2xl backdrop:bg-navy/85 md:p-7 ${className}`}
    >
      {children}
    </dialog>
  );
}
