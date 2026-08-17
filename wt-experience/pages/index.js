import { useState } from 'react';
import LensButton from '../components/LensButton';
import SceneViewer from '../components/SceneViewer';
import styles from '../styles/ux.module.css';

export default function Home() {
  const [activeLens, setActiveLens] = useState(null);
  const [sceneData, setSceneData] = useState(null);

  const handleLensSelect = async (lensType) => {
    // Optimistic UI: Immediately start the animation
    setActiveLens(lensType);

    // Optional: You can call the Prompt Engine here and then the AI API
    // For now, we show a placeholder scene to hide the loading time
    const fallbackScene = {
      picturesque: '/fallback-scenes/picturesque-preview.jpg',
      socialClass: '/fallback-scenes/social-class-preview.jpg',
      psychological: '/fallback-scenes/psychological-preview.jpg',
    };

    setSceneData({
      imageSrc: fallbackScene[lensType],
      isPlaceholder: true,
      lensType: lensType,
    });
  };

  return (
    <div className={styles.mainContainer}>
      {!activeLens ? (
        <div className={styles.introScreen}>
          <h1 className={styles.mainTitle}>Picturesque Visions</h1>
          <p className={styles.description}>
            Embark on a journey through Jane Austen's landscapes, reimagined through the lens of picturesque beauty, social hierarchy, and psychological depth.
          </p>
          <div className={styles.lensSelector}>
            <button className={styles.lensOption} onClick={() => handleLensSelect('picturesque')}>
              Picturesque
            </button>
            <button className={styles.lensOption} onClick={() => handleLensSelect('socialClass')}>
              Social Class
            </button>
            <button className={styles.lensOption} onClick={() => handleLensSelect('psychological')}>
              Psychological
            </button>
          </div>
        </div>
      ) : (
        <SceneViewer sceneData={sceneData} activeLens={activeLens} onBack={() => setActiveLens(null)} />
      )}
    </div>
  );
}