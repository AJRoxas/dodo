'use client';

interface ButtonProps {
  size?: string;
  isHalved?: boolean;
  children: string;
  onClick: React.MouseEventHandler;
}

const Button = ({
  size = '',
  isHalved = false,
  children,
  onClick,
}: ButtonProps) => {
  const btnSize =
    size === 'lg'
      ? 'h-32 rounded-2xl'
      : size === 'md'
      ? 'h-16 rounded-lg'
      : 'h-9 rounded-sm';
  const btnWidth = isHalved ? 'w-[150px]' : 'w-[300px]';
  const style = `${btnSize} ${btnWidth} bg-primary text-light cursor-pointer`;
  return (
    <button className={style} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
