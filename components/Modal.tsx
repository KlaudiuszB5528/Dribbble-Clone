'use client';

import { MouseEventHandler, ReactNode, useCallback, useRef } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Modal({ children }: { children: ReactNode }) {
  const overlayRef = useRef(null);
  const wrapperRef = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.target === overlayRef.current) onDismiss();
    },
    [onDismiss, overlayRef],
  );

  return (
    <div ref={overlayRef} className="modal" onClick={handleClick}>
      <button type="button" className="absolute z-10 top-12 right-8" onClick={onDismiss}>
        <Image src="/close.svg" alt="close" width={17} height={17} />
      </button>
      <div ref={wrapperRef} className="modal_wrapper">
        {children}
      </div>
    </div>
  );
}
