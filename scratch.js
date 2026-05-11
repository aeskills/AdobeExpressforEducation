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
    let count = 0;
    fs.createReadStream('APS Teachers and Students(Students).csv')
      .pipe(csv())
      .on('data', (data) => {
        try {
          if (count > 5) return;
          count++;
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
            console.log("APS:", uniqueId);
          }
        } catch(err) {}
      })
      .on('end', resolve)
      .on('error', reject);
  });
};

const processKgbv = () => {
  return new Promise((resolve, reject) => {
    let count = 0;
    fs.createReadStream('KGBV Students 1.csv')
      .pipe(csv())
      .on('data', (data) => {
        try {
          if (count > 5) return;
          count++;
          const state = getStateShortcode(data.ST || '');
          const city = getCityShortcode(data.CT || '');
          const mn = data.MN || '';
          const codeMatch = mn.match(/^[a-z]{2}(\d+)s/);
          let schoolCode = codeMatch ? codeMatch[1] : '0000';
          if (schoolCode.startsWith('0') && schoolCode.length > 4) schoolCode = schoolCode.substring(1); 
          else if (schoolCode.startsWith('0')) schoolCode = schoolCode.substring(1);

          const jt = data.JT || '';
          const classMatch = jt.match(/\((.*?)\)/);
          const className = classMatch ? classMatch[1] : '';
          
          const rollMatch = mn.match(/s\w+?(\d+)$/);
          let roll = rollMatch ? rollMatch[1] : '1';
          if (roll.length === 1) roll = '0' + roll;

          if(state && city && schoolCode && className && roll) {
            const uniqueId = `KGBV-${state}-${city}-${schoolCode}-${className}-${roll}`;
            console.log("KGBV:", uniqueId.toUpperCase());
          }
        } catch(err) {}
      })
      .on('end', resolve)
      .on('error', reject);
  });
};

Promise.all([processAps(), processKgbv()]).then(() => console.log("Done"));
