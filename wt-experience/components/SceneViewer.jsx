import { useState, useEffect } from 'react';
import styles from '../styles/ux.module.css';

const LENS_BG = {
  picturesque: 'linear-gradient(180deg, #2d2b1f 0%, #4a4234 100%)',
  socialClass: 'linear-gradient(180deg, #0d1b2a 0%, #1a365d 100%)',
  psychological: 'linear-gradient(180deg, #2b2b2b 0%, #5a3555 100%)',
};

export default function SceneViewer({ sceneData, activeLens, onBack }) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval = null;
    if (sceneData?.isPlaceholder) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsVisible(true);
            return 100;
          }
          return prev + Math.random() * 5;
        });
      }, 100);
    } else {
      setIsVisible(true);
    }
    return () => clearInterval(interval);
  }, [sceneData]);

  return (
    <div
      className={styles.viewerContainer}
      style={{ background: LENS_BG[activeLens] || LENS_BG.picturesque }}
    >
      {!isVisible ? (
        <div className={styles.loadingOverlay}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress < 100 ? progress : 100}%` }}
            />
          </div>
          <p className={styles.loadingText}>The landscape comes to life...</p>
        </div>
      ) : (
        <div className={styles.sceneContent}>
          <button onClick={onBack} className={styles.backButton}>
            ← View Another Perspective
          </button>
          <div className={styles.caption}>{sceneData?.lensType || 'Picturesque'}</div>
        </div>
      )}
    </div>
  );
}
