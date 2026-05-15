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
    heroIcon: '', featureIcons: ['🎖️', '📚', '🏆'],
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
  aps: { 
    icon: '🛡️',
    en: 'Army Public School X Adobe Express', 
    hi: 'आर्मी पब्लिक स्कूल X एडोबी एक्सप्रेस' 
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
  const apsImages = [
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

  const currentConfig = activeTab === 'aps' ? configAPS : activeTab === 'atomic' ? configAtomic : configKles;

  const handleRetrieve = () => {
    setError(''); setResult(null);
    if (!uid) { setError(t('enter_uid')); return; }
    
    if (activeTab === 'aps') {
      if (!selectedApsSchool) { setError('Please select an APS school'); return; }
      const found = data.find(s => 
        s.school === 'APS' && 
        s.schoolName === selectedApsSchool && 
        (s.email.split('@')[0].endsWith(uid) || s.id.endsWith(uid))
      );
      if (found) setResult(found); else setError('Student not found with this admission number in selected branch.');
      return;
    }

    const currentKey = activeTab === 'atomic' ? 'ATOMIC' : 'KLES';
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
    if (!selectedApsSchool) {
      setError('Please select an APS school first to download the CSV.');
      return;
    }
    const branchStudents = data.filter(s => s.school === 'APS' && s.schoolName === selectedApsSchool);
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
    link.setAttribute("download", `${selectedApsSchool.replace(/\s+/g, '_')}_Students.csv`);
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

        <TrendlineSlider images={apsImages} />

        <section className="about-section" id="main-content">
          <h2 className="section-title">{t('aps_about_title')}</h2>
          <p className="section-desc">{t('aps_about_desc')}</p>
        </section>

        <section className="app-download-section" style={{ maxWidth: '800px', margin: '0 auto 60px', padding: '0 24px' }}>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '32px' }}>Download Adobe Express App</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="download-card" style={{ background: 'var(--bg-card)', padding: '32px 24px', borderRadius: '16px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://play.google.com/store/apps/details?id=com.adobe.spark.post&hl=en_IN" alt="Play Store QR" style={{ width: '130px', height: '130px', marginBottom: '20px', borderRadius: '8px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-dark)', fontFamily: "'Poppins', sans-serif" }}>Google Play Store</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>Download Adobe Express for Android.<br/>Create stunning graphics on the go.</p>
              <a href="https://play.google.com/store/apps/details?id=com.adobe.spark.post&hl=en_IN" target="_blank" rel="noreferrer" className="action-button" style={{ width: 'auto', padding: '12px 28px', minHeight: 'auto', fontSize: '14px', textDecoration: 'none' }}>Get it on Play Store</a>
            </div>
            <div className="download-card" style={{ background: 'var(--bg-card)', padding: '32px 24px', borderRadius: '16px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://tinyurl.com/yper8w4n" alt="App Store QR" style={{ width: '130px', height: '130px', marginBottom: '20px', borderRadius: '8px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-dark)', fontFamily: "'Poppins', sans-serif" }}>Apple App Store</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>Download Adobe Express for iOS.<br/>Bring your ideas to life anywhere.</p>
              <a href="https://tinyurl.com/yper8w4n" target="_blank" rel="noreferrer" className="action-button" style={{ width: 'auto', padding: '12px 28px', minHeight: 'auto', fontSize: '14px', textDecoration: 'none' }}>Download on App Store</a>
            </div>
          </div>
        </section>

        <section className="important-section" style={{ maxWidth: '800px', margin: '0 auto 60px', padding: '0 24px' }}>
          <div style={{ background: '#ffffff', padding: '40px 32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontSize: '16px', color: '#334155', marginBottom: '32px', lineHeight: '1.6', textAlign: 'center', maxWidth: '680px' }}>
              Create engaging educational posters, assignments, presentations, videos, webpages & social media creatives effortlessly with <a href="https://new.express.adobe.com/" target="_blank" rel="noreferrer" style={{ color: '#1e6ce8ff', fontWeight: '700', textDecoration: 'underline' }}>Adobe Express</a> — powered by AI tools and ready-to-use academic templates.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>🎥</span>
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>Login Tutorial Video:</span>
              </div>
              <a href="https://youtu.be/iuuC3YYBUs8?si=2eb2lmhDBSuxAyRC" target="_blank" rel="noreferrer" style={{ background: '#3454b4', color: 'white', padding: '10px 24px', borderRadius: '8px', fontSize: '15px', fontWeight: '600', textDecoration: 'none', transition: 'background 0.2s', border: 'none' }}>Watch Here</a>
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
  const title = activeTab === 'aps' ? t('page_title') : activeTab === 'atomic' ? 'Atomic Energy Recovery' : activeTab === 'kles' ? 'KLES Recovery' : "Teacher's User ID Recovery";
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
        {activeTab === 'aps' && (
          <button className="back-button" onClick={() => { setPage('home'); setResult(null); setError(''); }}>
            <ArrowLeft size={18} /> <span>{t('back_home')}</span>
          </button>
        )}
        <main id="main-content" className="main-content" style={{ marginTop: activeTab !== 'aps' ? '40px' : '0' }}>
          <div className="recovery-card">
            <div className="recovery-card-header">
              <div className="recovery-card-icon"><Key size={20} /></div>
              <div>
                <div className="recovery-card-title">{title}</div>
                {activeTab !== 'teachers' && (
                  <div className="recovery-card-subtitle">
                    {isLoaded ? `${subtitlePrefix} ${currentDataCount.toLocaleString()} ${t('subtitle_students')}` : t('portal_title')}
                  </div>
                )}
              </div>
            </div>
            <div className="recovery-card-body">
              {activeTab !== 'teachers' && (
                <div className="info-banner" role="note"><Info className="icon" size={18} /><span>{t('info_banner')}</span></div>
              )}
              
              {activeTab === 'aps' && (
                <>
                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label className="label">Step 1: Select Your APS School</label>
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
                              <button key={school} className={`dropdown-item ${selectedApsSchool === school ? 'selected' : ''}`} onClick={() => { setSelectedApsSchool(school); setApsSchoolDropdownOpen(false); setApsSchoolSearch(''); setError(''); setResult(null); }}>
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
                  <label className="label">{activeTab === 'aps' ? 'Step 2: Enter Email Number (Admission No.)' : t('unique_id_label')}</label>
                  <div className="format-box" style={activeTab === 'aps' ? { background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', fontSize: '13px', color: '#64748b', marginBottom: '10px', border: '1px solid #e2e8f0', fontFamily: 'monospace' } : {}}>
                    {activeTab === 'aps' ? 'Format: [Admission Number] — e.g. 1880, 2144, 3052' : currentConfig.format}
                  </div>
                  <input
                    type="text"
                    className="input-field"
                    placeholder={activeTab === 'aps' ? 'E.g. 1880' : currentConfig.placeholder}
                    value={uid}
                    onChange={e => { setUid(e.target.value); setError(''); setResult(null); }}
                    onKeyDown={e => e.key === 'Enter' && handleRetrieve()}
                  />
                  {error && <div className="error-message" id="uid-error" role="alert"><XCircle size={14} /><span>{error}</span></div>}
                  {activeTab !== 'aps' && (
                    <div className="samples-container">
                      <div className="samples-label">{t('sample_ids_title')}:</div>
                      <div className="samples-list">
                        {currentConfig.samples.map(s => (
                          <button key={s} className="sample-btn" onClick={() => handleSampleClick(s)}>{s}</button>
                        ))}
                      </div>
                    </div>
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
                  <button className="action-button" onClick={handleDownloadTeacherCSV} style={{ flex: 1, minWidth: '150px', background: '#10b981' }}>
                    <Copy size={18} /><span>Download CSV</span>
                  </button>
                )}
                {activeTab === 'aps' && (
                  <button className="action-button" onClick={handleDownloadApsCSV} style={{ flex: 1, minWidth: '150px', background: '#10b981' }}>
                    <Copy size={18} /><span>Download CSV</span>
                  </button>
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

  if (schoolPath === 'aps') return <APSApp lang={lang} t={t} toggleLang={toggleLang} />;

  return null;
}

export default App;
