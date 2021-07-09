import styles from '../styles/loading.module.scss'
import * as animationData from '../animations/loading.json'
import Lottie from 'react-lottie'

export default function Loading() {
    return (
        <div className={styles.container}>
            <Lottie options={{
                animationData,
                autoplay: true,
                loop: true
            }} width='20rem' isClickToPauseDisabled></Lottie>
        </div>
    )
}
