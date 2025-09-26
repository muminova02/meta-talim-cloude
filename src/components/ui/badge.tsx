// Reusable Badge component for product cards
import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  variant: 'Pro' | 'Free' | 'New';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ variant, className }) => {
  const baseClasses = 'absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold';
  
  const variantClasses = {
    Pro: 'bg-yellow-500 text-white',
    New: 'bg-green-500 text-white',
    Free: 'bg-blue-500 text-white'
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {variant}
    </div>
  );
};

export default Badge;