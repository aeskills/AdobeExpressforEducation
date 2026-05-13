import React, { useState, useEffect, useCallback } from 'react';
import { Lock, Info, Key, Copy, CheckCircle2, XCircle, AlertCircle, Shield, BookOpen, Users, Globe, Menu, X, ChevronDown, ArrowLeft, Search, School } from 'lucide-react';
import translations from './translations.js';

const BASE = import.meta.env.BASE_URL;

const SCHOOL_CONFIG = {
  aps: {
    key: 'APS', label: 'APS Schools',
    format: 'APS-[SCHOOLCODE]-[YEAR]-[CLASS]-[EMAILNUMBER]',
    placeholder: 'E.G., APS-BRI-2025-3A-1880',
    samples: ['APS-BRI-2025-3A-1880', 'APS-BRI-2025-3A-1886', 'APS-BRI-2025-3A-2144'],
    heroIcon: '🛡️', featureIcons: ['🎖️', '📚', '🏆'],
    fallback: [
      { id: 'APS-BRI-2025-3A-1880', name: 'Nakul Hemand K R', email: 'brichgunj1880@awesaps.in', password: 'APS@2025', school: 'APS' },
      { id: 'APS-BRI-2025-3A-1886', name: 'S Jesvanth', email: 'brichgunj1886@awesaps.in', password: 'APS@2025', school: 'APS' },
      { id: 'APS-BRI-2025-3A-2144', name: 'Veer Swastik Soren', email: 'brichgunj2144@awesaps.in', password: 'APS@2025', school: 'APS' },
    ],
  },
  kgbv: {
    key: 'KGBV', label: 'KGBV Schools',
    heroIcon: '🌸', featureIcons: ['🔒', '📖', '🤝'],
    fallback: [],
  },
  samajkalyan: {
    key: 'ASHRAM', label: 'Samaj Kalyan Schools',
    heroIcon: '🌿', featureIcons: ['💚', '🌍', '🤝'],
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
  kgbv: { icon: '🌸', en: 'Kasturba Gandhi Balika Vidyalaya', hi: 'कस्तूरबा गांधी बालिका विद्यालय' },
  samajkalyan: { icon: '🌿', en: 'Samaj Kalyan Ashram Schools', hi: 'समाज कल्याण आश्रम विद्यालय' },
  aps: { icon: '🛡️', en: 'Army Public Schools UP', hi: 'आर्मी पब्लिक स्कूल यूपी' },
};

function Navbar({ schoolPath, lang, t, toggleLang }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const brand = NAV_BRANDS[schoolPath] || NAV_BRANDS.kgbv;
  const brandText = lang === 'hi' ? brand.hi : brand.en;
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <a href={`${BASE}${schoolPath || 'kgbv'}`} className="nav-brand" aria-label="Home">
          <div className="nav-brand-icon"><Shield size={18} /></div>
          <span className="nav-brand-text">{brandText}</span>
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
          <button className="lang-toggle" onClick={() => { toggleLang(); setMobileOpen(false); }} style={{ marginTop: '12px' }}>
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
        <div className="hero-badge">
          <span>{SCHOOL_CONFIG[schoolPath].heroIcon}</span>
          <span>{t(`label_${schoolPath}`)}</span>
        </div>
        <h1 id="hero-heading" className="hero-title">{t(`${schoolPath}_hero_title`)}</h1>
        <p className="hero-subtitle">{t(`${schoolPath}_hero_subtitle`)}</p>
        <p className="hero-stats">{t(`${schoolPath}_tagline`)}</p>
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
      <p className="footer-text">© {new Date().getFullYear()} {t('portal_title')} — {t('footer_rights')}</p>
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
  return (
    <div className="result-card" role="region" aria-label="Retrieved credentials">
      <div className="result-header"><CheckCircle2 size={18} /><span>{t('credentials_retrieved')}</span></div>
      <div className="student-name-box">
        <div className="result-label">{t('student_name')}</div>
        <div className="student-name-value">{result.name}</div>
        {result.schoolName && <div style={{ marginTop: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>📍 {result.schoolName}</div>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div className="result-row">
          <div><div className="result-label">{t('email_address')}</div><div className="result-value" style={{ textTransform: 'lowercase' }}>{result.email}</div></div>
          <button className="copy-button" onClick={() => copyToClipboard(result.email, 'email')} aria-label={`Copy email`}>
            {copiedField === 'email' ? <CheckCircle2 size={14} /> : <Copy size={14} />} {copiedField === 'email' ? t('copied') : t('copy')}
          </button>
        </div>
        <div className="result-row">
          <div><div className="result-label">{t('password')}</div><div className="result-value">{result.password}</div></div>
          <button className="copy-button" onClick={() => copyToClipboard(result.password, 'password')} aria-label={`Copy password`}>
            {copiedField === 'password' ? <CheckCircle2 size={14} /> : <Copy size={14} />} {copiedField === 'password' ? t('copied') : t('copy')}
          </button>
        </div>
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
            <Key size={20} className="cta-icon" /> {t('retrieve_cta')} →
          </button>
        </HeroSection>
        <FeaturesBar schoolPath="kgbv" t={t} />

        <TrendlineSlider images={kgbvTrendlineImages} title={t('kgbv_gallery_title') || 'School Gallery'} />

        <section className="about-section" id="main-content">
          <h2 className="section-title">{t('kgbv_about_title')}</h2>
          <p className="section-desc">{t('kgbv_about_desc')}</p>
        </section>

        <section className="services-section">
          <h2 className="section-title">{t('kgbv_services_title')}</h2>
          <div className="services-grid">
            <div className="service-card"><div className="service-icon">📚</div><h3>{t('kgbv_service_edu')}</h3><p>{t('kgbv_service_edu_desc')}</p></div>
            <div className="service-card"><div className="service-icon">🏠</div><h3>{t('kgbv_service_hostel')}</h3><p>{t('kgbv_service_hostel_desc')}</p></div>
            <div className="service-card">
              <div className="service-icon">🔑</div><h3>{t('kgbv_service_recovery')}</h3><p>{t('kgbv_service_recovery_desc')}</p>
            </div>
            <div className="service-card"><div className="service-icon">🌟</div><h3>{t('kgbv_service_empower')}</h3><p>{t('kgbv_service_empower_desc')}</p></div>
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-item"><div className="stat-number">{kgbvSchools.length || 746}</div><div className="stat-label">{t('kgbv_schools_count')}</div></div>
          <div className="stat-item"><div className="stat-number">{isLoaded ? kgbvData.length.toLocaleString() : '2,23,800+'}</div><div className="stat-label">{t('kgbv_students_count')}</div></div>
          <div className="stat-item"><div className="stat-number">75</div><div className="stat-label">{t('kgbv_stat_districts')}</div></div>
        </section>

        <Footer t={t} />
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
function GenericApp({ schoolPath, config, lang, t, toggleLang }) {
  const [uid, setUid] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copiedField, setCopiedField] = useState('');
  const [data, setData] = useState(config.fallback);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(BASE + 'students.json', { headers: { 'Bypass-Tunnel-Reminder': 'true' } })
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(json => {
        const d = json.filter(s => s.s === config.key).map(s => ({
          id: s.i, name: s.n, email: s.e, password: s.p, school: s.s, schoolName: s.sn || ''
        }));
        setData(d); setIsLoaded(true);
      })
      .catch(() => console.log('Using fallback data.'));
  }, []);

  const heroImgSrc = `${BASE}hero-${schoolPath}.png`;

  const handleRetrieve = () => {
    setError(''); setResult(null);
    if (!uid) { setError(t('enter_uid')); return; }
    const found = data.find(s => s.id === uid);
    if (found) setResult(found); else setError(t('invalid_id'));
  };

  const handleSampleClick = (sampleId) => {
    setUid(sampleId); setError(''); setResult(null);
    setTimeout(() => { const found = data.find(s => s.id === sampleId); if (found) setResult(found); }, 50);
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field); setTimeout(() => setCopiedField(''), 2000);
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
                {isLoaded ? `${t('subtitle_loaded')} ${data.length.toLocaleString()} ${t('subtitle_students')}` : t('portal_title')}
              </div>
            </div>
          </div>
          <div className="recovery-card-body">
            <div className="info-banner" role="note"><Info className="icon" size={18} /><span>{t('info_banner')}</span></div>
            <div className="form-group">
              <label className="label" htmlFor="uid-input">{t('unique_id_label')}</label>
              <div className="format-box" aria-label="ID format">{config.format}</div>
              <input id="uid-input" type="text" className="input-field" placeholder={config.placeholder} value={uid}
                onChange={e => { setUid(e.target.value); setError(''); setResult(null); }}
                onKeyDown={e => e.key === 'Enter' && handleRetrieve()} autoComplete="off"
              />
              {error && <div className="error-message" id="uid-error" role="alert"><XCircle size={14} /><span>{error}</span></div>}
            </div>
            {result && <ResultDisplay result={result} t={t} copiedField={copiedField} copyToClipboard={copyToClipboard} />}
            <div className="samples-box">
              <h3 className="samples-title">{t('sample_ids_title')}</h3>
              {config.samples.map(sampleId => (
                <button key={sampleId} className="sample-button" onClick={() => handleSampleClick(sampleId)}>{sampleId}</button>
              ))}
            </div>
            <button className="action-button" onClick={handleRetrieve}><Key size={18} /><span>{t('retrieve_btn')}</span></button>
          </div>
        </div>
      </main>
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
            <Key size={20} className="cta-icon" /> {t('retrieve_cta')} →
          </button>
        </HeroSection>
        <FeaturesBar schoolPath="samajkalyan" t={t} />

        <TrendlineSlider images={skTrendlineImages} title={t('sk_gallery_title') || 'Ashram Gallery'} />

        <section className="about-section" id="main-content">
          <h2 className="section-title">{t('sk_about_title')}</h2>
          <p className="section-desc">{t('sk_about_desc')}</p>
        </section>

        <section className="services-section">
          <h2 className="section-title">{t('sk_services_title')}</h2>
          <div className="services-grid">
            <div className="service-card"><div className="service-icon">📚</div><h3>{t('sk_service_edu')}</h3><p>{t('sk_service_edu_desc')}</p></div>
            <div className="service-card"><div className="service-icon">🤝</div><h3>{t('sk_service_community')}</h3><p>{t('sk_service_community_desc')}</p></div>
            <div className="service-card">
              <div className="service-icon">🔑</div><h3>{t('sk_service_recovery')}</h3><p>{t('sk_service_recovery_desc')}</p>
            </div>
            <div className="service-card"><div className="service-icon">🌱</div><h3>{t('sk_service_welfare')}</h3><p>{t('sk_service_welfare_desc')}</p></div>
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-item"><div className="stat-number">{ashramSchools.length || 119}</div><div className="stat-label">{t('sk_schools_count')}</div></div>
          <div className="stat-item"><div className="stat-number">{isLoaded ? ashramData.length.toLocaleString() : '66,640+'}</div><div className="stat-label">{t('sk_students_count')}</div></div>
          <div className="stat-item"><div className="stat-number">100%</div><div className="stat-label">{t('sk_stat_inclusive')}</div></div>
        </section>

        <Footer t={t} />
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

// --- Landing Page ---
function LandingPage({ t }) {
  return (
    <div className="landing-page-container">
      <div className="landing-card">
        <h1 className="landing-title">Choose a school portal to continue</h1>
        <div className="landing-links">
          <a href={`${BASE}kgbv`} className="landing-link-btn">🌸 KGBV Schools</a>
          <a href={`${BASE}samajkalyan`} className="landing-link-btn">🌿 Samaj Kalyan</a>
          <a href={`${BASE}aps`} className="landing-link-btn">🛡️ Army Public Schools</a>
        </div>
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

  return <GenericApp schoolPath={schoolPath} config={config} lang={lang} t={t} toggleLang={toggleLang} />;
}

export default App;
