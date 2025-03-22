'use client';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ButtonProps {
  children?: React.ReactNode;
  icon?: IconDefinition;
  ariaLabel?: string;
  isHalved?: boolean;
  isSubmit?: boolean;
  onClick?: React.MouseEventHandler;
  size?: string;
  customStyles?: string;
}

const Button = ({
  children,
  icon,
  ariaLabel,
  isHalved = false,
  onClick,
  size = '',
  isSubmit = false,
  customStyles,
}: ButtonProps) => {
  const btnSize =
    size === 'fas'
      ? 'h-6'
      : size === 'lg'
      ? 'h-32 rounded-2xl'
      : size === 'md'
      ? 'h-16 rounded-lg'
      : 'h-9 rounded-sm';

  const color =
    size === 'fas' ? 'bg-transparent text-dark' : 'bg-primary text-light';

  // This allows 2 to exist with gap-2 on the smallest screen
  const btnWidth = size === 'fas' ? 'min-w-6' : isHalved ? 'w-36' : 'w-75';

  const style = `${btnSize} ${btnWidth} ${color} cursor-pointer ${customStyles}`;

  return (
    <button
      type={isSubmit ? 'submit' : undefined}
      className={style}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <div className="flex justify-center items-center gap-2">
        {icon !== undefined ? (
          <>
            <FontAwesomeIcon
              icon={icon}
              className={size == 'fas' ? 'w-6! fill-dark' : 'h-6! fill-light'}
              fixedWidth
            />{' '}
          </>
        ) : (
          ''
        )}
        {children}
      </div>
    </button>
  );
};

export default Button;
