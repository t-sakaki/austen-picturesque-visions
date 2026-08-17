import { useState, useEffect, useRef } from 'react';
import styles from '../styles/ux.module.css';
import Image from 'next/image';

export default function LensButton({ onClick, lensName }) {
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef(null);

  const handleClick = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
      onClick();
    }, 150);
  };

  return (
    <div className={styles.buttonWrapper}>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={`${styles.lensButton} ${isPressed ? styles.pressed : ''}`}
      >
        <span className={styles.buttonText}>{lensName}</span>
      </button>
      {isPressed && (
        <div className={styles.particleGlow}>
          <Image
            src="/particles/glow.png"
            alt="particle"
            fill
            sizes="100%"
            className={styles.glowImage}
          />
        </div>
      )}
    </div>
  );
}