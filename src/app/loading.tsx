import Image from "next/image";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingScreen} role="status" aria-live="polite">
      <div className={styles.glow} />
      <div className={styles.centerContent}>
        <div className={styles.ringWrapper}>
          <div className={styles.spinnerRing} />
          <Image
            src="/icarus-logo-white.png"
            alt="Icarus Flight Agency"
            width={160}
            height={80}
            className={styles.logo}
            priority
          />
        </div>
        <span className={styles.caption}>Preparing your journey&hellip;</span>
      </div>
    </div>
  );
}
