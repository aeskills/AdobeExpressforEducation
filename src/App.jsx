import React, { useState, useEffect, useCallback } from 'react';
import { Lock, Info, Key, Copy, CheckCircle2, XCircle, AlertCircle, Shield, BookOpen, Users, Globe, Menu, X, ChevronDown, ArrowLeft, Search, School, Sparkles, Download, Smartphone, Laptop, Home } from 'lucide-react';
import translations from './translations.js';

const BASE = import.meta.env.BASE_URL;

const sharedGalleryImages = [
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.06 (1).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.06 (2).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.06 (3).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.06.jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.07 (1).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.07 (2).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.07 (3).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.07.jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.35 (1).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.35 (2).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.35 (3).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.35 (4).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.35 (5).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.35.jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.36 (1).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.36 (10).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.36 (11).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.36 (12).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.36 (13).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.36 (14).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.36 (2).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.36 (4).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.36 (5).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.36 (6).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.36 (7).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.36 (8).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.36 (9).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.36.jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.37 (1).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.37 (2).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.37 (3).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.37 (4).jpeg`,
  `${BASE}Adobe X APS Gallery Images/WhatsApp Image 2026-05-14 at 11.56.37.jpeg`
];

const SCHOOL_CONFIG = {
  aps: {
    key: 'APS', label: 'APS Schools',
    format: 'APS-[SCHOOLCODE]-[YEAR]-[CLASS]-[EMAILNUMBER]',
    placeholder: 'E.G., APS-BRI-2025-3A-1880',
    samples: ['APS-BRI-2025-3A-1880', 'APS-BRI-2025-3A-1886', 'APS-BRI-2025-3A-2144'],
    heroIcon: '', featureIcons: ['🎖️', '📚', '🏆'],
    fallback: [],
  },
  kgbv: {
    key: 'KGBV', label: 'KGBV Schools',
    heroIcon: '🌸', featureIcons: ['🎖️', '📚', '🏆'],
    fallback: [],
  },
  samajkalyan: {
    key: 'ASHRAM', label: 'Samaj Kalyan Schools',
    heroIcon: '🌿', featureIcons: ['🎖️', '📚', '🏆'],
    fallback: [],
  },
  kle: {
    key: 'KLES', label: 'Karnatak Lingayat Education',
    format: 'Enter your Admission Number',
    placeholder: 'E.G., 025406',
    samples: ['025406', '012271'],
    heroIcon: '🎓', featureIcons: ['🎖️', '📚', '🏆'],
    fallback: [],
  },
  aecs: {
    key: 'ATOMIC', label: 'Atomic Energy Central School',
    format: 'Enter your Admission Number',
    placeholder: 'E.G., 3052',
    samples: ['3052', '3240'],
    heroIcon: '⚛️', featureIcons: ['🎖️', '📚', '🏆'],
    fallback: [],
  },
};

const getSchoolFromPath = () => {
  const basePath = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const path = window.location.pathname.replace(basePath, '').replace(/^\//, '').replace(/\/$/, '').toLowerCase();
  if (path === '') return 'landing';
  return SCHOOL_CONFIG[path] ? path : null;
};

function useLang(schoolPath) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('appLanguage');
    if (saved) return saved;
    return schoolPath === 'kgbv' ? 'hi' : 'en';
  });
  const t = useCallback((key) => translations[lang]?.[key] || translations['en']?.[key] || key, [lang]);
  const toggleLang = useCallback(() => {
    const next = lang === 'en' ? 'hi' : 'en';
    setLang(next); localStorage.setItem('appLanguage', next); document.documentElement.lang = next;
  }, [lang]);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return { lang, t, toggleLang };
}

// --- Shared Components ---
const NAV_BRANDS = {
  kgbv: { icon: '🌸', en: 'Kasturba Gandhi Balika Vidyalaya X Adobe Express', hi: 'कस्तूरबा गांधी बालिका विद्यालय X एडोबी एक्सप्रेस' },
  samajkalyan: { icon: '🌿', en: 'Samaj Kalyan Ashram Schools X Adobe Express', hi: 'समाज कल्याण आश्रम विद्यालय X एडोबी एक्सप्रेस' },
  aps: { 
    icon: '🛡️',
    en: 'Army Public School X Adobe Express', 
    hi: 'आर्मी पब्लिक स्कूल X एडोबी एक्सप्रेस' 
  },
  kle: { 
    icon: '🎓',
    en: 'Karnatak Lingayat Education X Adobe Express', 
    hi: 'कर्नाटक लिंगायत एजुकेशन X एडोबी एक्सप्रेस' 
  },
  aecs: { 
    icon: '⚛️',
    en: 'Atomic Energy Central School X Adobe Express', 
    hi: 'परमाणु ऊर्जा केंद्रीय विद्यालय X एडोबी एक्सप्रेस' 
  },
};

function Navbar({ schoolPath, lang, t, toggleLang }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const brand = NAV_BRANDS[schoolPath] || NAV_BRANDS.kgbv;
  const brandText = lang === 'hi' ? brand.hi : brand.en;
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <a href={`${BASE}${schoolPath || 'kgbv'}`} className="nav-brand" aria-label="Home">
          {brand.customBrand ? (
            brand.customBrand
          ) : (
            <>
              <div className="nav-brand-icon">{brand.icon}</div>
              <span className="nav-brand-text">{brandText}</span>
            </>
          )}
        </a>
        <div className="nav-links">
          <button className="lang-toggle" onClick={toggleLang} aria-label={`Switch to ${lang === 'en' ? 'Hindi' : 'English'}`}>
            <Globe size={15} className="globe-icon" /> {t('lang_toggle')}
          </button>
        </div>
        <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu"><span /><span /><span /></button>
      </nav>
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)}>
        <div className="mobile-menu-content" onClick={e => e.stopPropagation()}>
          <button className="mobile-menu-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={20} /></button>
          <button className="lang-toggle" onClick={() => { toggleLang(); setMobileOpen(false); }}>
            <Globe size={15} /> {t('lang_toggle')}
          </button>
        </div>
      </div>
    </>
  );
}

function HeroSection({ schoolPath, t, heroImgSrc, children }) {
  const heroRef = React.useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) heroRef.current.classList.toggle('scrolled', window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <section ref={heroRef} className="hero-section" aria-labelledby="hero-heading">
      <img src={heroImgSrc} alt="" className="hero-bg-image" loading="eager" aria-hidden="true" />
      <div className="hero-overlay" />
      <div className="hero-content">

        <h1 id="hero-heading" className="hero-title">{t(`${schoolPath}_hero_title`)}</h1>
        {t(`${schoolPath}_hero_subtitle`) !== `${schoolPath}_hero_subtitle` && <p className="hero-subtitle">{t(`${schoolPath}_hero_subtitle`)}</p>}
        {t(`${schoolPath}_tagline`) !== `${schoolPath}_tagline` && <p className="hero-stats">{t(`${schoolPath}_tagline`)}</p>}
        {children}
      </div>
    </section>
  );
}

function FeaturesBar({ schoolPath, t }) {
  const features = [
    { icon: SCHOOL_CONFIG[schoolPath].featureIcons[0], text: t(`${schoolPath}_feature1`) },
    { icon: SCHOOL_CONFIG[schoolPath].featureIcons[1], text: t(`${schoolPath}_feature2`) },
    { icon: SCHOOL_CONFIG[schoolPath].featureIcons[2], text: t(`${schoolPath}_feature3`) },
  ];
  return (
    <div className="features-bar" role="list">
      {features.map((f, i) => (
        <div key={i} className="feature-card" role="listitem">
          <div className="feature-icon">{f.icon}</div>
          <span className="feature-text">{f.text}</span>
        </div>
      ))}
    </div>
  );
}

function Footer({ t }) {
  return (
    <footer className="footer" role="contentinfo">
      <p className="footer-text">Adobe Express for Education All rights reserved</p>
      <div className="footer-links">
        <span className="footer-link">{t('footer_privacy')}</span>
        <span className="footer-link">{t('footer_terms')}</span>
        <span className="footer-link">{t('footer_contact')}</span>
      </div>
    </footer>
  );
}

function NotFound({ t }) {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <div className="not-found-icon"><AlertCircle size={32} /></div>
        <h1 className="not-found-title">{t('not_found_title')}</h1>
        <p className="not-found-subtitle">{t('not_found_subtitle')}</p>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>{t('choose_portal')}</p>
        <div className="school-links">
          <a href={`${BASE}kgbv`} className="school-link-btn">🌸 {t('school_kgbv')}</a>
          <a href={`${BASE}samajkalyan`} className="school-link-btn">🌿 {t('school_samajkalyan')}</a>
        </div>
      </div>
    </div>
  );
}

// --- Image Slider Component ---
function TrendlineSlider({ images, title }) {
  return (
    <section className="trendline-section">
      {title && <h2 className="section-title">{title}</h2>}
      <div className="trendline-container">
        <div className="trendline-track">
          {images.map((src, idx) => (
            <div key={`slide1-${idx}`} className="trendline-slide">
              <img src={src} alt={`School Slide ${idx + 1}`} loading="lazy" />
            </div>
          ))}
          {/* Duplicate for infinite loop */}
          {images.map((src, idx) => (
            <div key={`slide2-${idx}`} className="trendline-slide">
              <img src={src} alt={`School Slide ${idx + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Result Display (shared) ---
function ResultDisplay({ result, t, copiedField, copyToClipboard }) {
  const initials = result.name ? result.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'EX';
  
  const handleCopyAll = () => {
    const text = `Name: ${result.name}\nEmail/ID: ${result.email}\nPassword: ${result.password}\nBranch/School: ${result.schoolName || ''}`;
    copyToClipboard(text, 'all');
  };

  return (
    <div className="id-card-container animate-fade-in" role="region" aria-label="Retrieved credentials">
      <div className="id-card-badge">
        <CheckCircle2 size={13} />
        <span>{t('credentials_retrieved')}</span>
      </div>
      <div className="id-card">
        <div className="id-card-pattern"></div>
        <div className="id-card-main">
          <div className="id-card-avatar">
            <span>{initials}</span>
          </div>
          <div className="id-card-info">
            <h3 className="id-card-name">{result.name}</h3>
            {result.schoolName && (
              <span className="id-card-branch">
                <span className="dot"></span> {result.schoolName}
              </span>
            )}
          </div>
        </div>

        <div className="id-card-details">
          <div className="detail-item">
            <div className="detail-header">
              <span className="detail-title">{t('email_address')}</span>
              <button className="detail-copy-btn" onClick={() => copyToClipboard(result.email, 'email')} aria-label="Copy email">
                {copiedField === 'email' ? <CheckCircle2 size={13} className="text-success" /> : <Copy size={13} />}
                <span>{copiedField === 'email' ? t('copied') : t('copy')}</span>
              </button>
            </div>
            <div className="detail-value lowercase-text">{result.email}</div>
          </div>

          <div className="detail-item">
            <div className="detail-header">
              <span className="detail-title">{t('password')}</span>
              <button className="detail-copy-btn" onClick={() => copyToClipboard(result.password, 'password')} aria-label="Copy password">
                {copiedField === 'password' ? <CheckCircle2 size={13} className="text-success" /> : <Copy size={13} />}
                <span>{copiedField === 'password' ? t('copied') : t('copy')}</span>
              </button>
            </div>
            <div className="detail-value password-text">{result.password}</div>
          </div>
        </div>

        <button className="copy-all-btn" onClick={handleCopyAll}>
          {copiedField === 'all' ? <CheckCircle2 size={15} /> : <Copy size={15} />}
          <span>{copiedField === 'all' ? t('copied_all') : t('copy_all')}</span>
        </button>
      </div>
    </div>
  );
}

// ==================== KGBV APP ====================
function KGBVApp({ lang, t, toggleLang }) {
  const [page, setPage] = useState('home');
  const [kgbvSchools, setKgbvSchools] = useState([]);
  const [kgbvData, setKgbvData] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [classRoll, setClassRoll] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copiedField, setCopiedField] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [schoolSearch, setSchoolSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const handler = () => setShowStickyCta(window.scrollY > 300);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Load schools list
  useEffect(() => {
    fetch(BASE + 'kgbv-schools.json').then(r => r.json()).then(setKgbvSchools).catch(() => {});
  }, []);

  // Load student data
  useEffect(() => {
    fetch(BASE + 'students.json', { headers: { 'Bypass-Tunnel-Reminder': 'true' } })
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(json => {
        const d = json.filter(s => s.s === 'KGBV').map(s => ({
          id: s.i, name: s.n, email: s.e, password: s.p, school: s.s, schoolName: s.sn || ''
        }));
        setKgbvData(d);
        setIsLoaded(true);
      })
      .catch(() => console.log('Using fallback data.'));
  }, []);

  const heroImgSrc = `${BASE}hero-kgbv.png`;

  const handleRetrieve = () => {
    setError(''); setResult(null);
    if (!selectedSchool) { setError(t('select_school_error')); return; }
    if (!classRoll.trim()) { setError(t('enter_classroll_error')); return; }

    const school = kgbvSchools.find(s => s.prefix === selectedSchool);
    if (!school) { setError(t('invalid_school')); return; }

    // Construct email: {prefix}s{classroll}@kgbvup.in
    const input = classRoll.trim().toLowerCase();
    const targetEmail = `${school.prefix}s${input}@kgbvup.in`;

    const found = kgbvData.find(s => s.email.toLowerCase() === targetEmail);
    if (found) {
      setResult({ ...found, schoolName: school.name });
    } else {
      setError(t('student_not_found'));
    }
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const selectedSchoolObj = kgbvSchools.find(s => s.prefix === selectedSchool);
  const filteredSchools = kgbvSchools.filter(s =>
    s.name.toLowerCase().includes(schoolSearch.toLowerCase()) ||
    s.city.toLowerCase().includes(schoolSearch.toLowerCase())
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('.custom-dropdown')) setDropdownOpen(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const kgbvTrendlineImages = [
    'https://www.samagrashikshaup.in/upefapb_images/KGBV/KGBV1.jpg',
    'https://www.samagrashikshaup.in/upefapb_images/KGBV/KGBV2.jpg',
    'https://www.samagrashikshaup.in/upefapb_images/KGBV/KGBV3.jpg',
    'https://www.samagrashikshaup.in/upefapb_images/KGBV/KGBV4.png',
    'https://www.samagrashikshaup.in/upefapb_images/KGBV/KGBV5.jpg'
  ];

  // HOME PAGE
  if (page === 'home') {
    return (
      <>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navbar schoolPath="kgbv" lang={lang} t={t} toggleLang={toggleLang} />
        <HeroSection schoolPath="kgbv" t={t} heroImgSrc={heroImgSrc}>
          <button className="hero-cta-button shine-effect pulse-glow" onClick={() => setPage('retrieve')}>
            <Key size={20} className="cta-icon" /> {t('retrieve_cta')}
          </button>
        </HeroSection>
        <FeaturesBar schoolPath="kgbv" t={t} />

        <TrendlineSlider images={kgbvTrendlineImages} />

        <section className="about-section" id="main-content">
          <h2 className="section-title">{t('shared_about_title')}</h2>
          <p className="section-desc">
            {t('shared_about_desc')}
          </p>
        </section>

        <section className="app-download-section" style={{ maxWidth: '800px', margin: '0 auto 60px', padding: '0 24px' }}>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '32px' }}>{t('shared_download_title')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="download-card" style={{ background: 'var(--bg-card)', padding: '32px 24px', borderRadius: '16px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://play.google.com/store/apps/details?id=com.adobe.spark.post&hl=en_IN" alt="Play Store QR" style={{ width: '130px', height: '130px', marginBottom: '20px', borderRadius: '8px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-dark)', fontFamily: "'Poppins', sans-serif" }}>Google Play Store</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: t('shared_play_desc') }}></p>
              <a href="https://play.google.com/store/apps/details?id=com.adobe.spark.post&hl=en_IN" target="_blank" rel="noreferrer" className="action-button" style={{ width: 'auto', padding: '12px 28px', minHeight: 'auto', fontSize: '14px', textDecoration: 'none' }}>{t('shared_play_btn')}</a>
            </div>
            <div className="download-card" style={{ background: 'var(--bg-card)', padding: '32px 24px', borderRadius: '16px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://tinyurl.com/yper8w4n" alt="App Store QR" style={{ width: '130px', height: '130px', marginBottom: '20px', borderRadius: '8px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-dark)', fontFamily: "'Poppins', sans-serif" }}>Apple App Store</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: t('shared_app_desc') }}></p>
              <a href="https://tinyurl.com/yper8w4n" target="_blank" rel="noreferrer" className="action-button" style={{ width: 'auto', padding: '12px 28px', minHeight: 'auto', fontSize: '14px', textDecoration: 'none' }}>{t('shared_app_btn')}</a>
            </div>
          </div>
        </section>

        <section className="important-section" style={{ maxWidth: '800px', margin: '0 auto 60px', padding: '0 24px' }}>
          <div style={{ background: '#ffffff', padding: '40px 32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontSize: '16px', color: '#334155', marginBottom: '32px', lineHeight: '1.6', textAlign: 'center', maxWidth: '680px' }} dangerouslySetInnerHTML={{ __html: t('shared_important_desc') }}></p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>🎥</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>{t('shared_tutorial_title')}</span>
              </div>
              <a href="https://youtu.be/iuuC3YYBUs8?si=2eb2lmhDBSuxAyRC" target="_blank" rel="noreferrer" style={{ background: '#3454b4', color: 'white', padding: '10px 24px', borderRadius: '8px', fontSize: '15px', fontWeight: '600', textDecoration: 'none', transition: 'background 0.2s', border: 'none' }}>{t('shared_tutorial_btn')}</a>
            </div>
          </div>
        </section>

        <Footer t={t} />

        {/* Floating CTA */}
        <button 
          className={`floating-cta-button shine-effect pulse-glow ${showStickyCta ? 'visible' : ''}`}
          onClick={() => setPage('retrieve')}
          aria-label={t('retrieve_cta')}
        >
          <Key size={22} className="cta-icon" />
          <span className="floating-text">{t('retrieve_cta')}</span>
        </button>
      </>
    );
  }

  // RETRIEVE PAGE
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar schoolPath="kgbv" lang={lang} t={t} toggleLang={toggleLang} />
      <div className="retrieve-page">
        <button className="back-button" onClick={() => { setPage('home'); setResult(null); setError(''); }}>
          <ArrowLeft size={18} /> <span>{t('back_home')}</span>
        </button>

        <main id="main-content" className="main-content">
          <div className="recovery-card">
            <div className="recovery-card-header">
              <div className="recovery-card-icon"><Key size={20} /></div>
              <div>
                <div className="recovery-card-title">{t('kgbv_retrieve_title')}</div>
                <div className="recovery-card-subtitle">
                  {isLoaded ? `${kgbvData.length.toLocaleString()} ${t('subtitle_students')}` : t('loading_data')}
                </div>
              </div>
            </div>

            <div className="recovery-card-body">
              <div className="info-banner" role="note">
                <Info className="icon" size={18} />
                <span>{t('kgbv_info_banner')}</span>
              </div>

              {/* Step 1: School Selection */}
              <div className="form-group">
                <label className="label">{t('select_school_label')}</label>
                <div className="custom-dropdown">
                  <button
                    className={`dropdown-trigger ${dropdownOpen ? 'open' : ''}`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    type="button"
                  >
                    <School size={16} className="dropdown-icon" />
                    <span className={selectedSchoolObj ? 'dropdown-value' : 'dropdown-placeholder'}>
                      {selectedSchoolObj ? `${selectedSchoolObj.name}, ${selectedSchoolObj.city}` : t('select_school_placeholder')}
                    </span>
                    <ChevronDown size={16} className={`dropdown-chevron ${dropdownOpen ? 'rotated' : ''}`} />
                  </button>
                  {dropdownOpen && (
                    <div className="dropdown-panel">
                      <div className="dropdown-search-box">
                        <Search size={14} />
                        <input
                          type="text"
                          placeholder={t('search_school')}
                          value={schoolSearch}
                          onChange={e => setSchoolSearch(e.target.value)}
                          autoFocus
                        />
                      </div>
                      <div className="dropdown-list">
                        {filteredSchools.length === 0 && (
                          <div className="dropdown-empty">{t('no_schools_found')}</div>
                        )}
                        {filteredSchools.map(s => (
                          <button
                            key={s.prefix}
                            className={`dropdown-item ${selectedSchool === s.prefix ? 'selected' : ''}`}
                            onClick={() => {
                              setSelectedSchool(s.prefix);
                              setDropdownOpen(false);
                              setSchoolSearch('');
                              setError(''); setResult(null);
                            }}
                          >
                            <span className="dropdown-item-name">{s.name}</span>
                            <span className="dropdown-item-city">{s.city}, {s.state}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Step 2: Class + Roll */}
              <div className="form-group">
                <label className="label" htmlFor="classroll-input">{t('classroll_label')}</label>
                <div className="format-box">{t('classroll_format')}</div>
                <input
                  id="classroll-input"
                  type="text"
                  className="input-field"
                  placeholder={t('classroll_placeholder')}
                  value={classRoll}
                  onChange={e => { setClassRoll(e.target.value); setError(''); setResult(null); }}
                  onKeyDown={e => e.key === 'Enter' && handleRetrieve()}
                  autoComplete="off"
                />
                {error && (
                  <div className="error-message" role="alert"><XCircle size={14} /><span>{error}</span></div>
                )}
              </div>

              {result && <ResultDisplay result={result} t={t} copiedField={copiedField} copyToClipboard={copyToClipboard} />}

              <button className="action-button" onClick={handleRetrieve}>
                <Key size={18} /> <span>{t('retrieve_btn')}</span>
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer t={t} />
    </>
  );
}

// ==================== APS / SAMAJKALYAN APP (unchanged) ====================
const TabsHeader = ({ activeTab, setActiveTab, setPage, setUid, setResult, setError }) => (
  <div className="sub-navbar-tabs">
    <button className={`sub-tab ${activeTab === 'aps' ? 'active' : ''}`} onClick={() => {setActiveTab('aps'); setPage('home'); setUid(''); setResult(null); setError('');}}>APS Students</button>
    {/* <button className={`sub-tab ${activeTab === 'atomic' ? 'active' : ''}`} onClick={() => {setActiveTab('atomic'); setPage('retrieve'); setUid(''); setResult(null); setError('');}}>Atomic Energy</button> */}
    {/* <button className={`sub-tab ${activeTab === 'kles' ? 'active' : ''}`} onClick={() => {setActiveTab('kles'); setPage('retrieve'); setUid(''); setResult(null); setError('');}}>KLES</button> */}
    <button className={`sub-tab ${activeTab === 'teachers' ? 'active' : ''}`} onClick={() => {setActiveTab('teachers'); setPage('retrieve'); setUid(''); setResult(null); setError('');}}>APS Teachers</button>
  </div>
);

// --- APS App ---
function APSApp({ lang, t, toggleLang }) {
  const schoolPath = 'aps';
  const configAPS = SCHOOL_CONFIG[schoolPath];
  const configAtomic = {
    key: 'ATOMIC',
    format: 'Enter your Email Number (e.g., 3052 from abhinavr3052@...)',
    placeholder: 'E.g., 3052',
    samples: ['3052']
  };
  const configKles = {
    key: 'KLES',
    format: 'Enter your Email Number (e.g., 025406 from sanvi025406@...)',
    placeholder: 'E.g., 025406',
    samples: ['025406', '012271']
  };

  const [activeTab, setActiveTab] = useState('aps');
  const [page, setPage] = useState('home');
  const [uid, setUid] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copiedField, setCopiedField] = useState('');
  const [data, setData] = useState([]);
  const [teachersData, setTeachersData] = useState([]);
  const [namedTeachersData, setNamedTeachersData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [teachersLoaded, setTeachersLoaded] = useState(false);
  const [namedTeachersLoaded, setNamedTeachersLoaded] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [teacherSearchMode, setTeacherSearchMode] = useState('named');
  const [selectedApsSchool, setSelectedApsSchool] = useState('');
  const [apsSchoolSearch, setApsSchoolSearch] = useState('');
  const [apsSchoolDropdownOpen, setApsSchoolDropdownOpen] = useState(false);
  
  const [selectedStudentName, setSelectedStudentName] = useState('');
  const [studentNameSearch, setStudentNameSearch] = useState('');
  const [studentNameDropdownOpen, setStudentNameDropdownOpen] = useState(false);

  const [selectedTeacherSchool, setSelectedTeacherSchool] = useState('');
  const [teacherNameSearch, setTeacherNameSearch] = useState('');

  const [schoolDropdownOpen, setSchoolDropdownOpen] = useState(false);
  const [schoolSearch, setSchoolSearch] = useState('');
  const [nameDropdownOpen, setNameDropdownOpen] = useState(false);
  const [nameSearch, setNameSearch] = useState('');

  useEffect(() => {
    const handler = (e) => { 
      if (!e.target.closest('.school-dropdown')) setSchoolDropdownOpen(false); 
      if (!e.target.closest('.aps-school-dropdown')) setApsSchoolDropdownOpen(false);
      if (!e.target.closest('.name-dropdown')) setNameDropdownOpen(false); 
      if (!e.target.closest('.student-name-dropdown')) setStudentNameDropdownOpen(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  useEffect(() => {
    const handler = () => setShowStickyCta(window.scrollY > 300);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    fetch(BASE + 'students.json', { headers: { 'Bypass-Tunnel-Reminder': 'true' } })
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(json => {
        const d = json.filter(s => ['APS', 'ATOMIC', 'KLES'].includes(s.s)).map(s => ({
          id: s.i, name: s.n, email: s.e, password: s.p, school: s.s, schoolName: s.sn || ''
        }));
        setData(d); setIsLoaded(true);
      })
      .catch(() => console.log('Using fallback data.'));
      
    fetch(BASE + 'teachers.json', { headers: { 'Bypass-Tunnel-Reminder': 'true' } })
      .then(res => res.json())
      .then(json => { setTeachersData(json); setTeachersLoaded(true); })
      .catch(() => console.log('Using fallback teachers data.'));

    fetch(BASE + 'teachers_named.json', { headers: { 'Bypass-Tunnel-Reminder': 'true' } })
      .then(res => res.json())
      .then(json => { setNamedTeachersData(json); setNamedTeachersLoaded(true); })
      .catch(() => console.log('Using fallback named teachers data.'));
  }, []);

  const heroImgSrc = `${BASE}hero-${schoolPath}.png`;
  const currentConfig = activeTab === 'aps' ? configAPS : activeTab === 'atomic' ? configAtomic : configKles;

  const apsStudents = data.filter(s => s.school === 'APS' && s.schoolName === selectedApsSchool);
  const studentNames = Array.from(new Set(apsStudents.map(s => s.name))).filter(Boolean).sort();
  const filteredStudentNames = studentNames.filter(n => n.toLowerCase().includes(studentNameSearch.toLowerCase()));

  const handleRetrieve = () => {
    setError(''); setResult(null);
    
    if (activeTab === 'aps') {
      if (!selectedApsSchool) { setError('Please select an APS school'); return; }
      if (!selectedStudentName) { setError('Please select a student name'); return; }
      
      const found = data.find(s => 
        s.school === 'APS' && 
        s.schoolName === selectedApsSchool && 
        s.name === selectedStudentName
      );
      if (found) setResult(found); else setError('Student not found in selected branch.');
      return;
    }

    const currentKey = activeTab === 'atomic' ? 'ATOMIC' : 'KLES';
    if (!uid) { setError(t('enter_uid')); return; }
    const found = data.find(s => s.school === currentKey && s.id === uid);
    if (found) setResult(found); else setError(t('invalid_id'));
  };

  const handleRetrieveTeacher = () => {
    setError(''); setResult(null);
    if (!selectedTeacherSchool) { setError('Please select an APS school'); return; }
    if (!teacherNameSearch.trim()) { setError('Please enter the teacher name or ID'); return; }
    
    const activeData = teacherSearchMode === 'named' ? namedTeachersData : teachersData;
    const found = activeData.find(t => 
      t.sa === selectedTeacherSchool && 
      t.dn.toLowerCase() === teacherNameSearch.toLowerCase().trim()
    );
    
    if (found) {
      setResult({
        name: found.dn,
        schoolName: `${found.jt} | ${found.sa}`,
        email: found.id,
        password: found.pw
      });
    } else {
      setError('Teacher not found. Please check the details.');
    }
  };

  const handleDownloadTeacherCSV = () => {
    if (!selectedTeacherSchool) {
      setError('Please select an APS school first to download the CSV.');
      return;
    }
    const activeData = teacherSearchMode === 'named' ? namedTeachersData : teachersData;
    const schoolTeachers = activeData.filter(t => t.sa === selectedTeacherSchool);
    if (schoolTeachers.length === 0) {
      setError('No teachers found for this school.');
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "SA,FN,LN,DN,JT,DP,ID,PW,MN\n";
    schoolTeachers.forEach(t => {
      csvContent += `"${t.sa}","${t.fn}","${t.ln}","${t.dn}","${t.jt}","${t.dp}","${t.id}","${t.pw}","${t.mn}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${selectedTeacherSchool.replace(/\s+/g, '_')}_Teachers.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadApsCSV = () => {
    const targetSchool = activeTab === 'teachers' ? selectedTeacherSchool : selectedApsSchool;
    if (!targetSchool) {
      setError(activeTab === 'teachers' ? 'Please select a school first to download the Student CSV.' : 'Please select an APS school first to download the CSV.');
      return;
    }
    const branchStudents = data.filter(s => s.school === 'APS' && s.schoolName === targetSchool);
    if (branchStudents.length === 0) {
      setError('No students found for this school.');
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Unique ID,Name,Email,Password,School,Branch\n";
    branchStudents.forEach(s => {
      csvContent += `"${s.id}","${s.name}","${s.email}","${s.password}","${s.school}","${s.schoolName}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${targetSchool.replace(/\s+/g, '_')}_Students.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSampleClick = (sampleId) => {
    setUid(sampleId); setError(''); setResult(null);
    setTimeout(() => { 
      const currentKey = activeTab === 'aps' ? configAPS.key : activeTab === 'atomic' ? 'ATOMIC' : 'KLES';
      const found = data.find(s => s.school === currentKey && s.id === sampleId); 
      if (found) setResult(found); 
    }, 50);
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field); setTimeout(() => setCopiedField(''), 2000);
  };


  if (page === 'home' && activeTab === 'aps') {
    return (
      <>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navbar schoolPath={schoolPath} lang={lang} t={t} toggleLang={toggleLang} />
        <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} setPage={setPage} setUid={setUid} setResult={setResult} setError={setError} />
        <HeroSection schoolPath={schoolPath} t={t} heroImgSrc={heroImgSrc}>
          <button className="hero-cta-button shine-effect pulse-glow" onClick={() => setPage('retrieve')}>
            <Key size={20} className="cta-icon" /> {t('aps_retrieve_cta') || t('retrieve_cta')}
          </button>
        </HeroSection>
        <FeaturesBar schoolPath={schoolPath} t={t} />

        <TrendlineSlider images={sharedGalleryImages} />

        <section className="about-section" id="main-content">
          <h2 className="section-title">{t('aps_about_title')}</h2>
          <p className="section-desc">{t('aps_about_desc')}</p>
        </section>

        <section className="app-download-section" style={{ maxWidth: '800px', margin: '0 auto 60px', padding: '0 24px' }}>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '32px' }}>{t('shared_download_title')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="download-card" style={{ background: 'var(--bg-card)', padding: '32px 24px', borderRadius: '16px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://play.google.com/store/apps/details?id=com.adobe.spark.post&hl=en_IN" alt="Play Store QR" style={{ width: '130px', height: '130px', marginBottom: '20px', borderRadius: '8px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-dark)', fontFamily: "'Poppins', sans-serif" }}>Google Play Store</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: t('shared_play_desc') }}></p>
              <a href="https://play.google.com/store/apps/details?id=com.adobe.spark.post&hl=en_IN" target="_blank" rel="noreferrer" className="action-button" style={{ width: 'auto', padding: '12px 28px', minHeight: 'auto', fontSize: '14px', textDecoration: 'none' }}>{t('shared_play_btn')}</a>
            </div>
            <div className="download-card" style={{ background: 'var(--bg-card)', padding: '32px 24px', borderRadius: '16px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://tinyurl.com/yper8w4n" alt="App Store QR" style={{ width: '130px', height: '130px', marginBottom: '20px', borderRadius: '8px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-dark)', fontFamily: "'Poppins', sans-serif" }}>Apple App Store</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: t('shared_app_desc') }}></p>
              <a href="https://tinyurl.com/yper8w4n" target="_blank" rel="noreferrer" className="action-button" style={{ width: 'auto', padding: '12px 28px', minHeight: 'auto', fontSize: '14px', textDecoration: 'none' }}>{t('shared_app_btn')}</a>
            </div>
          </div>
        </section>

        <section className="important-section" style={{ maxWidth: '800px', margin: '0 auto 60px', padding: '0 24px' }}>
          <div style={{ background: '#ffffff', padding: '40px 32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontSize: '16px', color: '#334155', marginBottom: '32px', lineHeight: '1.6', textAlign: 'center', maxWidth: '680px' }} dangerouslySetInnerHTML={{ __html: t('shared_important_desc') }}></p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>🎥</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>{t('shared_tutorial_title')}</span>
              </div>
              <a href="https://youtu.be/iuuC3YYBUs8?si=2eb2lmhDBSuxAyRC" target="_blank" rel="noreferrer" style={{ background: '#3454b4', color: 'white', padding: '10px 24px', borderRadius: '8px', fontSize: '15px', fontWeight: '600', textDecoration: 'none', transition: 'background 0.2s', border: 'none' }}>{t('shared_tutorial_btn')}</a>
            </div>
          </div>
        </section>

        <Footer t={t} />

        {/* Floating CTA */}
        <button 
          className={`floating-cta-button shine-effect pulse-glow ${showStickyCta ? 'visible' : ''}`}
          onClick={() => setPage('retrieve')}
          aria-label={t('aps_retrieve_cta') || t('retrieve_cta')}
        >
          <Key size={22} className="cta-icon" />
          <span className="floating-text">{t('aps_retrieve_cta') || t('retrieve_cta')}</span>
        </button>
      </>
    );
  }

  const themeClass = activeTab === 'atomic' ? 'theme-atomic' : activeTab === 'kles' ? 'theme-kles' : activeTab === 'teachers' ? 'theme-teachers' : '';
  const title = activeTab === 'aps' ? "Student's User ID Recovery" : activeTab === 'teachers' ? "Teacher's User ID Recovery" : activeTab === 'atomic' ? 'Atomic Energy Recovery' : 'KLES Recovery';
  const subtitlePrefix = activeTab === 'aps' ? t('subtitle_loaded') : 'Instantly retrieve credentials for';
  
  const activeTeachersData = teacherSearchMode === 'named' ? namedTeachersData : teachersData;
  const currentDataCount = activeTab === 'teachers' ? (teacherSearchMode === 'named' ? (namedTeachersLoaded ? namedTeachersData.length : 0) : (teachersLoaded ? teachersData.length : 0)) : (isLoaded ? data.filter(s => s.school === (activeTab === 'aps' ? configAPS.key : activeTab === 'atomic' ? 'ATOMIC' : 'KLES')).length : 0);

  const uniqueSchools = Array.from(new Set(activeTeachersData.map(t => t.sa))).sort();
  const filteredSchools = uniqueSchools.filter(s => s.toLowerCase().includes(schoolSearch.toLowerCase()));

  const uniqueNames = Array.from(new Set(activeTeachersData.filter(t => t.sa === selectedTeacherSchool).map(t => t.dn))).sort((a, b) => {
    const numA = parseInt(a.replace(/[^\d]/g, ''), 10) || 0;
    const numB = parseInt(b.replace(/[^\d]/g, ''), 10) || 0;
    if (numA === numB) return a.localeCompare(b);
    return numA - numB;
  });
  const filteredNames = uniqueNames.filter(n => n.toLowerCase().includes(nameSearch.toLowerCase()));

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar schoolPath={schoolPath} lang={lang} t={t} toggleLang={toggleLang} />
      <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} setPage={setPage} setUid={setUid} setResult={setResult} setError={setError} />
      <div className={`retrieve-page ${themeClass}`}>
        {(activeTab === 'aps' || activeTab === 'teachers') && (
          <button className="back-button" onClick={() => { setPage('home'); setResult(null); setError(''); setActiveTab('aps'); }}>
            <ArrowLeft size={18} /> <span>{t('back_home')}</span>
          </button>
        )}
        <main id="main-content" className="main-content" style={{ marginTop: (activeTab !== 'aps' && activeTab !== 'teachers') ? '40px' : '0' }}>
          <div className="recovery-card">
            <div className="recovery-card-header">
              <div className="recovery-card-icon"><Key size={20} /></div>
              <div>
                <div className="recovery-card-title">{title}</div>
                {(activeTab !== 'teachers' && activeTab !== 'aps') && (
                  <div className="recovery-card-subtitle">
                    {isLoaded ? `${subtitlePrefix} ${currentDataCount.toLocaleString()} ${t('subtitle_students')}` : t('portal_title')}
                  </div>
                )}
              </div>
            </div>
            <div className="recovery-card-body">
              {(activeTab !== 'teachers' && activeTab !== 'aps') && (
                <div className="info-banner" role="note"><Info className="icon" size={18} /><span>{t('info_banner')}</span></div>
              )}
              
              {activeTab === 'aps' && (
                <>
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label className="label">Step 1: Select Branch</label>
                    <div className="custom-dropdown aps-school-dropdown">
                      <button className={`dropdown-trigger ${apsSchoolDropdownOpen ? 'open' : ''}`} onClick={() => setApsSchoolDropdownOpen(!apsSchoolDropdownOpen)} type="button">
                        <School size={16} className="dropdown-icon" />
                        <span className={selectedApsSchool ? 'dropdown-value' : 'dropdown-placeholder'}>
                          {selectedApsSchool || 'Search and select school...'}
                        </span>
                        <ChevronDown size={16} className={`dropdown-chevron ${apsSchoolDropdownOpen ? 'rotated' : ''}`} />
                      </button>
                      {apsSchoolDropdownOpen && (
                        <div className="dropdown-panel">
                          <div className="dropdown-search-box">
                            <Search size={14} />
                            <input type="text" placeholder="Type school name..." value={apsSchoolSearch} onChange={e => setApsSchoolSearch(e.target.value)} autoFocus />
                          </div>
                          <div className="dropdown-list">
                            {Array.from(new Set(data.filter(s => s.school === 'APS').map(s => s.schoolName))).filter(Boolean).sort().filter(s => s.toLowerCase().includes(apsSchoolSearch.toLowerCase())).map(school => (
                              <button key={school} className={`dropdown-item ${selectedApsSchool === school ? 'selected' : ''}`} onClick={() => { setSelectedApsSchool(school); setSelectedStudentName(''); setStudentNameSearch(''); setStudentNameDropdownOpen(false); setApsSchoolDropdownOpen(false); setApsSchoolSearch(''); setError(''); setResult(null); }}>
                                <span className="dropdown-item-name">{school}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'teachers' ? (
                <>
                  <div className="teacher-mode-tiles" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button 
                      className={`mode-tile ${teacherSearchMode === 'named' ? 'active' : ''}`}
                      onClick={() => { setTeacherSearchMode('named'); setSelectedTeacherSchool(''); setTeacherNameSearch(''); setResult(null); setError(''); }}
                      style={{ flex: 1, padding: '15px', borderRadius: '8px', border: teacherSearchMode === 'named' ? '2px solid #8b5cf6' : '1px solid #ccc', background: teacherSearchMode === 'named' ? '#f5f3ff' : '#fff', color: teacherSearchMode === 'named' ? '#8b5cf6' : '#666', cursor: 'pointer', textAlign: 'center', fontWeight: 'bold', transition: 'all 0.2s ease' }}>
                      <span style={{display: 'block', fontSize: '18px', marginBottom: '4px'}}>👨‍🏫</span> Teacher Name Search
                    </button>
                    <button 
                      className={`mode-tile ${teacherSearchMode === 'generic' ? 'active' : ''}`}
                      onClick={() => { setTeacherSearchMode('generic'); setSelectedTeacherSchool(''); setTeacherNameSearch(''); setResult(null); setError(''); }}
                      style={{ flex: 1, padding: '15px', borderRadius: '8px', border: teacherSearchMode === 'generic' ? '2px solid #8b5cf6' : '1px solid #ccc', background: teacherSearchMode === 'generic' ? '#f5f3ff' : '#fff', color: teacherSearchMode === 'generic' ? '#8b5cf6' : '#666', cursor: 'pointer', textAlign: 'center', fontWeight: 'bold', transition: 'all 0.2s ease' }}>
                      <span style={{display: 'block', fontSize: '18px', marginBottom: '4px'}}>🆔</span> Generic ID Search
                    </button>
                  </div>
                  <div className="form-group">
                    <label className="label">Step 1: Select Branch</label>
                    <div className="custom-dropdown school-dropdown">
                      <button className={`dropdown-trigger ${schoolDropdownOpen ? 'open' : ''}`} onClick={() => setSchoolDropdownOpen(!schoolDropdownOpen)} type="button">
                        <School size={16} className="dropdown-icon" />
                        <span className={selectedTeacherSchool ? 'dropdown-value' : 'dropdown-placeholder'}>
                          {selectedTeacherSchool || 'Search and select school...'}
                        </span>
                        <ChevronDown size={16} className={`dropdown-chevron ${schoolDropdownOpen ? 'rotated' : ''}`} />
                      </button>
                      {schoolDropdownOpen && (
                        <div className="dropdown-panel">
                          <div className="dropdown-search-box">
                            <Search size={14} />
                            <input type="text" placeholder="Type school name..." value={schoolSearch} onChange={e => setSchoolSearch(e.target.value)} autoFocus />
                          </div>
                          <div className="dropdown-list">
                            {filteredSchools.length === 0 && <div className="dropdown-empty">No schools found</div>}
                            {filteredSchools.map(sa => (
                              <button key={sa} className={`dropdown-item ${selectedTeacherSchool === sa ? 'selected' : ''}`}
                                onClick={() => { setSelectedTeacherSchool(sa); setSchoolDropdownOpen(false); setSchoolSearch(''); setTeacherNameSearch(''); setError(''); setResult(null); }}>
                                <span className="dropdown-item-name">{sa}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="label">Step 2: Select Teacher {teacherSearchMode === 'named' ? 'Name' : 'ID'}</label>
                    <div className={`custom-dropdown name-dropdown ${!selectedTeacherSchool ? 'disabled' : ''}`} style={!selectedTeacherSchool ? {opacity: 0.5, pointerEvents: 'none'} : {}}>
                      <button className={`dropdown-trigger ${nameDropdownOpen ? 'open' : ''}`} onClick={() => setNameDropdownOpen(!nameDropdownOpen)} type="button">
                        <Users size={16} className="dropdown-icon" />
                        <span className={teacherNameSearch ? 'dropdown-value' : 'dropdown-placeholder'}>
                          {teacherNameSearch || 'Search and select teacher...'}
                        </span>
                        <ChevronDown size={16} className={`dropdown-chevron ${nameDropdownOpen ? 'rotated' : ''}`} />
                      </button>
                      {nameDropdownOpen && (
                        <div className="dropdown-panel">
                          <div className="dropdown-search-box">
                            <Search size={14} />
                            <input type="text" placeholder="Type teacher name..." value={nameSearch} onChange={e => setNameSearch(e.target.value)} autoFocus />
                          </div>
                          <div className="dropdown-list">
                            {filteredNames.length === 0 && <div className="dropdown-empty">No teachers found</div>}
                            {filteredNames.map(dn => (
                              <button key={dn} className={`dropdown-item ${teacherNameSearch === dn ? 'selected' : ''}`}
                                onClick={() => { setTeacherNameSearch(dn); setNameDropdownOpen(false); setNameSearch(''); setError(''); setResult(null); }}>
                                <span className="dropdown-item-name">{dn}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {error && <div className="error-message" role="alert"><XCircle size={14} /><span>{error}</span></div>}
                  </div>
                </>
              ) : (
                <div className="form-group">
                  {activeTab === 'aps' ? (
                    <>
                      <label className="label">Step 2: Select Student Name</label>
                      <div className={`custom-dropdown student-name-dropdown ${!selectedApsSchool ? 'disabled' : ''}`} style={!selectedApsSchool ? {opacity: 0.5, pointerEvents: 'none'} : {}}>
                        <button className={`dropdown-trigger ${studentNameDropdownOpen ? 'open' : ''}`} onClick={() => setStudentNameDropdownOpen(!studentNameDropdownOpen)} type="button">
                          <Users size={16} className="dropdown-icon" />
                          <span className={selectedStudentName ? 'dropdown-value' : 'dropdown-placeholder'}>
                            {selectedStudentName || 'Search and select student...'}
                          </span>
                          <ChevronDown size={16} className={`dropdown-chevron ${studentNameDropdownOpen ? 'rotated' : ''}`} />
                        </button>
                        {studentNameDropdownOpen && (
                          <div className="dropdown-panel">
                            <div className="dropdown-search-box">
                              <Search size={14} />
                              <input type="text" placeholder="Type student name..." value={studentNameSearch} onChange={e => setStudentNameSearch(e.target.value)} autoFocus />
                            </div>
                            <div className="dropdown-list">
                              {filteredStudentNames.length === 0 && <div className="dropdown-empty">No students found</div>}
                              {filteredStudentNames.map(name => (
                                <button key={name} className={`dropdown-item ${selectedStudentName === name ? 'selected' : ''}`}
                                  onClick={() => { setSelectedStudentName(name); setStudentNameDropdownOpen(false); setStudentNameSearch(''); setError(''); setResult(null); }}>
                                  <span className="dropdown-item-name">{name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      {error && <div className="error-message" role="alert"><XCircle size={14} /><span>{error}</span></div>}
                    </>
                  ) : (
                    <>
                      <label className="label">{t('unique_id_label')}</label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder={currentConfig.placeholder}
                        value={uid}
                        onChange={e => { setUid(e.target.value); setError(''); setResult(null); }}
                        onKeyDown={e => e.key === 'Enter' && handleRetrieve()}
                      />
                      {error && <div className="error-message" id="uid-error" role="alert"><XCircle size={14} /><span>{error}</span></div>}
                      <div className="samples-container">
                        <div className="samples-label">{t('sample_ids_title')}:</div>
                        <div className="samples-list">
                          {currentConfig.samples.map(s => (
                            <button key={s} className="sample-btn" onClick={() => handleSampleClick(s)}>{s}</button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {result && <ResultDisplay result={result} t={t} copiedField={copiedField} copyToClipboard={copyToClipboard} />}
              
              {activeTab !== 'teachers' && activeTab !== 'aps' && (
                <div className="samples-box">
                  <h3 className="samples-title">{t('sample_ids_title')}</h3>
                  {currentConfig.samples.map(sampleId => (
                    <button key={sampleId} className="sample-button" onClick={() => handleSampleClick(sampleId)}>{sampleId}</button>
                  ))}
                </div>
              )}
              
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button className="action-button" onClick={activeTab === 'teachers' ? handleRetrieveTeacher : handleRetrieve} style={{ flex: 1, minWidth: '150px' }}>
                  <Key size={18} /><span>{t('retrieve_btn')}</span>
                </button>
                {activeTab === 'teachers' && (
                  <>
                    <button className="action-button" onClick={handleDownloadTeacherCSV} style={{ flex: 1, minWidth: '150px', background: '#10b981' }}>
                      <Copy size={18} /><span>{t('download_teacher_csv')}</span>
                    </button>
                    <button className="action-button" onClick={handleDownloadApsCSV} style={{ flex: 1, minWidth: '150px', background: '#059669' }}>
                      <Copy size={18} /><span>{t('download_student_csv')}</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer t={t} />
    </>
  );
}

// ==================== SAMAJ KALYAN APP ====================
function SamajKalyanApp({ lang, t, toggleLang }) {
  const [page, setPage] = useState('home');
  const [ashramSchools, setAshramSchools] = useState([]);
  const [ashramData, setAshramData] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [classRoll, setClassRoll] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copiedField, setCopiedField] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [schoolSearch, setSchoolSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const handler = () => setShowStickyCta(window.scrollY > 300);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    fetch(BASE + 'ashram-schools.json').then(r => r.json()).then(setAshramSchools).catch(() => {});
  }, []);

  useEffect(() => {
    fetch(BASE + 'students.json', { headers: { 'Bypass-Tunnel-Reminder': 'true' } })
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(json => {
        const d = json.filter(s => s.s === 'ASHRAM').map(s => ({
          id: s.i, name: s.n, email: s.e, password: s.p, school: s.s, schoolName: s.sn || ''
        }));
        setAshramData(d); setIsLoaded(true);
      })
      .catch(() => console.log('Using fallback data.'));
  }, []);

  const heroImgSrc = `${BASE}hero-samajkalyan.png`;

  const handleRetrieve = () => {
    setError(''); setResult(null);
    if (!selectedSchool) { setError(t('sk_select_school_error')); return; }
    if (!classRoll.trim()) { setError(t('enter_classroll_error')); return; }

    const school = ashramSchools.find(s => s.city === selectedSchool);
    if (!school) { setError(t('invalid_school')); return; }

    // Parse input like "6a1", "7b12", "10a5"
    const input = classRoll.trim().toLowerCase();
    const m = input.match(/^(\d+)([a-z])(\d+)$/);
    if (!m) { setError(t('sk_invalid_format')); return; }

    const cls = m[1];
    const section = m[2].toUpperCase();
    const roll = m[3].padStart(2, '0');
    const uniqueKey = `${school.city}-${cls}${section}-${roll}`;

    const found = ashramData.find(s => s.id.toLowerCase() === uniqueKey.toLowerCase());
    if (found) {
      setResult({ ...found, schoolName: found.schoolName || school.schoolName });
    } else {
      setError(t('student_not_found'));
    }
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field); setTimeout(() => setCopiedField(''), 2000);
  };

  const selectedSchoolObj = ashramSchools.find(s => s.city === selectedSchool);
  const filteredSchools = ashramSchools.filter(s =>
    s.schoolName.toLowerCase().includes(schoolSearch.toLowerCase()) ||
    s.city.toLowerCase().includes(schoolSearch.toLowerCase())
  );

  useEffect(() => {
    const handler = (e) => { if (!e.target.closest('.custom-dropdown')) setDropdownOpen(false); };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const skTrendlineImages = [
    'https://rapvmohanlko.in/public/aliganj/img/main-slider/1.jpg',
    'https://rapvmohanlko.in/public/aliganj/img/main-slider/2.jpg',
    'https://rapvmohanlko.in/public/aliganj/img/main-slider/3.jpg',
    'https://rapvmohanlko.in/public/aliganj/img/gallery/1.jpg',
    'https://rapvmohanlko.in/public/aliganj/img/gallery/2.jpg'
  ];

  if (page === 'home') {
    return (
      <>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navbar schoolPath="samajkalyan" lang={lang} t={t} toggleLang={toggleLang} />
        <HeroSection schoolPath="samajkalyan" t={t} heroImgSrc={heroImgSrc}>
          <button className="hero-cta-button shine-effect pulse-glow" onClick={() => setPage('retrieve')}>
            <Key size={20} className="cta-icon" /> {t('retrieve_cta')}
          </button>
        </HeroSection>
        <FeaturesBar schoolPath="samajkalyan" t={t} />

        <TrendlineSlider images={skTrendlineImages} />

        <section className="about-section" id="main-content">
          <h2 className="section-title">{t('shared_about_title')}</h2>
          <p className="section-desc">
            {t('shared_about_desc')}
          </p>
        </section>

        <section className="app-download-section" style={{ maxWidth: '800px', margin: '0 auto 60px', padding: '0 24px' }}>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '32px' }}>{t('shared_download_title')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="download-card" style={{ background: 'var(--bg-card)', padding: '32px 24px', borderRadius: '16px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://play.google.com/store/apps/details?id=com.adobe.spark.post&hl=en_IN" alt="Play Store QR" style={{ width: '130px', height: '130px', marginBottom: '20px', borderRadius: '8px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-dark)', fontFamily: "'Poppins', sans-serif" }}>Google Play Store</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: t('shared_play_desc') }}></p>
              <a href="https://play.google.com/store/apps/details?id=com.adobe.spark.post&hl=en_IN" target="_blank" rel="noreferrer" className="action-button" style={{ width: 'auto', padding: '12px 28px', minHeight: 'auto', fontSize: '14px', textDecoration: 'none' }}>{t('shared_play_btn')}</a>
            </div>
            <div className="download-card" style={{ background: 'var(--bg-card)', padding: '32px 24px', borderRadius: '16px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://tinyurl.com/yper8w4n" alt="App Store QR" style={{ width: '130px', height: '130px', marginBottom: '20px', borderRadius: '8px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-dark)', fontFamily: "'Poppins', sans-serif" }}>Apple App Store</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: t('shared_app_desc') }}></p>
              <a href="https://tinyurl.com/yper8w4n" target="_blank" rel="noreferrer" className="action-button" style={{ width: 'auto', padding: '12px 28px', minHeight: 'auto', fontSize: '14px', textDecoration: 'none' }}>{t('shared_app_btn')}</a>
            </div>
          </div>
        </section>

        <section className="important-section" style={{ maxWidth: '800px', margin: '0 auto 60px', padding: '0 24px' }}>
          <div style={{ background: '#ffffff', padding: '40px 32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontSize: '16px', color: '#334155', marginBottom: '32px', lineHeight: '1.6', textAlign: 'center', maxWidth: '680px' }} dangerouslySetInnerHTML={{ __html: t('shared_important_desc') }}></p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>🎥</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>{t('shared_tutorial_title')}</span>
              </div>
              <a href="https://youtu.be/iuuC3YYBUs8?si=2eb2lmhDBSuxAyRC" target="_blank" rel="noreferrer" style={{ background: '#3454b4', color: 'white', padding: '10px 24px', borderRadius: '8px', fontSize: '15px', fontWeight: '600', textDecoration: 'none', transition: 'background 0.2s', border: 'none' }}>{t('shared_tutorial_btn')}</a>
            </div>
          </div>
        </section>

        <Footer t={t} />

        {/* Floating CTA */}
        <button 
          className={`floating-cta-button shine-effect pulse-glow ${showStickyCta ? 'visible' : ''}`}
          onClick={() => setPage('retrieve')}
          aria-label={t('retrieve_cta')}
        >
          <Key size={22} className="cta-icon" />
          <span className="floating-text">{t('retrieve_cta')}</span>
        </button>
      </>
    );
  }

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar schoolPath="samajkalyan" lang={lang} t={t} toggleLang={toggleLang} />
      <div className="retrieve-page">
        <button className="back-button" onClick={() => { setPage('home'); setResult(null); setError(''); }}>
          <ArrowLeft size={18} /> <span>{t('back_home')}</span>
        </button>
        <main id="main-content" className="main-content">
          <div className="recovery-card">
            <div className="recovery-card-header">
              <div className="recovery-card-icon"><Key size={20} /></div>
              <div>
                <div className="recovery-card-title">{t('sk_retrieve_title')}</div>
                <div className="recovery-card-subtitle">
                  {isLoaded ? `${ashramData.length.toLocaleString()} ${t('subtitle_students')}` : t('loading_data')}
                </div>
              </div>
            </div>
            <div className="recovery-card-body">
              <div className="info-banner" role="note">
                <Info className="icon" size={18} />
                <span>{t('sk_info_banner')}</span>
              </div>
              <div className="form-group">
                <label className="label">{t('sk_select_school_label')}</label>
                <div className="custom-dropdown">
                  <button className={`dropdown-trigger ${dropdownOpen ? 'open' : ''}`} onClick={() => setDropdownOpen(!dropdownOpen)} type="button">
                    <School size={16} className="dropdown-icon" />
                    <span className={selectedSchoolObj ? 'dropdown-value' : 'dropdown-placeholder'}>
                      {selectedSchoolObj ? `${selectedSchoolObj.schoolName}, ${selectedSchoolObj.city}` : t('sk_select_placeholder')}
                    </span>
                    <ChevronDown size={16} className={`dropdown-chevron ${dropdownOpen ? 'rotated' : ''}`} />
                  </button>
                  {dropdownOpen && (
                    <div className="dropdown-panel">
                      <div className="dropdown-search-box">
                        <Search size={14} />
                        <input type="text" placeholder={t('sk_search_school')} value={schoolSearch} onChange={e => setSchoolSearch(e.target.value)} autoFocus />
                      </div>
                      <div className="dropdown-list">
                        {filteredSchools.length === 0 && <div className="dropdown-empty">{t('no_schools_found')}</div>}
                        {filteredSchools.map(s => (
                          <button key={s.city} className={`dropdown-item ${selectedSchool === s.city ? 'selected' : ''}`}
                            onClick={() => { setSelectedSchool(s.city); setDropdownOpen(false); setSchoolSearch(''); setError(''); setResult(null); }}>
                            <span className="dropdown-item-name">{s.schoolName}</span>
                            <span className="dropdown-item-city">{s.city}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label className="label" htmlFor="sk-classroll-input">{t('classroll_label')}</label>
                <div className="format-box">{t('sk_classroll_format')}</div>
                <input id="sk-classroll-input" type="text" className="input-field" placeholder={t('sk_classroll_placeholder')}
                  value={classRoll} onChange={e => { setClassRoll(e.target.value); setError(''); setResult(null); }}
                  onKeyDown={e => e.key === 'Enter' && handleRetrieve()} autoComplete="off" />
                {error && <div className="error-message" role="alert"><XCircle size={14} /><span>{error}</span></div>}
              </div>
              {result && <ResultDisplay result={result} t={t} copiedField={copiedField} copyToClipboard={copyToClipboard} />}
              <button className="action-button" onClick={handleRetrieve}><Key size={18} /> <span>{t('retrieve_btn')}</span></button>
            </div>
          </div>
        </main>
      </div>
      <Footer t={t} />
    </>
  );
}

const GenericTabsHeader = ({ activeTab, setActiveTab, setPage, setUid, setResult, setError, schoolName, t }) => (
  <div className="sub-navbar-tabs">
    <button className={`sub-tab ${activeTab === 'students' ? 'active' : ''}`} onClick={() => {setActiveTab('students'); setPage('home'); setUid(''); setResult(null); setError('');}}>{schoolName} {t('students_tab')}</button>
    <button className={`sub-tab ${activeTab === 'teachers' ? 'active' : ''}`} onClick={() => {setActiveTab('teachers'); setPage('retrieve'); setUid(''); setResult(null); setError('');}}>{schoolName} {t('teachers_tab')}</button>
  </div>
);

// --- Generic Branch App ---
function GenericBranchApp({ schoolPath, lang, t, toggleLang }) {
  const config = SCHOOL_CONFIG[schoolPath];
  const [activeTab, setActiveTab] = useState('students');
  const [page, setPage] = useState('home');
  const [uid, setUid] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copiedField, setCopiedField] = useState('');
  
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [teacherData, setTeacherData] = useState([]);
  const [isTeacherLoaded, setIsTeacherLoaded] = useState(false);

  const [selectedBranch, setSelectedBranch] = useState('');
  const [branchSearch, setBranchSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [selectedStudentName, setSelectedStudentName] = useState('');
  const [studentNameSearch, setStudentNameSearch] = useState('');
  const [studentNameDropdownOpen, setStudentNameDropdownOpen] = useState(false);

  const [selectedTeacherBranch, setSelectedTeacherBranch] = useState('');
  const [teacherNameSearch, setTeacherNameSearch] = useState('');
  const [selectedTeacherName, setSelectedTeacherName] = useState('');
  const [teacherNameDropdownOpen, setTeacherNameDropdownOpen] = useState(false);

  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    // Reset all lookup states when active tab changes
    setSelectedBranch('');
    setBranchSearch('');
    setDropdownOpen(false);
    setSelectedStudentName('');
    setStudentNameSearch('');
    setStudentNameDropdownOpen(false);
    setSelectedTeacherBranch('');
    setTeacherNameSearch('');
    setSelectedTeacherName('');
    setTeacherNameDropdownOpen(false);
    setError('');
    setResult(null);
  }, [activeTab]);

  useEffect(() => {
    const handler = () => setShowStickyCta(window.scrollY > 300);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    fetch(BASE + 'students.json', { headers: { 'Bypass-Tunnel-Reminder': 'true' } })
      .then(res => res.json())
      .then(json => {
        const d = json.filter(s => s.s === config.key).map(s => ({
          id: s.i, name: s.n, email: s.e, password: s.p, school: s.s, schoolName: s.sn || ''
        }));
        setData(d); setIsLoaded(true);
      })
      .catch(() => console.log('Using fallback data.'));
      
    fetch(BASE + `teachers_${schoolPath}.json`, { headers: { 'Bypass-Tunnel-Reminder': 'true' } })
      .then(res => res.json())
      .then(json => {
        setTeacherData(json);
        setIsTeacherLoaded(true);
      })
      .catch(() => console.log('Using fallback teacher data.'));
  }, [config.key, schoolPath]);

  const branches = Array.from(new Set(data.map(s => s.schoolName))).filter(Boolean).sort();
  const filteredBranches = branches.filter(b => b.toLowerCase().includes(branchSearch.toLowerCase()));

  const branchStudentNames = Array.from(new Set(data.filter(s => s.schoolName === selectedBranch).map(s => s.name))).filter(Boolean).sort();
  const filteredStudentNames = branchStudentNames.filter(n => n.toLowerCase().includes(studentNameSearch.toLowerCase()));

  const teacherBranches = Array.from(new Set(teacherData.map(t => t.sa))).filter(Boolean).sort();
  const filteredTeacherBranches = teacherBranches.filter(b => b.toLowerCase().includes(branchSearch.toLowerCase()));

  const branchTeachers = teacherData.filter(t => t.sa === selectedTeacherBranch).map(t => t.dn).filter(Boolean).sort();
  const filteredTeacherNames = branchTeachers.filter(n => n.toLowerCase().includes(teacherNameSearch.toLowerCase()));

  const handleRetrieve = () => {
    setError(''); setResult(null);
    if (!selectedBranch) { setError('Please select a branch'); return; }
    if (!selectedStudentName) { setError('Please select a student name'); return; }
    
    const found = data.find(s => s.schoolName === selectedBranch && s.name === selectedStudentName);
    if (found) setResult(found); else setError('Student not found in selected branch.');
  };

  const handleRetrieveTeacher = () => {
    setError(''); setResult(null);
    if (!selectedTeacherBranch) { setError('Please select a branch'); return; }
    if (!selectedTeacherName) { setError('Please select a teacher name'); return; }
    
    const found = teacherData.find(t => 
      t.sa === selectedTeacherBranch && 
      t.dn === selectedTeacherName
    );
    
    if (found) {
      setResult({
        name: found.dn,
        schoolName: found.sa,
        email: found.id,
        password: found.pw
      });
    } else {
      setError('Teacher not found. Please check the details.');
    }
  };

  const handleDownloadStudentCSVFromTeacher = () => {
    if (!selectedTeacherBranch) { setError('Please select a branch first to download the Student CSV.'); return; }
    const branchStudents = data.filter(s => s.schoolName === selectedTeacherBranch);
    if (branchStudents.length === 0) { setError('No students found for this branch.'); return; }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Unique ID,Name,Email,Password,School,Branch\n";
    branchStudents.forEach(s => {
      csvContent += `"${s.id}","${s.name}","${s.email}","${s.password}","${s.school}","${s.schoolName}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${selectedTeacherBranch.replace(/\s+/g, '_')}_Students.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadTeacherCSV = () => {
    if (!selectedTeacherBranch) { setError('Please select a branch first to download the CSV.'); return; }
    const branchTeachers = teacherData.filter(t => t.sa === selectedTeacherBranch);
    if (branchTeachers.length === 0) { setError('No teachers found for this branch.'); return; }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Branch,Name,ID,Password\n";
    branchTeachers.forEach(t => {
      csvContent += `"${t.sa}","${t.dn}","${t.id}","${t.pw}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${selectedTeacherBranch.replace(/\s+/g, '_')}_Teachers.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field); setTimeout(() => setCopiedField(''), 2000);
  };

  const heroImgSrc = `${BASE}hero-${schoolPath}.png`;
  const schoolLabel = schoolPath === 'kle' ? 'KLE' : 'AECS';
  
  if (page === 'home' && activeTab === 'students') {
    return (
      <>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navbar schoolPath={schoolPath} lang={lang} t={t} toggleLang={toggleLang} />
        <GenericTabsHeader activeTab={activeTab} setActiveTab={setActiveTab} setPage={setPage} setUid={setUid} setResult={setResult} setError={setError} schoolName={schoolLabel} t={t} />
        <HeroSection schoolPath={schoolPath} t={t} heroImgSrc={heroImgSrc}>
          <button className="hero-cta-button shine-effect pulse-glow" onClick={() => setPage('retrieve')}>
            <Key size={20} className="cta-icon" /> {t(`${schoolPath}_retrieve_cta`) || t('retrieve_cta')}
          </button>
        </HeroSection>
        <FeaturesBar schoolPath={schoolPath} t={t} />
        
        <TrendlineSlider images={sharedGalleryImages} />

        <section className="about-section" id="main-content">
          <h2 className="section-title">{t('shared_about_title')}</h2>
          <p className="section-desc">
            {t('shared_about_desc')}
          </p>
        </section>

        <section className="app-download-section" style={{ maxWidth: '800px', margin: '0 auto 60px', padding: '0 24px' }}>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '32px' }}>{t('shared_download_title')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="download-card" style={{ background: 'var(--bg-card)', padding: '32px 24px', borderRadius: '16px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://play.google.com/store/apps/details?id=com.adobe.spark.post&hl=en_IN" alt="Play Store QR" style={{ width: '130px', height: '130px', marginBottom: '20px', borderRadius: '8px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-dark)', fontFamily: "'Poppins', sans-serif" }}>Google Play Store</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: t('shared_play_desc') }}></p>
              <a href="https://play.google.com/store/apps/details?id=com.adobe.spark.post&hl=en_IN" target="_blank" rel="noreferrer" className="action-button" style={{ width: 'auto', padding: '12px 28px', minHeight: 'auto', fontSize: '14px', textDecoration: 'none' }}>{t('shared_play_btn')}</a>
            </div>
            <div className="download-card" style={{ background: 'var(--bg-card)', padding: '32px 24px', borderRadius: '16px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://tinyurl.com/yper8w4n" alt="App Store QR" style={{ width: '130px', height: '130px', marginBottom: '20px', borderRadius: '8px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-dark)', fontFamily: "'Poppins', sans-serif" }}>Apple App Store</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: t('shared_app_desc') }}></p>
              <a href="https://tinyurl.com/yper8w4n" target="_blank" rel="noreferrer" className="action-button" style={{ width: 'auto', padding: '12px 28px', minHeight: 'auto', fontSize: '14px', textDecoration: 'none' }}>{t('shared_app_btn')}</a>
            </div>
          </div>
        </section>

        <section className="important-section" style={{ maxWidth: '800px', margin: '0 auto 60px', padding: '0 24px' }}>
          <div style={{ background: '#ffffff', padding: '40px 32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontSize: '16px', color: '#334155', marginBottom: '32px', lineHeight: '1.6', textAlign: 'center', maxWidth: '680px' }} dangerouslySetInnerHTML={{ __html: t('shared_important_desc') }}></p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>🎥</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>{t('shared_tutorial_title')}</span>
              </div>
              <a href="https://youtu.be/iuuC3YYBUs8?si=2eb2lmhDBSuxAyRC" target="_blank" rel="noreferrer" style={{ background: '#3454b4', color: 'white', padding: '10px 24px', borderRadius: '8px', fontSize: '15px', fontWeight: '600', textDecoration: 'none', transition: 'background 0.2s', border: 'none' }}>{t('shared_tutorial_btn')}</a>
            </div>
          </div>
        </section>

        <Footer t={t} />
        <button className={`floating-cta-button shine-effect pulse-glow ${showStickyCta ? 'visible' : ''}`} onClick={() => setPage('retrieve')}>
          <Key size={22} className="cta-icon" /> <span className="floating-text">{t(`${schoolPath}_retrieve_cta`) || t('retrieve_cta')}</span>
        </button>
      </>
    );
  }

  return (
    <>
      <Navbar schoolPath={schoolPath} lang={lang} t={t} toggleLang={toggleLang} />
      <GenericTabsHeader activeTab={activeTab} setActiveTab={setActiveTab} setPage={setPage} setUid={setUid} setResult={setResult} setError={setError} schoolName={schoolLabel} t={t} />
      <div className={`retrieve-page theme-${schoolPath}`}>
        <button className="back-button" onClick={() => { setActiveTab('students'); setPage('home'); setResult(null); setError(''); }}>
          <ArrowLeft size={18} /> <span>{t('back_home')}</span>
        </button>
        <main id="main-content" className="main-content" style={{ marginTop: activeTab === 'teachers' ? '40px' : '0' }}>
          <div className="recovery-card">
            <div className="recovery-card-header">
              <div className="recovery-card-icon"><Key size={20} /></div>
              <div>
                <div className="recovery-card-title">{activeTab === 'students' ? t('students_title') : t('teachers_title')}</div>
                <div className="recovery-card-subtitle">
                  {activeTab === 'students' 
                    ? (isLoaded ? `Instantly retrieve credentials for ${data.length.toLocaleString()} ${t('subtitle_students')}` : t('loading_data'))
                    : (isTeacherLoaded ? `Instantly retrieve credentials for ${teacherData.length.toLocaleString()} Teachers` : t('loading_data'))
                  }
                </div>
              </div>
            </div>
            
            {activeTab === 'students' ? (
              <div className="recovery-card-body">
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label className="label">{t('step1_branch')}</label>
                  <div className="custom-dropdown school-dropdown">
                    <button className={`dropdown-trigger ${dropdownOpen ? 'open' : ''}`} onClick={() => setDropdownOpen(!dropdownOpen)} type="button">
                      <School size={16} className="dropdown-icon" />
                      <span className={selectedBranch ? 'dropdown-value' : 'dropdown-placeholder'}>
                        {selectedBranch || t('search_branch')}
                      </span>
                      <ChevronDown size={16} className={`dropdown-chevron ${dropdownOpen ? 'rotated' : ''}`} />
                    </button>
                    {dropdownOpen && (
                      <div className="dropdown-panel">
                        <div className="dropdown-search-box">
                          <Search size={14} />
                          <input type="text" placeholder={t('type_branch')} value={branchSearch} onChange={e => setBranchSearch(e.target.value)} autoFocus />
                        </div>
                        <div className="dropdown-list">
                          {filteredBranches.map(b => (
                            <button key={b} className={`dropdown-item ${selectedBranch === b ? 'selected' : ''}`} onClick={() => { setSelectedBranch(b); setDropdownOpen(false); setBranchSearch(''); setSelectedStudentName(''); setStudentNameSearch(''); setError(''); setResult(null); }}>
                              <span className="dropdown-item-name">{b}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="label">{t('step2_student')}</label>
                  <div className="custom-dropdown school-dropdown">
                    <button className={`dropdown-trigger ${studentNameDropdownOpen ? 'open' : ''}`} onClick={() => setStudentNameDropdownOpen(!studentNameDropdownOpen)} type="button">
                      <School size={16} className="dropdown-icon" />
                      <span className={selectedStudentName ? 'dropdown-value' : 'dropdown-placeholder'}>
                        {selectedStudentName || t('search_student')}
                      </span>
                      <ChevronDown size={16} className={`dropdown-chevron ${studentNameDropdownOpen ? 'rotated' : ''}`} />
                    </button>
                    {studentNameDropdownOpen && (
                      <div className="dropdown-panel">
                        <div className="dropdown-search-box">
                          <Search size={14} />
                          <input type="text" placeholder={t('type_student')} value={studentNameSearch} onChange={e => setStudentNameSearch(e.target.value)} autoFocus />
                        </div>
                        <div className="dropdown-list">
                          {filteredStudentNames.length === 0 && <div className="dropdown-item" style={{ color: '#64748b', cursor: 'default' }}>{t('no_students')}</div>}
                          {filteredStudentNames.map(name => (
                            <button key={name} className={`dropdown-item ${selectedStudentName === name ? 'selected' : ''}`} onClick={() => { setSelectedStudentName(name); setStudentNameDropdownOpen(false); setStudentNameSearch(''); setError(''); setResult(null); }}>
                              <span className="dropdown-item-name">{name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {error && <div className="error-message" role="alert"><XCircle size={14} /><span>{error}</span></div>}
                </div>

                {result && <ResultDisplay result={result} t={t} copiedField={copiedField} copyToClipboard={copyToClipboard} />}

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button className="action-button" onClick={handleRetrieve} style={{ flex: 1, minWidth: '150px' }}>
                    <Key size={18} /><span>{t('retrieve_btn')}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="recovery-card-body">
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label className="label">{t('step1_branch')}</label>
                  <div className="custom-dropdown school-dropdown">
                    <button className={`dropdown-trigger ${dropdownOpen ? 'open' : ''}`} onClick={() => setDropdownOpen(!dropdownOpen)} type="button">
                      <School size={16} className="dropdown-icon" />
                      <span className={selectedTeacherBranch ? 'dropdown-value' : 'dropdown-placeholder'}>
                        {selectedTeacherBranch || t('search_branch')}
                      </span>
                      <ChevronDown size={16} className={`dropdown-chevron ${dropdownOpen ? 'rotated' : ''}`} />
                    </button>
                    {dropdownOpen && (
                      <div className="dropdown-panel">
                        <div className="dropdown-search-box">
                          <Search size={14} />
                          <input type="text" placeholder={t('type_branch')} value={branchSearch} onChange={e => setBranchSearch(e.target.value)} autoFocus />
                        </div>
                        <div className="dropdown-list">
                          {filteredTeacherBranches.map(b => (
                            <button key={b} className={`dropdown-item ${selectedTeacherBranch === b ? 'selected' : ''}`} onClick={() => { setSelectedTeacherBranch(b); setDropdownOpen(false); setBranchSearch(''); setSelectedTeacherName(''); setTeacherNameSearch(''); setError(''); setResult(null); }}>
                              <span className="dropdown-item-name">{b}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="label">{t('step2_teacher')}</label>
                  <div className="custom-dropdown school-dropdown">
                    <button className={`dropdown-trigger ${teacherNameDropdownOpen ? 'open' : ''}`} onClick={() => setTeacherNameDropdownOpen(!teacherNameDropdownOpen)} type="button">
                      <School size={16} className="dropdown-icon" />
                      <span className={selectedTeacherName ? 'dropdown-value' : 'dropdown-placeholder'}>
                        {selectedTeacherName || t('search_teacher')}
                      </span>
                      <ChevronDown size={16} className={`dropdown-chevron ${teacherNameDropdownOpen ? 'rotated' : ''}`} />
                    </button>
                    {teacherNameDropdownOpen && (
                      <div className="dropdown-panel">
                        <div className="dropdown-search-box">
                          <Search size={14} />
                          <input type="text" placeholder={t('type_teacher')} value={teacherNameSearch} onChange={e => setTeacherNameSearch(e.target.value)} autoFocus />
                        </div>
                        <div className="dropdown-list">
                          {filteredTeacherNames.length === 0 && <div className="dropdown-item" style={{ color: '#64748b', cursor: 'default' }}>{t('no_teachers')}</div>}
                          {filteredTeacherNames.map(name => (
                            <button key={name} className={`dropdown-item ${selectedTeacherName === name ? 'selected' : ''}`} onClick={() => { setSelectedTeacherName(name); setTeacherNameDropdownOpen(false); setTeacherNameSearch(''); setError(''); setResult(null); }}>
                              <span className="dropdown-item-name">{name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {error && <div className="error-message" role="alert"><XCircle size={14} /><span>{error}</span></div>}
                </div>

                {result && <ResultDisplay result={result} t={t} copiedField={copiedField} copyToClipboard={copyToClipboard} />}

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button className="action-button" onClick={handleRetrieveTeacher} style={{ flex: 1, minWidth: '150px' }}>
                    <Key size={18} /><span>{t('retrieve_btn')}</span>
                  </button>
                  <button className="action-button" onClick={handleDownloadTeacherCSV} style={{ flex: 1, minWidth: '150px', background: '#10b981' }}>
                    <Copy size={18} /><span>{t('download_teacher_csv')}</span>
                  </button>
                  <button className="action-button" onClick={handleDownloadStudentCSVFromTeacher} style={{ flex: 1, minWidth: '150px', background: '#059669' }}>
                    <Copy size={18} /><span>{t('download_student_csv')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer t={t} />
    </>
  );
}

// --- Landing Page ---
function LandingPage({ t }) {
  const [searchQuery, setSearchQuery] = useState('');

  const portals = [
    {
      path: 'kgbv',
      name: '🌸 KGBV Schools',
      sub: 'Kasturba Gandhi Balika Vidyalaya',
      desc: 'Residential girls schools across Uttar Pradesh empowering young women in digital literacy and creative arts.',
      accentClass: 'kgbv'
    },
    {
      path: 'samajkalyan',
      name: '🌿 Samaj Kalyan',
      sub: 'Social Welfare Ashram Schools',
      desc: 'Residential academies uplifting children of marginalized communities with high-quality education and support.',
      accentClass: 'samajkalyan'
    },
    {
      path: 'aps',
      name: '🛡️ Army Public Schools',
      sub: 'APS Student & Teacher Hub',
      desc: 'Comprehensive credentials retrieval portal for teachers and students across multiple APS school branches.',
      accentClass: 'aps'
    },
    {
      path: 'kle',
      name: '🎓 KLE Schools',
      sub: 'Karnataka Lingayat Education',
      desc: 'State-of-the-art educational credentials service for students and faculty across the KLE society network.',
      accentClass: 'kle'
    },
    {
      path: 'aecs',
      name: '⚛️ Atomic Energy Central School',
      sub: 'AECS Student & Teacher Portal',
      desc: 'High-quality educational portal lookup servicing student and teaching staff at atomic energy central divisions.',
      accentClass: 'aecs'
    }
  ];

  const filteredPortals = portals.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sub.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="landing-page-container">
      <div className="landing-header">
        <div className="landing-logo-container">
          <div className="landing-brand-badge">
            <Sparkles size={13} style={{ marginRight: '4px' }} />
            Adobe Express for Education
          </div>
        </div>
        <h1 className="landing-main-title">Unified Account Recovery Hub</h1>
        <p className="landing-main-desc">
          Welcome to the credentials management directory. This secure platform assists students, teachers, and school administrators in recovering their premium <a href="https://new.express.adobe.com/" target="_blank" rel="noreferrer" className="adobe-link-inline">Adobe Express for Education ↗</a> user IDs, passwords, and classroom rosters. 
          Select your affiliated school network below to continue.
        </p>
      </div>

      <div className="landing-search-container">
        <div className="landing-search-wrapper">
          <Search size={20} className="search-bar-icon" />
          <input 
            type="text" 
            placeholder="Search school network or branch..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="landing-search-input"
          />
          {searchQuery && (
            <button 
              className="landing-search-clear" 
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="landing-grid">
        {filteredPortals.map(p => (
          <a key={p.path} href={`${BASE}${p.path}`} className={`landing-card-new portal-accent-${p.accentClass}`}>
            <div className="landing-card-icon-wrapper">
              <School size={24} />
            </div>
            <div className="landing-card-info">
              <h3 className="landing-card-name">{p.name}</h3>
              <h4 className="landing-card-sub">{p.sub}</h4>
              <p className="landing-card-desc">{p.desc}</p>
            </div>
            <div className="landing-card-action">
              <span>Access Portal</span>
              <span className="arrow-icon">→</span>
            </div>
          </a>
        ))}
        {filteredPortals.length === 0 && (
          <div className="landing-no-results">
            <School size={48} className="no-results-icon" />
            <h3>No school networks found</h3>
            <p>We couldn't find any school network matching "{searchQuery}". Please try another search term.</p>
            <button className="reset-search-btn" onClick={() => setSearchQuery('')}>Clear Search</button>
          </div>
        )}
      </div>

      {/* Modern Adobe Express Promo Section */}
      <div className="adobe-promo-section">
        <div className="adobe-promo-bg-glow"></div>
        <div className="promo-split-container">
          
          {/* Left Column: Promo text and download buttons */}
          <div className="promo-text-column">
            <div className="promo-badge">Empowering Digital Creativity</div>
            <h2 className="promo-title">Create Beautiful Classroom Work With Adobe Express</h2>
            <p className="promo-text">
              Adobe Express for Education gives students and teachers access to powerful generative AI tools, ready-to-use school presentation templates, poster designs, video editing features, and classroom worksheets. Download the app today and unleash your imagination.
            </p>
            
            <div className="download-badges-flex">
              <a href="https://play.google.com/store/apps/details?id=com.adobe.spark.post" target="_blank" rel="noreferrer" className="download-app-btn play-store-badge">
                <Smartphone size={20} />
                <div className="badge-text">
                  <span className="badge-sub">GET IT ON</span>
                  <span className="badge-main">Google Play</span>
                </div>
              </a>
              
              <a href="https://apps.apple.com/us/app/adobe-express-design-photo/id1051937837" target="_blank" rel="noreferrer" className="download-app-btn app-store-badge">
                <Laptop size={20} />
                <div className="badge-text">
                  <span className="badge-sub">Download on the</span>
                  <span className="badge-main">App Store</span>
                </div>
              </a>
            </div>

            {/* Video Link */}
            <div className="promo-video-cta">
              <div className="video-cta-icon">📺</div>
              <div className="video-cta-content">
                <h4 className="video-cta-title">Need login help?</h4>
                <p className="video-cta-desc">Watch our step-by-step video guide to sign in easily.</p>
                <a href="https://youtu.be/iuuC3YYBUs8?si=2eb2lmhDBSuxAyRC" target="_blank" rel="noreferrer" className="video-link-btn">
                  Watch Login Tutorial Video
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: QRs side by side */}
          <div className="promo-qr-column">
            <h3 className="qr-section-title">Scan to Download App</h3>
            <div className="qr-cards-container">
              <div className="qr-card">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://play.google.com/store/apps/details?id=com.adobe.spark.post&hl=en_IN" alt="Play Store QR" className="qr-code-img" />
                <span className="qr-card-label">Android QR</span>
              </div>
              <div className="qr-card">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://tinyurl.com/yper8w4n" alt="App Store QR" className="qr-code-img" />
                <span className="qr-card-label">iOS QR</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="landing-footer">
        <p>Powered by <strong>Adobe Express for Education</strong> initiative. All Rights Reserved &copy; {new Date().getFullYear()}.</p>
      </div>
    </div>
  );
}

// ==================== ROOT APP ====================
function App() {
  const schoolPath = getSchoolFromPath();
  const config = schoolPath && schoolPath !== 'landing' ? SCHOOL_CONFIG[schoolPath] : null;
  const { lang, t, toggleLang } = useLang(schoolPath);

  useEffect(() => {
    if (schoolPath && schoolPath !== 'landing') {
      document.documentElement.setAttribute('data-school', schoolPath);
      
      // Block browser back button to prevent navigating to other segments
      window.history.pushState(null, '', window.location.href);
      const handlePopState = () => {
        window.history.pushState(null, '', window.location.href);
      };
      window.addEventListener('popstate', handlePopState);
      
      return () => {
        document.documentElement.removeAttribute('data-school');
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [schoolPath]);

  if (schoolPath === 'landing') {
    return <LandingPage t={t} />;
  }

  if (!config) {
    return (<><Navbar schoolPath={null} lang={lang} t={t} toggleLang={toggleLang} /><NotFound t={t} /><Footer t={t} /></>);
  }

  if (schoolPath === 'kgbv') return <KGBVApp lang={lang} t={t} toggleLang={toggleLang} />;
  if (schoolPath === 'samajkalyan') return <SamajKalyanApp lang={lang} t={t} toggleLang={toggleLang} />;

  if (schoolPath === 'aps') return <APSApp lang={lang} t={t} toggleLang={toggleLang} />;
  
  if (schoolPath === 'kle' || schoolPath === 'aecs') {
    return <GenericBranchApp schoolPath={schoolPath} lang={lang} t={t} toggleLang={toggleLang} />;
  }

  return null;
}

export default App;
