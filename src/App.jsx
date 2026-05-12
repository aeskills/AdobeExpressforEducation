import React, { useState, useEffect, useCallback } from 'react';
import { Lock, Info, Key, Copy, CheckCircle2, XCircle, AlertCircle, Shield, BookOpen, Users, Globe, Menu, X } from 'lucide-react';
import translations from './translations.js';

// --- School config driven by URL path ---
const SCHOOL_CONFIG = {
  aps: {
    key: 'APS',
    label: 'APS Schools',
    format: 'APS-[SCHOOLCODE]-[YEAR]-[CLASS]-[EMAILNUMBER]',
    placeholder: 'E.G., APS-BRI-2025-3A-1880',
    samples: ['APS-BRI-2025-3A-1880', 'APS-BRI-2025-3A-1886', 'APS-BRI-2025-3A-2144'],
    heroIcon: '🛡️',
    featureIcons: ['🎖️', '📚', '🏆'],
    fallback: [
      { id: 'APS-BRI-2025-3A-1880', name: 'Nakul Hemand K R', email: 'brichgunj1880@awesaps.in', password: 'APS@2025', school: 'APS' },
      { id: 'APS-BRI-2025-3A-1886', name: 'S Jesvanth', email: 'brichgunj1886@awesaps.in', password: 'APS@2025', school: 'APS' },
      { id: 'APS-BRI-2025-3A-2144', name: 'Veer Swastik Soren', email: 'brichgunj2144@awesaps.in', password: 'APS@2025', school: 'APS' },
    ],
  },
  kgbv: {
    key: 'KGBV',
    label: 'KGBV Schools',
    format: 'KGBV-[STATE]-[CITY]-[SCHOOLCODE]-[CLASS]-[ROLL]',
    placeholder: 'E.G., KGBV-UP-MUZ-4204-6A-01',
    samples: ['KGBV-UP-MUZ-4204-6A-01', 'KGBV-UP-MUZ-4204-6A-02', 'KGBV-UP-MUZ-4204-6A-03'],
    heroIcon: '🌸',
    featureIcons: ['🔒', '📖', '🤝'],
    fallback: [
      { id: 'KGBV-UP-MUZ-4204-6A-01', name: 'Sample KGBV Student 1', email: 'kgbv1@sample.in', password: 'password123', school: 'KGBV' },
      { id: 'KGBV-UP-MUZ-4204-6A-02', name: 'Sample KGBV Student 2', email: 'kgbv2@sample.in', password: 'password123', school: 'KGBV' },
      { id: 'KGBV-UP-MUZ-4204-6A-03', name: 'Sample KGBV Student 3', email: 'kgbv3@sample.in', password: 'password123', school: 'KGBV' },
    ],
  },
  samajkalyan: {
    key: 'ASHRAM',
    label: 'Samaj Kalyan Schools',
    format: '[CityName]-[Class]-[RollNo]',
    placeholder: 'E.G., Amroha-6A-01',
    samples: ['Amroha-6A-01', 'Amroha-6A-02', 'Amroha-6A-03'],
    heroIcon: '🌿',
    featureIcons: ['💚', '🌍', '🤝'],
    fallback: [
      { id: 'Amroha-6A-01', name: 'Sample Ashram Student 1', email: 'ashram1@sample.in', password: 'password123', school: 'ASHRAM' },
      { id: 'Amroha-6A-02', name: 'Sample Ashram Student 2', email: 'ashram2@sample.in', password: 'password123', school: 'ASHRAM' },
      { id: 'Amroha-6A-03', name: 'Sample Ashram Student 3', email: 'ashram3@sample.in', password: 'password123', school: 'ASHRAM' },
    ],
  },
};

// Detect school from URL path
const BASE = import.meta.env.BASE_URL;
const getSchoolFromPath = () => {
  const basePath = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const path = window.location.pathname
    .replace(basePath, '')
    .replace(/^\//, '')
    .replace(/\/$/, '')
    .toLowerCase();
  if (path === '') {
    window.location.replace(BASE + 'aps');
    return null;
  }
  return SCHOOL_CONFIG[path] ? path : null;
};

// Language hook
function useLang(schoolPath) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('appLanguage');
    if (saved) return saved;
    return schoolPath === 'kgbv' ? 'hi' : 'en';
  });

  const t = useCallback((key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  }, [lang]);

  const toggleLang = useCallback(() => {
    const next = lang === 'en' ? 'hi' : 'en';
    setLang(next);
    localStorage.setItem('appLanguage', next);
    document.documentElement.lang = next;
  }, [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return { lang, t, toggleLang };
}

// Navbar Component
function Navbar({ schoolPath, lang, t, toggleLang }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const schools = ['aps', 'kgbv', 'samajkalyan'];
  const schoolLabels = { aps: t('school_aps'), kgbv: t('school_kgbv'), samajkalyan: t('school_samajkalyan') };

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <a href={BASE} className="nav-brand" aria-label="Home">
          <div className="nav-brand-icon"><Shield size={18} /></div>
          <span className="nav-brand-text">{t('portal_title')}</span>
        </a>

        <div className="nav-links">
          {schools.map(s => (
            <a
              key={s}
              href={`${BASE}${s}`}
              className={`nav-school-link ${schoolPath === s ? 'active' : ''}`}
            >
              {schoolLabels[s]}
            </a>
          ))}
          <button
            className="lang-toggle"
            onClick={toggleLang}
            aria-label={`Switch to ${lang === 'en' ? 'Hindi' : 'English'}`}
          >
            <Globe size={15} className="globe-icon" />
            {t('lang_toggle')}
          </button>
        </div>

        <button
          className="hamburger"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div
        className={`mobile-menu ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(false)}
      >
        <div className="mobile-menu-content" onClick={e => e.stopPropagation()}>
          <button className="mobile-menu-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
          {schools.map(s => (
            <a
              key={s}
              href={`${BASE}${s}`}
              className={`mobile-menu-link ${schoolPath === s ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {schoolLabels[s]}
            </a>
          ))}
          <button
            className="lang-toggle"
            onClick={() => { toggleLang(); setMobileOpen(false); }}
            style={{ marginTop: '12px' }}
          >
            <Globe size={15} /> {t('lang_toggle')}
          </button>
        </div>
      </div>
    </>
  );
}

// Hero Component
function HeroSection({ schoolPath, t, heroImgSrc }) {
  const heroTitle = t(`${schoolPath}_hero_title`);
  const heroSubtitle = t(`${schoolPath}_hero_subtitle`);
  const tagline = t(`${schoolPath}_tagline`);
  const heroRef = React.useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        if (window.scrollY > 100) {
          heroRef.current.classList.add('scrolled');
        } else {
          heroRef.current.classList.remove('scrolled');
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="hero-section" aria-labelledby="hero-heading">
      <img
        src={heroImgSrc}
        alt=""
        className="hero-bg-image"
        loading="eager"
        aria-hidden="true"
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-badge">
          <span>{SCHOOL_CONFIG[schoolPath].heroIcon}</span>
          <span>{t(`label_${schoolPath}`)}</span>
        </div>
        <h1 id="hero-heading" className="hero-title">{heroTitle}</h1>
        <p className="hero-subtitle">{heroSubtitle}</p>
        <p className="hero-stats">{tagline}</p>
      </div>
    </section>
  );
}

// Features Component
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

// Footer Component
function Footer({ t }) {
  return (
    <footer className="footer" role="contentinfo">
      <p className="footer-text">
        © {new Date().getFullYear()} {t('portal_title')} — {t('footer_rights')}
      </p>
      <div className="footer-links">
        <span className="footer-link">{t('footer_privacy')}</span>
        <span className="footer-link">{t('footer_terms')}</span>
        <span className="footer-link">{t('footer_contact')}</span>
      </div>
    </footer>
  );
}

// Not Found Page
function NotFound({ t }) {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <div className="not-found-icon">
          <AlertCircle size={32} />
        </div>
        <h1 className="not-found-title">{t('not_found_title')}</h1>
        <p className="not-found-subtitle">{t('not_found_subtitle')}</p>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
          {t('choose_portal')}
        </p>
        <div className="school-links">
          <a href={`${BASE}aps`} className="school-link-btn">🏫 {t('school_aps')}</a>
          <a href={`${BASE}kgbv`} className="school-link-btn">🏫 {t('school_kgbv')}</a>
          <a href={`${BASE}samajkalyan`} className="school-link-btn">🏫 {t('school_samajkalyan')}</a>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const schoolPath = getSchoolFromPath();
  const config = schoolPath ? SCHOOL_CONFIG[schoolPath] : null;
  const { lang, t, toggleLang } = useLang(schoolPath);

  const [uid, setUid] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copiedField, setCopiedField] = useState('');
  const [data, setData] = useState(config ? config.fallback : []);
  const [isLoaded, setIsLoaded] = useState(false);

  // Apply school theme to root
  useEffect(() => {
    if (schoolPath) {
      document.documentElement.setAttribute('data-school', schoolPath);
    }
    return () => document.documentElement.removeAttribute('data-school');
  }, [schoolPath]);

  useEffect(() => {
    if (!config) return;
    fetch(BASE + 'students.json', {
      headers: { 'Bypass-Tunnel-Reminder': 'true' }
    })
      .then(res => {
        if (!res.ok) throw new Error('No large dataset found');
        return res.json();
      })
      .then(json => {
        const formattedData = json
          .filter(s => s.s === config.key)
          .map(s => ({
            id: s.i,
            name: s.n,
            email: s.e,
            password: s.p,
            school: s.s,
            schoolName: s.sn || ''
          }));
        setData(formattedData);
        setIsLoaded(true);
      })
      .catch(() => {
        console.log('Using fallback data.');
      });
  }, []);

  if (!config) {
    return (
      <>
        <Navbar schoolPath={null} lang={lang} t={t} toggleLang={toggleLang} />
        <NotFound t={t} />
        <Footer t={t} />
      </>
    );
  }

  const heroImgSrc = `${BASE}hero-${schoolPath}.png`;

  const handleRetrieve = () => {
    setError('');
    setResult(null);
    if (!uid) {
      setError(t('enter_uid'));
      return;
    }
    const found = data.find(s => s.id === uid);
    if (found) {
      setResult(found);
    } else {
      setError(t('invalid_id'));
    }
  };

  const handleSampleClick = (sampleId) => {
    setUid(sampleId);
    setError('');
    setResult(null);
    setTimeout(() => {
      const found = data.find(s => s.id === sampleId);
      if (found) setResult(found);
    }, 50);
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar schoolPath={schoolPath} lang={lang} t={t} toggleLang={toggleLang} />

      <HeroSection schoolPath={schoolPath} t={t} heroImgSrc={heroImgSrc} />
      <FeaturesBar schoolPath={schoolPath} t={t} />

      <main id="main-content" className="main-content">
        <div className="recovery-card">
          <div className="recovery-card-header">
            <div className="recovery-card-icon"><Key size={20} /></div>
            <div>
              <div className="recovery-card-title">{t('page_title')}</div>
              <div className="recovery-card-subtitle">
                {isLoaded
                  ? `${t('subtitle_loaded')} ${data.length.toLocaleString()} ${t('subtitle_students')}`
                  : t('portal_title')}
              </div>
            </div>
          </div>

          <div className="recovery-card-body">
            <div className="info-banner" role="note">
              <Info className="icon" size={18} />
              <span>{t('info_banner')}</span>
            </div>

            <div className="form-group">
              <label className="label" htmlFor="uid-input">{t('unique_id_label')}</label>
              <div className="format-box" aria-label="ID format">{config.format}</div>
              <input
                id="uid-input"
                type="text"
                className="input-field"
                placeholder={config.placeholder}
                value={uid}
                onChange={(e) => {
                  setUid(e.target.value);
                  setError('');
                  setResult(null);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleRetrieve()}
                aria-describedby={error ? 'uid-error' : undefined}
                autoComplete="off"
              />
              {error && (
                <div className="error-message" id="uid-error" role="alert">
                  <XCircle size={14} />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {result && (
              <div className="result-card" role="region" aria-label="Retrieved credentials">
                <div className="result-header">
                  <CheckCircle2 size={18} />
                  <span>{t('credentials_retrieved')}</span>
                </div>

                <div className="student-name-box">
                  <div className="result-label">{t('student_name')}</div>
                  <div className="student-name-value">{result.name}</div>
                  {result.schoolName && (
                    <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      📍 {result.schoolName}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="result-row">
                    <div>
                      <div className="result-label">{t('email_address')}</div>
                      <div className="result-value" style={{ textTransform: 'lowercase' }}>{result.email}</div>
                    </div>
                    <button
                      className="copy-button"
                      onClick={() => copyToClipboard(result.email, 'email')}
                      aria-label={`Copy email ${result.email}`}
                    >
                      {copiedField === 'email' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                      {copiedField === 'email' ? t('copied') : t('copy')}
                    </button>
                  </div>

                  <div className="result-row">
                    <div>
                      <div className="result-label">{t('password')}</div>
                      <div className="result-value">{result.password}</div>
                    </div>
                    <button
                      className="copy-button"
                      onClick={() => copyToClipboard(result.password, 'password')}
                      aria-label={`Copy password`}
                    >
                      {copiedField === 'password' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                      {copiedField === 'password' ? t('copied') : t('copy')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="samples-box">
              <h3 className="samples-title">{t('sample_ids_title')}</h3>
              {config.samples.map(sampleId => (
                <button
                  key={sampleId}
                  className="sample-button"
                  onClick={() => handleSampleClick(sampleId)}
                  aria-label={`Try sample ID ${sampleId}`}
                >
                  {sampleId}
                </button>
              ))}
            </div>

            <button className="action-button" onClick={handleRetrieve}>
              <Key size={18} />
              <span>{t('retrieve_btn')}</span>
            </button>
          </div>
        </div>
      </main>

      <Footer t={t} />
    </>
  );
}

export default App;
