import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

export default function Button({ 
    children, 
    size = 'medium', 
    onClick, 
    className = '',
    type = 'button'
}: ButtonProps) {
    
    const sizeClasses = {
        small: 'px-4 py-2 text-xs',
        medium: 'px-8 py-3.5 text-sm',
        large: 'px-10 py-4 text-base'
    };

    return (
        <button 
            type={type}
            onClick={onClick}
            className={`
                group relative bg-primary text-white 
                ${sizeClasses[size]} 
                rounded-xl font-medium overflow-hidden 
                transition-all duration-300 
                hover:scale-105 hover:shadow-lg shadow-md 
                cursor-pointer
                ${className}
            `}
        >
            <span className='relative z-10 tracking-wide'>
                {children}
            </span>
            <div className='absolute inset-0 bg-gradient-to-r from-[#6B5D54] to-[#8C8277] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
        </button>
    );
}

