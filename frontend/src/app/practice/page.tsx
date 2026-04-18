'use client';

import { motion } from 'framer-motion';
import Image from "next/image";
import styles from "../../styles/HeroSection.module.css"
import dynamic from "next/dynamic";
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

import { encodeNumberXOR } from '../utils/XORencrypt'

export default function Practice() {
    const [showModal, setShowModal] = useState(false);
    
  let { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false);


 
  const Modal = dynamic(() => import('../../components/layouts/Modal'), {
    ssr: false
});
  useEffect(() => { setMounted(true); }, [showModal]);

  if (!mounted) return null; // Or show a skeleton/fallback

    let encoded = encodeNumberXOR(1);  // Obfuscated number


    return (
        <>

            <section className={styles.backSvg}>
                {/* SVG Background Shape */}
                <div className={styles.backgroundSvg}>
                    {/* <motion.div
                        className={styles.backgroundSvg}
                        initial={{ y: 0 }}>
                        <Image
                            src="/images/svg/practiceHeroSection.svg"
                            alt="Background"
                            layout="fill"
                            objectFit="cover"
                            priority
                        />
                    </motion.div> */}
                   
                    <svg id="visual" viewBox="0 0 900 600" width="900" height="600"  preserveAspectRatio="none"><rect x="0" y="0" width="900" height="600" fill= {`${resolvedTheme == "dark" ? "#262626" : "#f9f9f9"}`}></rect><defs><linearGradient id="grad1_0" x1="33.3%" y1="100%" x2="100%" y2="0%"><stop offset="20%" stopColor= {`${resolvedTheme == "dark" ? "#262626" : "#f9f9f9"}`} stopOpacity="1"></stop><stop offset="80%" stopColor= {`${resolvedTheme == "dark" ? "#262626" : "#f9f9f9"}`} stopOpacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_0" x1="0%" y1="100%" x2="66.7%" y2="0%"><stop offset="20%" stopColor= {`${resolvedTheme == "dark" ? "#262626" : "#f9f9f9"}`} stopOpacity="1"></stop><stop offset="80%" stopColor= {`${resolvedTheme == "dark" ? "#262626" : "#f9f9f9"}`} stopOpacity="1"></stop></linearGradient></defs><g transform="translate(900, 600)"><path d="M-486.7 0C-438.4 -46.7 -390.1 -93.5 -373.2 -154.6C-356.4 -215.8 -370.9 -291.3 -344.2 -344.2C-317.5 -397 -249.5 -427.2 -185.2 -447.2C-121 -467.1 -60.5 -476.9 0 -486.7L0 0Z"               fill={`${resolvedTheme == "dark" ? "#1e2d4f" : "#cce4ff"}`}
                    ></path></g><g transform="translate(0, 0)"><path d="M486.7 0C472.6 58.9 458.4 117.8 438.8 181.8C419.2 245.7 394.2 314.7 344.2 344.2C294.2 373.6 219.2 363.5 157.7 380.6C96.1 397.8 48.1 442.3 0 486.7L0 0Z"               fill={`${resolvedTheme == "dark" ? "#1e2d4f" : "#cce4ff"}`}
></path></g></svg>
                </div>

                {/* Text */}
                <div className={`${styles.heroContent} py-0 `}>
                    <h1 className={styles.heroTitle}>Prepare for the NCLEX with Confidence</h1>
                    <h4>Access high-quality practice questions designed to help you succeed.</h4>
                    <h4>Start with free practice or explore premium features below.</h4>

                </div>


            </section>
            <section className='my-4'>

                {/* Cards Section */}

                <div className={`my-5 ${styles.cardsContainer} `}>
                    {/* Free Card */}
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className={`${styles.card} `}
                    >
                        <h2 className={styles.cardTitle}>Free Practice</h2>
                        <p className={styles.cardText}>
                            Start practicing NCLEX questions immediately. No login required.
                        </p>
                        <Link href={`/quiz?q=${encoded}`} className="button-primary">
                            Start Now
                        </Link>
                    </motion.div>

                    {/* Premium Card */}
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className={`${styles.card} `}

                    >
                        <h2 className={styles.cardTitle}>Premium Access</h2>
                        <p className={styles.cardText}>
                            Unlock detailed explanations, performance tracking, and more.
                        </p>
                        <button
                            className="button-primary"
                            onClick={() => {
                                console.log('Trigger login/signup');
                            }}
                        >
                            Upgrade Now
                        </button>
                    </motion.div>
                </div>

            </section>




            {showModal && <Modal onClose={() => setShowModal(false)} />
            }
        </>
    );
}
