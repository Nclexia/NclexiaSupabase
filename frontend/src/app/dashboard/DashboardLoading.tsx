'use client'

const Bone = ({ w, h, r = 6 }: { w: string; h: number; r?: number }) => (
  <div style={{
    width: w, height: h, borderRadius: r, flexShrink: 0,
    background: 'var(--color-background-secondary)',
    animation: 'bone 1.6s ease-in-out infinite',
  }} />
)

export default function DashboardLoading() {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden', position: 'relative' }}>

      {/* ── Sidebar skeleton ── */}
      <div style={{
        width: 220, flexShrink: 0,
        borderRight: '0.5px solid var(--color-border-tertiary)',
        padding: '18px 14px',
        display: 'flex', flexDirection: 'column', gap: 8,
        background: 'var(--color-background-primary)',
      }}>
        <Bone w="70%" h={24} r={8} />
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Bone w="18px" h={18} r={4} />
              <Bone w={`${45 + i * 5}%`} h={13} r={4} />
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10,
          paddingTop: 12, borderTop: '0.5px solid var(--color-border-tertiary)',
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
            background: 'var(--color-background-secondary)',
            animation: 'bone 1.6s ease-in-out infinite',
          }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <Bone w="90px" h={12} r={4} />
            <Bone w="60px" h={10} r={4} />
          </div>
        </div>
      </div>

      {/* ── Main area skeleton ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--color-background-tertiary)' }}>

        {/* Topbar */}
        <div style={{
          height: 52, background: 'var(--color-background-primary)',
          borderBottom: '0.5px solid var(--color-border-tertiary)',
          padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Bone w="140px" h={16} r={4} />
          <div style={{ display: 'flex', gap: 10 }}>
            <Bone w="32px" h={32} r={8} />
            <Bone w="32px" h={32} r={8} />
          </div>
        </div>

        {/* Page content */}
        <div style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Bone w="180px" h={22} r={6} />
            <Bone w="260px" h={13} r={4} />
          </div>

          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{
                padding: 16, borderRadius: 12,
                background: 'var(--color-background-primary)',
                border: '0.5px solid var(--color-border-tertiary)',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <Bone w="50%" h={12} r={4} />
                <Bone w="40%" h={26} r={6} />
                <Bone w="65%" h={10} r={4} />
              </div>
            ))}
          </div>

          {/* Two panels */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{
              padding: 16, borderRadius: 12,
              background: 'var(--color-background-primary)',
              border: '0.5px solid var(--color-border-tertiary)',
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <Bone w="40%" h={14} r={4} />
              <Bone w="100%" h={110} r={8} />
            </div>
            <div style={{
              padding: 16, borderRadius: 12,
              background: 'var(--color-background-primary)',
              border: '0.5px solid var(--color-border-tertiary)',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <Bone w="50%" h={14} r={4} />
              {[1,2,3,4].map(i => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                    background: 'var(--color-background-secondary)',
                    animation: 'bone 1.6s ease-in-out infinite',
                  }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <Bone w="70%" h={12} r={4} />
                    <Bone w="50%" h={10} r={4} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Overlay with reader card ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        // background: 'rgba(0,0,0,0.3)',
        // backdropFilter: 'blur(3px)',
        // WebkitBackdropFilter: 'blur(3px)',
      }}>
        <div style={{
          background: 'var(--color-background-primary)',
          border: '0.5px solid var(--color-border-secondary)',
          borderRadius: 20,
          padding: '32px 44px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 16,
          minWidth: 290,
        }}>

          {/* Character + floating words inside the card */}
          <div style={{ position: 'relative', width: 200, height: 200 }}>
            {[
              { label: 'NCLEXIA', top: 14, left: 10,  delay: '0s' },
              { label: 'ready', top: 4,  left: 82,  delay: '0.8s' },
              { label: 'study', top: 18, left: 150, delay: '1.6s' },
            ].map(({ label, top, left, delay }) => (
              <span key={label} style={{
                position: 'absolute', top, left,
                fontSize: 11, fontWeight: 500, color: '#534AB7',
                animation: `floatUp 2.4s ease-in-out ${delay} infinite`,
                pointerEvents: 'none',
              }}>{label}</span>
            ))}

            <svg width="200" height="200" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="55" y="160" width="110" height="8" rx="4" fill="#D3D1C7" opacity="0.5"/>
              <g style={{ animation: 'headBob 2.8s ease-in-out infinite', transformOrigin: '110px 100px' }}>
                <g style={{ animation: 'armMove 2.8s ease-in-out infinite', transformOrigin: '85px 130px' }}>
                  <rect x="70" y="128" width="40" height="10" rx="5" fill="#F5C4B3"/>
                  <rect x="68" y="130" width="14" height="8" rx="4" fill="#F5C4B3"/>
                </g>
                <g style={{ animation: 'armMove 2.8s ease-in-out infinite', transformOrigin: '135px 130px', animationDirection: 'reverse' as const }}>
                  <rect x="110" y="128" width="40" height="10" rx="5" fill="#F5C4B3"/>
                  <rect x="138" y="130" width="14" height="8" rx="4" fill="#F5C4B3"/>
                </g>
                <rect x="90" y="115" width="40" height="38" rx="4" fill="#7F77DD"/>
                <rect x="88" y="113" width="20" height="38" rx="3" fill="#CECBF6"/>
                <rect x="112" y="113" width="20" height="38" rx="3" fill="#AFA9EC"/>
                <line x1="108" y1="113" x2="108" y2="151" stroke="#7F77DD" strokeWidth="1.5"/>
                <rect x="91" y="117" width="14" height="2" rx="1" fill="#AFA9EC" opacity="0.7"/>
                <rect x="91" y="121" width="12" height="2" rx="1" fill="#AFA9EC" opacity="0.7"/>
                <rect x="91" y="125" width="14" height="2" rx="1" fill="#AFA9EC" opacity="0.7"/>
                <rect x="91" y="129" width="10" height="2" rx="1" fill="#AFA9EC" opacity="0.7"/>
                <rect x="114" y="117" width="14" height="2" rx="1" fill="#534AB7" opacity="0.5"/>
                <rect x="114" y="121" width="12" height="2" rx="1" fill="#534AB7" opacity="0.5"/>
                <rect x="114" y="125" width="14" height="2" rx="1" fill="#534AB7" opacity="0.5"/>
                <rect x="114" y="129" width="10" height="2" rx="1" fill="#534AB7" opacity="0.5"/>
                <g style={{ animation: 'pageTurn 1.8s ease-in-out infinite', transformOrigin: '108px 130px' }}>
                  <path d="M88 113 Q98 108 108 113" stroke="#CECBF6" strokeWidth="1" fill="none"/>
                </g>
                <circle cx="110" cy="92" r="22" fill="#FAEEDA"/>
                <rect x="94" y="90" width="8" height="7" rx="4" fill="white"/>
                <rect x="118" y="90" width="8" height="7" rx="4" fill="white"/>
                <g style={{ animation: 'eyeMove 2.4s ease-in-out infinite' }}>
                  <circle cx="98" cy="93" r="3" fill="#2C2C2A"/>
                  <circle cx="122" cy="93" r="3" fill="#2C2C2A"/>
                  <circle cx="99" cy="92" r="1" fill="white"/>
                  <circle cx="123" cy="92" r="1" fill="white"/>
                </g>
                <path d="M104 100 Q110 104 116 100" stroke="#D85A30" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M88 82 Q90 72 100 74" stroke="#2C2C2A" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <path d="M132 82 Q130 72 120 74" stroke="#2C2C2A" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <circle cx="96" cy="95" r="2" fill="#F0997B" opacity="0.5"/>
                <circle cx="124" cy="95" r="2" fill="#F0997B" opacity="0.5"/>
                <rect x="100" y="68" width="20" height="26" rx="2" fill="#FAC775" opacity="0.3"/>
                <rect x="103" y="71" width="3" height="2" rx="1" fill="#BA7517" opacity="0.6"/>
                <rect x="108" y="71" width="3" height="2" rx="1" fill="#BA7517" opacity="0.6"/>
                <rect x="113" y="71" width="3" height="2" rx="1" fill="#BA7517" opacity="0.6"/>
              </g>
              <rect x="75" y="155" width="70" height="6" rx="3" fill="#B4B2A9" opacity="0.4"/>
              <rect x="80" y="153" width="60" height="4" rx="2" fill="#D3D1C7" opacity="0.5"/>
            </svg>
          </div>

          {/* Text */}
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: 17, fontWeight: 500, margin: '0 0 5px', color: 'var(--color-text-primary)' }}>
              Loading your dashboard
            </h2>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', margin: 0 }}>
              Fetching your progress and stats...
            </p>
          </div>

          {/* Progress bar */}
          <div style={{ width: 200 }}>
            <div style={{
              height: 4, background: 'var(--color-background-secondary)',
              borderRadius: 999, overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', background: '#7F77DD', borderRadius: 999,
                animation: 'progressBar 2.8s cubic-bezier(0.4,0,0.2,1) forwards',
              }}/>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginTop: 6, fontSize: 11, color: 'var(--color-text-tertiary)',
            }}>
              <span>Setting things up</span>
              <span>Almost done</span>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes bone        { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes pageTurn    { 0%,100%{transform:scaleX(1) rotate(-1deg)} 50%{transform:scaleX(-1) rotate(1deg)} }
        @keyframes eyeMove     { 0%,100%{transform:translateX(0)} 40%{transform:translateX(3px)} 70%{transform:translateX(-2px)} }
        @keyframes headBob     { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-2px) rotate(1deg)} }
        @keyframes progressBar { 0%{width:0%} 100%{width:88%} }
        @keyframes floatUp     { 0%{opacity:0;transform:translateY(0)} 60%{opacity:1} 100%{opacity:0;transform:translateY(-30px)} }
        @keyframes armMove     { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-4deg)} }
      `}</style>
    </div>
  )
}