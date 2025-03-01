'use client';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ButtonProps {
  size?: string;
  isHalved?: boolean;
  icon?: IconDefinition;
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
}

const Button = ({
  size = '',
  isHalved = false,
  icon = undefined,
  children,
  onClick,
}: ButtonProps) => {
  const btnSize =
    size === 'lg'
      ? 'h-32 rounded-2xl'
      : size === 'md'
      ? 'h-16 rounded-lg'
      : 'h-9 rounded-sm';
  const btnWidth = isHalved ? 'w-37.5' : 'w-75';
  const style = `${btnSize} ${btnWidth} bg-primary text-light cursor-pointer`;
  return (
    <button className={style} onClick={onClick}>
      <div className="flex justify-center items-center gap-2">
        {icon !== undefined ? (
          <>
            <FontAwesomeIcon
              icon={icon}
              className="h-6! fill-light"
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
