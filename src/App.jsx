import React, { useState, useEffect } from 'react';
import { Lock, Info, Key, Copy, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

// --- School config driven by URL path ---
const SCHOOL_CONFIG = {
  aps: {
    key: 'APS',
    label: 'APS Schools',
    format: 'APS-[SCHOOLCODE]-[YEAR]-[CLASS]-[EMAILNUMBER]',
    placeholder: 'E.G., APS-BRI-2025-3A-1880',
    samples: ['APS-BRI-2025-3A-1880', 'APS-BRI-2025-3A-1886', 'APS-BRI-2025-3A-2144'],
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
    fallback: [
      { id: 'Amroha-6A-01', name: 'Sample Ashram Student 1', email: 'ashram1@sample.in', password: 'password123', school: 'ASHRAM' },
      { id: 'Amroha-6A-02', name: 'Sample Ashram Student 2', email: 'ashram2@sample.in', password: 'password123', school: 'ASHRAM' },
      { id: 'Amroha-6A-03', name: 'Sample Ashram Student 3', email: 'ashram3@sample.in', password: 'password123', school: 'ASHRAM' },
    ],
  },
};

// Detect school from URL path: /aps, /kgbv, /samajkalyan
// BASE_URL is '/Account-Recovery-WebApp/' on GitHub Pages and '/' locally
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

function NotFound() {
  return (
    <div className="recovery-container">
      <div className="header-section">
        <AlertCircle size={32} color="#ffffff" style={{ marginBottom: '8px' }} />
        <h1 className="header-title">Page Not Found</h1>
        <p className="header-subtitle">Please use a valid school link to access this portal.</p>
      </div>
      <div className="content-section">
        <div className="info-banner">
          <Info className="icon" size={18} />
          <span>Choose a school portal to continue</span>
        </div>
        <div className="school-links">
          <a href={`${BASE}aps`} className="school-link-btn">🏫 APS Schools</a>
          <a href={`${BASE}kgbv`} className="school-link-btn">🏫 KGBV Schools</a>
          <a href={`${BASE}samajkalyan`} className="school-link-btn">🏫 Samaj Kalyan</a>
        </div>
      </div>
    </div>
  );
}

function App() {
  const schoolPath = getSchoolFromPath();
  const config = schoolPath ? SCHOOL_CONFIG[schoolPath] : null;

  const [uid, setUid] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copiedField, setCopiedField] = useState('');
  const [data, setData] = useState(config ? config.fallback : []);
  const [isLoaded, setIsLoaded] = useState(false);

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

  if (!config) return <NotFound />;

  const handleRetrieve = () => {
    setError('');
    setResult(null);
    if (!uid) {
      setError('Please enter a Unique ID');
      return;
    }
    const found = data.find(s => s.id === uid);
    if (found) {
      setResult(found);
    } else {
      setError('Invalid ID format or student not found.');
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
    <div className="recovery-container">
      <div className="header-section">
        <Lock className="header-icon" size={32} color="#ffffff" />
        <h1 className="header-title">{config.label}</h1>
        <p className="header-subtitle">
          {isLoaded
            ? `Instantly retrieve credentials for ${data.length.toLocaleString()} students`
            : 'Account Recovery Portal'}
        </p>
      </div>

      <div className="content-section">
        <div className="info-banner">
          <Info className="icon" size={18} />
          <span>Enter your Unique ID to view your credentials</span>
        </div>

        <div className="form-group">
          <label className="label">Unique ID</label>
          <div className="format-box">{config.format}</div>
          <input
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
          />
          {error && (
            <div className="error-message">
              <XCircle size={14} />
              <span>{error}</span>
            </div>
          )}
        </div>

        {result && (
          <div className="result-card">
            <div className="result-header">
              <CheckCircle2 size={18} />
              <span style={{ fontWeight: 600, fontSize: '14px' }}>Credentials Retrieved</span>
            </div>

            <div className="student-name-box">
              <div className="result-label">Student Name</div>
              <div className="student-name-value">{result.name}</div>
              {result.schoolName && (
                <div style={{ marginTop: '6px', fontSize: '12px', color: '#8C8C8C' }}>
                  📍 {result.schoolName}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="result-row">
                <div>
                  <div className="result-label">Email Address</div>
                  <div className="result-value" style={{ textTransform: 'lowercase' }}>{result.email}</div>
                </div>
                <button className="copy-button" onClick={() => copyToClipboard(result.email, 'email')}>
                  {copiedField === 'email' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                  {copiedField === 'email' ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="result-row">
                <div>
                  <div className="result-label">Password</div>
                  <div className="result-value">{result.password}</div>
                </div>
                <button className="copy-button" onClick={() => copyToClipboard(result.password, 'password')}>
                  {copiedField === 'password' ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                  {copiedField === 'password' ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="samples-box">
          <h3 className="samples-title">Sample IDs</h3>
          {config.samples.map(sampleId => (
            <button
              key={sampleId}
              className="sample-button"
              onClick={() => handleSampleClick(sampleId)}
            >
              {sampleId}
            </button>
          ))}
        </div>

        <button className="action-button" onClick={handleRetrieve}>
          <Key size={18} />
          <span>Retrieve Credentials</span>
        </button>
      </div>
    </div>
  );
}

export default App;
