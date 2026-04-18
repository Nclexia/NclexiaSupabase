'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/app/utils/supabase/client'

const tips = [
  'Tip: Use the Socratic method to study',
  '80% of NCLEXIA questions test application',
  'NCLEXIA has between 85–150 questions',
  'Prioritization questions are most common',
]

export default function AuthCallback() {
  const [tip, setTip] = useState(tips[0])
  const [fade, setFade] = useState(true)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        i = (i + 1) % tips.length
        setTip(tips[i])
        setFade(true)
      }, 300)
    }, 2800)

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        subscription.unsubscribe()
        clearInterval(interval)
        window.location.href = '/dashboard'
      }
    })

    return () => {
      clearInterval(interval)
      subscription.unsubscribe()
    }
  }, [])

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '100vh', gap: '24px', padding: '2rem',
      backgroundColor: 'var(--background)',
    }}>

      {/* Floating words */}
      <div style={{ position: 'relative', width: 220, height: 220 }}>
        <span style={{
          position: 'absolute', top: 18, left: 28, fontSize: 11, fontWeight: 500,
          color: '#534AB7', animation: 'floatUp 2.4s ease-in-out infinite',
        }}>NCLEXIA</span>
        <span style={{
          position: 'absolute', top: 8, left: 88, fontSize: 11, fontWeight: 500,
          color: '#534AB7', animation: 'floatUp 2.4s ease-in-out 0.8s infinite',
        }}>ready</span>
        <span style={{
          position: 'absolute', top: 22, left: 150, fontSize: 11, fontWeight: 500,
          color: '#534AB7', animation: 'floatUp 2.4s ease-in-out 1.6s infinite',
        }}>study</span>

        {/* Main SVG illustration */}
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">

          {/* Shadow */}
          <rect x="55" y="160" width="110" height="8" rx="4" fill="#D3D1C7" opacity="0.5"/>

          {/* Character group with head bob */}
          <g style={{ animation: 'headBob 2.8s ease-in-out infinite', transformOrigin: '110px 100px' }}>

            {/* Left arm */}
            <g style={{ animation: 'armMove 2.8s ease-in-out infinite', transformOrigin: '85px 130px' }}>
              <rect x="70" y="128" width="40" height="10" rx="5" fill="#F5C4B3"/>
              <rect x="68" y="130" width="14" height="8" rx="4" fill="#F5C4B3"/>
            </g>

            {/* Right arm */}
            <g style={{ animation: 'armMove 2.8s ease-in-out infinite', transformOrigin: '135px 130px', animationDirection: 'reverse' }}>
              <rect x="110" y="128" width="40" height="10" rx="5" fill="#F5C4B3"/>
              <rect x="138" y="130" width="14" height="8" rx="4" fill="#F5C4B3"/>
            </g>

            {/* Body */}
            <rect x="90" y="115" width="40" height="38" rx="4" fill="#7F77DD"/>

            {/* Open book */}
            <rect x="88" y="113" width="20" height="38" rx="3" fill="#CECBF6"/>
            <rect x="112" y="113" width="20" height="38" rx="3" fill="#AFA9EC"/>
            <line x1="108" y1="113" x2="108" y2="151" stroke="#7F77DD" strokeWidth="1.5"/>
            {/* Left page lines */}
            <rect x="91" y="117" width="14" height="2" rx="1" fill="#AFA9EC" opacity="0.7"/>
            <rect x="91" y="121" width="12" height="2" rx="1" fill="#AFA9EC" opacity="0.7"/>
            <rect x="91" y="125" width="14" height="2" rx="1" fill="#AFA9EC" opacity="0.7"/>
            <rect x="91" y="129" width="10" height="2" rx="1" fill="#AFA9EC" opacity="0.7"/>
            {/* Right page lines */}
            <rect x="114" y="117" width="14" height="2" rx="1" fill="#534AB7" opacity="0.5"/>
            <rect x="114" y="121" width="12" height="2" rx="1" fill="#534AB7" opacity="0.5"/>
            <rect x="114" y="125" width="14" height="2" rx="1" fill="#534AB7" opacity="0.5"/>
            <rect x="114" y="129" width="10" height="2" rx="1" fill="#534AB7" opacity="0.5"/>

            {/* Page turn animation */}
            <g style={{ animation: 'pageTurn 1.8s ease-in-out infinite', transformOrigin: '108px 130px' }}>
              <path d="M88 113 Q98 108 108 113" stroke="#CECBF6" strokeWidth="1" fill="none"/>
            </g>

            {/* Head */}
            <circle cx="110" cy="92" r="22" fill="#FAEEDA"/>

            {/* Eye whites */}
            <rect x="94" y="90" width="8" height="7" rx="4" fill="white"/>
            <rect x="118" y="90" width="8" height="7" rx="4" fill="white"/>

            {/* Eyes with movement */}
            <g style={{ animation: 'eyeMove 2.4s ease-in-out infinite' }}>
              <circle cx="98" cy="93" r="3" fill="#2C2C2A"/>
              <circle cx="122" cy="93" r="3" fill="#2C2C2A"/>
              <circle cx="99" cy="92" r="1" fill="white"/>
              <circle cx="123" cy="92" r="1" fill="white"/>
            </g>

            {/* Smile */}
            <path d="M104 100 Q110 104 116 100" stroke="#D85A30" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

            {/* Eyebrows */}
            <path d="M88 82 Q90 72 100 74" stroke="#2C2C2A" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M132 82 Q130 72 120 74" stroke="#2C2C2A" strokeWidth="2" fill="none" strokeLinecap="round"/>

            {/* Blush */}
            <circle cx="96" cy="95" r="2" fill="#F0997B" opacity="0.5"/>
            <circle cx="124" cy="95" r="2" fill="#F0997B" opacity="0.5"/>

            {/* Hat / cap */}
            <rect x="100" y="68" width="20" height="26" rx="2" fill="#FAC775" opacity="0.3"/>
            <rect x="103" y="71" width="3" height="2" rx="1" fill="#BA7517" opacity="0.6"/>
            <rect x="108" y="71" width="3" height="2" rx="1" fill="#BA7517" opacity="0.6"/>
            <rect x="113" y="71" width="3" height="2" rx="1" fill="#BA7517" opacity="0.6"/>
          </g>

          {/* Book stack base */}
          <rect x="75" y="155" width="70" height="6" rx="3" fill="#B4B2A9" opacity="0.4"/>
          <rect x="80" y="153" width="60" height="4" rx="2" fill="#D3D1C7" opacity="0.5"/>

        </svg>
      </div>

      {/* Text */}
      <div style={{ textAlign: 'center', animation: 'fadeIn 0.6s ease both' }}>
        <h2 style={{ fontSize: 18, fontWeight: 500, margin: '0 0 6px', color: 'var(--foreground)' }}>
          Getting your account ready
        </h2>
        <p style={{ fontSize: 13, color: 'var(--muted-foreground)', margin: 0 }}>
          While you wait — did you know NCLEXIA has 85–150 questions?
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ width: 200 }}>
        <div style={{
          height: 4, background: 'var(--muted)', borderRadius: 999,
          overflow: 'hidden', border: '0.5px solid var(--border)',
        }}>
          <div style={{
            height: '100%', background: '#7F77DD', borderRadius: 999,
            animation: 'progressBar 3.5s cubic-bezier(0.4,0,0.2,1) forwards',
          }}/>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between', marginTop: 6,
          fontSize: 11, color: 'var(--muted-foreground)',
        }}>
          <span>Verifying session</span>
          <span>Almost there...</span>
        </div>
      </div>

      {/* Rotating tip */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 12, color: 'var(--muted-foreground)',
        padding: '6px 14px',
        background: 'var(--muted)', borderRadius: 8,
        border: '0.5px solid var(--border)',
        opacity: fade ? 1 : 0,
        transition: 'opacity 0.3s ease',
        minWidth: 240, justifyContent: 'center',
      }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7F77DD', flexShrink: 0 }}/>
        {tip}
      </div>

      <style>{`
        @keyframes pageTurn {
          0%,100%{transform:scaleX(1) rotate(-1deg)}
          50%{transform:scaleX(-1) rotate(1deg)}
        }
        @keyframes eyeMove {
          0%,100%{transform:translateX(0)}
          40%{transform:translateX(3px)}
          70%{transform:translateX(-2px)}
        }
        @keyframes headBob {
          0%,100%{transform:translateY(0) rotate(0deg)}
          50%{transform:translateY(-2px) rotate(1deg)}
        }
        @keyframes progressBar {
          0%{width:0%} 100%{width:85%}
        }
        @keyframes fadeIn {
          from{opacity:0;transform:translateY(8px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes floatUp {
          0%{opacity:0;transform:translateY(0)}
          60%{opacity:1}
          100%{opacity:0;transform:translateY(-28px)}
        }
        @keyframes armMove {
          0%,100%{transform:rotate(0deg)}
          50%{transform:rotate(-4deg)}
        }
      `}</style>
    </div>
  )
}