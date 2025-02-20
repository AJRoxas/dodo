import Image from 'next/image';

export default function Logo({ hasTitle = false, isLight = false }) {
  const logo = hasTitle ? '/dodo.main.title.svg' : '/dodo.main.svg';
  const styles = [
    isLight ? 'bg-light' : 'bg-primary',
    '[mask-composite: subtract]',
    'dark:brightness-0',
    'dark:invert'
  ].join(' ');

  return (
    <Image src={logo} alt="Dodo logo" priority width={300} height={60} className={styles}/>
  );
}
