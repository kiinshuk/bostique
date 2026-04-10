'use client';

export default function UserAccount({ user, onClose, onLogout }) {
  return (
    <div id="user-account" style={{display:'flex',position:'fixed',inset:0,zIndex:8000,background:'rgba(0,0,0,0.85)',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'var(--white)',width:420,maxWidth:'94vw',padding:44,position:'relative'}}>
        <button onClick={onClose} style={{position:'absolute',top:16,right:16,background:'none',border:'none',fontSize:'.8rem',cursor:'pointer'}}>✕</button>
        <h2 style={{fontFamily:'var(--f-display)',fontSize:'1.8rem',fontWeight:300,textAlign:'center',marginBottom:8}}>My Account</h2>
        <p style={{fontSize:'.7rem',textTransform:'uppercase',letterSpacing:'.2em',color:'var(--stone)',textAlign:'center',marginBottom:32}}>{user.name}</p>
        <div style={{display:'flex',flexDirection:'column',gap:12,marginTop:24}}>
          <button className="btn-adm" onClick={() => alert('Order history coming soon!')}>📦 My Orders</button>
          <button className="btn-adm" onClick={() => alert('Address book coming soon!')}>📍 Saved Addresses</button>
          <button className="btn-adm" onClick={() => alert('Wishlist coming soon!')}>❤️ My Wishlist</button>
          <button className="btn-adm" style={{background:'#C0392B',color:'white'}} onClick={onLogout}>🚪 Sign Out</button>
        </div>
      </div>
    </div>
  );
}