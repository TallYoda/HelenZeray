import styles from './HeroLoading.module.css'

type HeroLoadingProps = {
  visible: boolean
}

export default function HeroLoading({ visible }: HeroLoadingProps) {
  return (
    <div className={`${styles.loading} ${visible ? '' : styles.isHidden}`} aria-hidden={!visible}>
      <div className={styles.loadingPulse}>
        <span />
        <span />
        <span />
      </div>
      <p className={styles.loadingLabel}>Loading Works</p>
    </div>
  )
}
