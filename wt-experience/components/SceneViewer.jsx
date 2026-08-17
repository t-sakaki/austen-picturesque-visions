import { useState, useEffect } from 'react';
import styles from '../styles/ux.module.css';

export default function SceneViewer({ sceneData, activeLens, onBack }) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress for the satisfying "reveal"
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

  const getLensStyles = () => {
    switch (activeLens) {
      case 'picturesque':
        return styles.picturesqueScene;
      case 'socialClass':
        return styles.socialClassScene;
      case 'psychological':
        return styles.psychologicalScene;
      default:
        return styles.defaultScene;
    }
  };

  return (
    <div className={` ${styles.viewerContainer} ${getLensStyles()}`}>
      {!isVisible ? (
        <div className={styles.loadingOverlay}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress < 100 ? progress : 100}%` }}
            />
          </div>
          <p className={styles.loadingText}>
            The landscape comes to life...
          </p>
        </div>
      ) : (
        <div className={styles.sceneContent}>
          <button onClick={onBack} className={styles.backButton}>
            ← View Another Perspective
          </button>
          <img
            src={sceneData?.imageSrc || '/placeholder.jpg'}
            alt={`${activeLens} landscape`}
            className={styles.sceneImage}
            style={{ filter: sceneData?.isPlaceholder ? 'blur(5px)' : 'none' }}
          />
          <div className={styles.caption}>{sceneData?.lensType || 'Picturesque'}</div>
        </div>
      )}
    </div>
  );
}