import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({ label, error, icon, rightIcon, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-dark-muted">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full px-4 py-3 rounded-xl border transition-all duration-200
            bg-white dark:bg-dark-card
            text-gray-900 dark:text-dark-text
            placeholder-gray-400 dark:placeholder-dark-muted
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            ${error
              ? 'border-red-400 focus:ring-red-400'
              : 'border-gray-200 dark:border-dark-border'
            }
            ${icon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${className}
          `}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-dark-muted">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}
