'use client';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ButtonProps {
  children?: React.ReactNode;
  icon?: IconDefinition;
  isHalved?: boolean;
  isSubmit?: boolean;
  onClick?: React.MouseEventHandler;
  size?: string;
}

const Button = ({
  children = undefined,
  icon = undefined,
  isHalved = false,
  onClick = undefined,
  size = '',
  isSubmit = false,
}: ButtonProps) => {
  const btnSize =
    size === 'lg'
      ? 'h-32 rounded-2xl'
      : size === 'md'
      ? 'h-16 rounded-lg'
      : 'h-9 rounded-sm';
  const color =
    size === 'fas' ? 'bg-transparent text-dark' : 'bg-primary text-light';
  const btnWidth = size === 'fas' ? 'min-w-6' : isHalved ? 'w-37.5' : 'w-75';
  const style = `${btnSize} ${btnWidth} ${color} cursor-pointer`;
  return (
    <button
      type={isSubmit ? 'submit' : undefined}
      className={style}
      onClick={onClick}
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
