'use client';

import { motion } from 'framer-motion';
import Image from "next/image";
import styles from "../styles/HeroSection.module.css"
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';


export default function HeroSection() {
  // const [showModal, setShowModal] = useState(false);

  let { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false);

  

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;
  return (
    <>
      <section className={styles.hero}>

        <div className={styles.backgroundSvg}>
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill={`${resolvedTheme == "dark" ? "#1e2d4f" : "#cce4ff"}`}
              d="M0,224L60,197.3C120,171,240,117,360,122.7C480,128,600,192,720,213.3C840,235,960,213,1080,181.3C1200,149,1320,107,1380,85.3L1440,64V320H0Z"
            />
          </svg>
        </div>
        {/* Left Side: Text */}
        <motion.div
          className={styles.heroLeft}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.heroTitle}>Smarter Learning, For Everyone</h1>
          <p className={styles.heroSubtitle}>
            Your next-generation platform for modern education.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='button-primary'

          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Right Side: SVG */}
        <motion.div
          className={styles.heroRight}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Replace with your actual SVG or <Image /> */}
          <Image src="/images/svg/OnlineDoctor.svg" alt='NCLEX' width={500} height={500} data-aos="zoom-out" data-aos-delay="100" />

        </motion.div>
      </section>

      <section className={styles.backSvg}>
        {/* SVG Background Shape */}
        <div className={styles.backgroundSvg}>
          <motion.div
            className={styles.backgroundSvg}
            initial={{ y: 0 }}
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Image
              src="/images/svg/dice.svg"
              alt="Background"
              layout="fill"
              objectFit="cover"
              priority
            />
          </motion.div>

        </div>

        {/* Text */}
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>learn anytime, anywhere</h1>
          <Link href="/practice" target="_blank" rel="noopener noreferrer">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-primary"
            >Practice
            </motion.button>
          </Link>


        </div>
      </section>




      {/* {showModal && <Modal onClose={() => setShowModal(false)} />} */}
    </>
  );
}
