import React, {
  ForwardedRef,
  forwardRef,
  HTMLProps,
  PropsWithChildren,
} from 'react';
import { Close } from '../icons';
import { metamorphous } from '@/ui/fonts';

type ModalProps = PropsWithChildren &
  HTMLProps<HTMLDialogElement> & {
    title: string;
  };

function Modal(
  { title, children, className, ...attributes }: ModalProps,
  ref: ForwardedRef<HTMLDialogElement>,
) {
  return (
    <dialog
      ref={ref}
      className='left-1/2 top-1/2 w-full max-w-6xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-gray-900 p-6 pb-12 text-white shadow-lg backdrop:bg-black/60'
      {...attributes}
    >
      <h3 className={`text-center text-2xl ${metamorphous.className}`}>
        {title}
      </h3>
      <form method='dialog'>
        <button
          type='submit'
          className='absolute right-4 top-4 aspect-square rounded-full border border-gray-400 p-3'
        >
          <Close className='h-[14px] w-[14px]' />
        </button>
      </form>
      <div className={className}>{children}</div>
    </dialog>
  );
}

export default forwardRef(Modal);
