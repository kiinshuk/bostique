'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/static')
      .then(res => res.text())
      .then(text => {
        setHtml(text);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}