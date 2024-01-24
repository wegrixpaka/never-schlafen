import React from 'react';
import { Toast, ToastToggle } from 'flowbite-react';
import PropTypes from 'prop-types';

function Toasty({
  children, title, text, show,
}) {
  return (
    <Toast className={`fixed bottom-5 right-5 transition-opacity ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex items-start">
        {children && (
        <div
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-900 dark:text-cyan-300"
        >
          {children}
        </div>
        )}
        <div className="ml-3 text-sm font-normal">
          <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{title}</span>
          <div className="mb-2 text-sm font-normal">{text}</div>
        </div>
        <ToastToggle />
      </div>
    </Toast>
  );
}

Toasty.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  text: PropTypes.string,
  show: PropTypes.bool,
};

export default Toasty;
