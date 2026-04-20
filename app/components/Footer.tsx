'use client';

const footerStyles = {
  footer: {
    background: 'var(--color-black)',
    color: 'var(--color-white)',
    padding: '100px 60px 40px',
    borderTop: '1px solid rgba(201,169,98,0.3)',
  },
  top: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: '60px',
    marginBottom: '80px',
  },
  brandCol: {},
  brandName: {
    fontFamily: 'var(--font-display)',
    fontSize: '2rem',
    fontWeight: 300,
    letterSpacing: '0.25em',
    marginBottom: '12px',
    color: 'var(--color-white)',
  },
  tagline: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 300,
    color: 'var(--color-gold)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '20px',
  },
  brandBody: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 300,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 1.8,
    maxWidth: '300px',
    marginBottom: '32px',
  },
  socials: {
    display: 'flex',
    gap: '16px',
  },
  socLink: {
    width: '44px',
    height: '44px',
    border: '1px solid rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    color: 'var(--color-white)',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  col: {},
  colTitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '24px',
  },
  colList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  colLink: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 400,
    color: 'rgba(255,255,255,0.6)',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '40px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    color: 'rgba(255,255,255,0.4)',
  },
  waFloat: {
    position: 'fixed' as React.CSSProperties['position'],
    bottom: '32px',
    right: '32px',
    width: '56px',
    height: '56px',
    background: '#25D366',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    boxShadow: 'var(--shadow-xl)',
    zIndex: 998,
    textDecoration: 'none',
  },
  mobileFooter: {
    padding: '60px 24px 32px',
    background: 'var(--color-black)',
    color: 'var(--color-white)',
  },
  mobileBrand: {
    textAlign: 'center' as const,
    marginBottom: '40px',
  },
  mobileBrandName: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: 300,
    letterSpacing: '0.2em',
    marginBottom: '8px',
  },
  mobileTagline: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    fontWeight: 300,
    color: 'var(--color-gold)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  mobileLinks: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
    marginBottom: '32px',
  },
  mobileCol: {},
  mobileColTitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '16px',
  },
  mobileColList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  mobileColLink: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.6)',
  },
  mobileSocials: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '24px',
  },
  mobileSocialLink: {
    color: 'var(--color-white)',
    fontSize: '1.25rem',
    textDecoration: 'none',
  },
  mobileCopy: {
    textAlign: 'center' as const,
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    color: 'rgba(255,255,255,0.3)',
  },
  mobileWaBtn: {
    position: 'fixed' as React.CSSProperties['position'],
    bottom: '24px',
    right: '24px',
    width: '52px',
    height: '52px',
    background: '#25D366',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    zIndex: 998,
    textDecoration: 'none',
  },
};

export default function Footer({ isMobile }) {
  if (isMobile) {
    return (
      <footer style={footerStyles.mobileFooter}>
        <div style={footerStyles.mobileBrand}>
          <h3 style={footerStyles.mobileBrandName}>BOSTIQUE</h3>
          <p style={footerStyles.mobileTagline}>Leather with Purpose</p>
        </div>
        <div style={footerStyles.mobileLinks}>
          <div style={footerStyles.mobileCol}>
            <h4 style={footerStyles.mobileColTitle}>Collections</h4>
            <ul style={footerStyles.mobileColList}>
              <li><a href="#shop" style={footerStyles.mobileColLink}>Duffel Bags</a></li>
              <li><a href="#shop" style={footerStyles.mobileColLink}>Carry Bags</a></li>
              <li><a href="#shop" style={footerStyles.mobileColLink}>Backpacks</a></li>
            </ul>
          </div>
          <div style={footerStyles.mobileCol}>
            <h4 style={footerStyles.mobileColTitle}>Contact</h4>
            <ul style={footerStyles.mobileColList}>
              <li><a href="https://wa.me/919084736334" style={footerStyles.mobileColLink}>+91 90847 36334</a></li>
              <li><a href="mailto:hello@bostique.in" style={footerStyles.mobileColLink}>hello@bostique.in</a></li>
            </ul>
          </div>
        </div>
        <div style={footerStyles.mobileSocials}>
          <a href="https://wa.me/919084736334" style={footerStyles.mobileSocialLink}>✦</a>
          <a href="#" style={footerStyles.mobileSocialLink}>◈</a>
        </div>
        <p style={footerStyles.mobileCopy}>© 2026 Bostique. Made in India.</p>
        <a href="https://wa.me/919084736334?text=Hi%20Bostique!" style={footerStyles.mobileWaBtn}>✦</a>
      </footer>
    );
  }

  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.top}>
        <div style={footerStyles.brandCol}>
          <div style={footerStyles.brandName}>BOSTIQUE</div>
          <div style={footerStyles.tagline}>Leather with Purpose</div>
          <p style={footerStyles.brandBody}>
            Premium leather goods handcrafted for those who appreciate 
            the art of timeless elegance. Established 2026, India.
          </p>
          <div style={footerStyles.socials}>
            <a href="https://wa.me/919084736334" target="_blank" style={footerStyles.socLink}>✦</a>
            <a href="#" style={footerStyles.socLink}>◈</a>
          </div>
        </div>
        <div style={footerStyles.col}>
          <h5 style={footerStyles.colTitle}>Collections</h5>
          <ul style={footerStyles.colList}>
            <li><a href="#shop" style={footerStyles.colLink}>Duffel Bags</a></li>
            <li><a href="#shop" style={footerStyles.colLink}>Carry Bags</a></li>
            <li><a href="#shop" style={footerStyles.colLink}>Backpacks</a></li>
            <li><a href="#shop" style={footerStyles.colLink}>Cushion Covers</a></li>
          </ul>
        </div>
        <div style={footerStyles.col}>
          <h5 style={footerStyles.colTitle}>Information</h5>
          <ul style={footerStyles.colList}>
            <li><a href="#" style={footerStyles.colLink}>Our Story</a></li>
            <li><a href="#" style={footerStyles.colLink}>Shipping</a></li>
            <li><a href="#" style={footerStyles.colLink}>Returns</a></li>
            <li><a href="#" style={footerStyles.colLink}>Care Guide</a></li>
          </ul>
        </div>
        <div style={footerStyles.col}>
          <h5 style={footerStyles.colTitle}>Contact</h5>
          <ul style={footerStyles.colList}>
            <li><a href="https://wa.me/919084736334" target="_blank" style={footerStyles.colLink}>+91 90847 36334</a></li>
            <li><a href="mailto:hello@bostique.in" style={footerStyles.colLink}>hello@bostique.in</a></li>
            <li><span style={footerStyles.colLink}>India</span></li>
          </ul>
        </div>
      </div>
      <div style={footerStyles.bottom}>
        <span>© 2026 Bostique. All rights reserved.</span>
        <span>Crafted in India</span>
      </div>
      <a href="https://wa.me/919084736334?text=Hi%20Bostique!%20I%27d%20like%20to%20place%20an%20order." target="_blank" style={footerStyles.waFloat}>✦</a>
    </footer>
  );
}