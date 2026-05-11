import fs from 'fs';
import csv from 'csv-parser';

const results = [];

const getApsShortcode = (schoolName) => {
  if (!schoolName) return "XXX";
  const parts = schoolName.toUpperCase().split(' ');
  const name = parts[0] === 'APS' && parts[1] ? parts[1] : parts[0];
  return name.substring(0, 3);
};

const getStateShortcode = (state) => {
  if (state === 'Uttar Pradesh') return 'UP';
  return state ? state.substring(0, 2).toUpperCase() : 'XX';
};

const getCityShortcode = (city) => {
  if (city === 'Muzaffarnagar') return 'MZR';
  return city ? city.substring(0, 3).toUpperCase() : 'XXX';
};

const processAps = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream('APS Teachers and Students(Students).csv')
      .pipe(csv())
      .on('data', (data) => {
        try {
          const shortcode = getApsShortcode(data.SA || '');
          const jt = data.JT || '';
          const yearMatch = jt.match(/(\d{4})/);
          const year = yearMatch ? yearMatch[1] : '';
          const classMatch = jt.match(/\((.*?)\)/);
          const className = classMatch ? classMatch[1] : '';
          const email = data.ID || '';
          const emailNumMatch = email.match(/\d+/);
          const emailNum = emailNumMatch ? emailNumMatch[0] : '';

          if(shortcode && year && className && emailNum) {
            const uniqueId = `APS-${shortcode}-${year}-${className}-${emailNum}`;
            results.push({
              i: uniqueId,
              n: data.DN,
              e: email,
              p: data.PW,
              s: 'APS'
            });
          }
        } catch(err) {}
      })
      .on('end', resolve)
      .on('error', reject);
  });
};

const processKgbv = () => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync('KGBV Students 1.csv')) {
      resolve();
      return;
    }
    
    // Track running counters for School (SA) + Class (JT)
    const kgbvCounters = {};

    fs.createReadStream('KGBV Students 1.csv')
      .pipe(csv())
      .on('data', (data) => {
        try {
          // I2: UPPER(LEFT(CT,3))
          const city = data.CT || '';
          const cityCode = city.substring(0, 3).toUpperCase();
          
          // H2: RIGHT(SA,4)
          const sa = data.SA || '';
          const schoolCode = sa.length >= 4 ? sa.slice(-4) : sa;

          // F2: MID(JT, FIND("(",JT)+1, 2)
          const jt = data.JT || '';
          const classMatch = jt.match(/\((.*?)\)/);
          const className = classMatch ? classMatch[1] : '';

          // COUNTIFS(H$2:H2,H2,F$2:F2,F2)
          const counterKey = `${sa}_${jt}`;
          kgbvCounters[counterKey] = (kgbvCounters[counterKey] || 0) + 1;
          const roll = kgbvCounters[counterKey].toString().padStart(2, '0');

          if(cityCode && schoolCode && className && roll) {
            const uniqueId = `KGBV-UP-${cityCode}-${schoolCode}-${className}-${roll}`;
            results.push({
              i: uniqueId.toUpperCase(),
              n: data.DN,
              e: data.ID,
              p: data.PW,
              s: 'KGBV'
            });
          }
        } catch(err) {}
      })
      .on('end', resolve)
      .on('error', reject);
  });
};

const processAshram = () => {
  return new Promise((resolve, reject) => {
    const newFile = 'AshramSchoolStudent with UniqueID.csv';
    if (!fs.existsSync(newFile)) {
      resolve();
      return;
    }
    
    fs.createReadStream(newFile)
      .pipe(csv())
      .on('data', (data) => {
        try {
          const uniqueKey = (data.UniqueKey || '').trim();
          if (uniqueKey) {
            results.push({
              i: uniqueKey,
              n: data.DN,
              e: data.ID,
              p: data.PW,
              s: 'ASHRAM',
              sn: data['School Name'] || ''
            });
          }
        } catch(err) {}
      })
      .on('end', resolve)
      .on('error', reject);
  });
};

console.log("Starting to process datasets...");
Promise.all([processAps(), processKgbv(), processAshram()])
  .then(() => {
    fs.writeFileSync('./public/students.json', JSON.stringify(results));
    console.log(`✅ Success! Processed ${results.length} students into public/students.json!`);
    console.log(`The React App will now automatically load all ${results.length} records instantly.`);
  })
  .catch((error) => {
    console.error("❌ Error processing datasets:");
    console.error(error);
  });
