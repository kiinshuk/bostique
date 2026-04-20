'use client';

const footerStyles = {
  footer: {
    background: 'var(--color-black)',
    color: 'var(--color-white)',
    padding: '80px 48px 40px',
  },
  top: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: '48px',
    marginBottom: '48px',
  },
  brandCol: {},
  brandName: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: 400,
    marginBottom: '8px',
    letterSpacing: '0.1em',
  },
  tagline: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '16px',
  },
  brandBody: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 1.6,
    maxWidth: '280px',
    marginBottom: '24px',
  },
  socials: {
    display: 'flex',
    gap: '12px',
  },
  socLink: {
    width: '40px',
    height: '40px',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    color: 'var(--color-white)',
    textDecoration: 'none',
    transition: 'border-color 0.2s',
  },
  col: {},
  colTitle: {
    fontSize: '0.7rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '20px',
    fontWeight: 500,
  },
  colList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  colLink: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '0.9rem',
    textDecoration: 'none',
    transition: 'opacity 0.2s',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '32px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.4)',
  },
  waFloat: {
    position: 'fixed' as React.CSSProperties['position'],
    bottom: '24px',
    right: '24px',
    width: '56px',
    height: '56px',
    background: '#25D366',
    borderRadius: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 998,
    textDecoration: 'none',
  },
  mobileFooter: {
    padding: '48px 20px 32px',
    background: 'var(--color-black)',
    color: 'var(--color-white)',
  },
  mobileBrand: {
    textAlign: 'center' as const,
    marginBottom: '32px',
  },
  mobileBrandName: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.25rem',
    fontWeight: 400,
    marginBottom: '4px',
  },
  mobileTagline: {
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.5)',
  },
  mobileLinks: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '24px',
  },
  mobileCol: {},
  mobileColTitle: {
    fontSize: '0.7rem',
    letterSpacing: '0.15em',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '12px',
    textTransform: 'uppercase',
  },
  mobileColList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  mobileColLink: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '0.85rem',
  },
  mobileSocials: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '20px',
  },
  mobileSocialLink: {
    color: 'var(--color-white)',
    fontSize: '1.25rem',
    textDecoration: 'none',
  },
  mobileCopy: {
    textAlign: 'center' as const,
    fontSize: '0.75rem',
    color: 'rgba(255,255,255,0.4)',
  },
  mobileWaBtn: {
    position: 'fixed' as React.CSSProperties['position'],
    bottom: '20px',
    right: '20px',
    width: '50px',
    height: '50px',
    background: '#25D366',
    borderRadius: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    boxShadow: 'var(--shadow-lg)',
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
          <p style={footerStyles.mobileTagline}>Leather Goods Crafted for Life</p>
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
        <a 
          href="https://wa.me/919084736334?text=Hi%20Bostique!" 
          style={footerStyles.mobileWaBtn}
        >
          ✦
        </a>
      </footer>
    );
  }

  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.top}>
        <div style={footerStyles.brandCol}>
          <div style={footerStyles.brandName}>BOSTIQUE</div>
          <div style={footerStyles.tagline}>Leather Goods Crafted for Life</div>
          <p style={footerStyles.brandBody}>
            Premium bags and leather accessories, handcrafted for those who move with purpose.
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
        <span>Made in India</span>
      </div>
      <a 
        href="https://wa.me/919084736334?text=Hi%20Bostique!%20I%27d%20like%20to%20place%20an%20order." 
        target="_blank"
        style={footerStyles.waFloat}
      >
        ✦
      </a>
    </footer>
  );
}