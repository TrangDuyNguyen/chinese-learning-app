import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function runTest() {
  console.log('--- STARTING AUDIO & PRONUNCIATION BROWSER TEST ---');

  // 1. Start vite preview server
  console.log('Starting preview server on port 4173...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4173'], {
    cwd: process.cwd(),
    stdio: 'pipe'
  });

  await new Promise((resolve) => {
    server.stdout.on('data', (data) => {
      const out = data.toString();
      if (out.includes('http://localhost:4173')) resolve();
    });
    setTimeout(resolve, 2500);
  });

  console.log('Launching Chrome via Puppeteer-Core...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  const page = await browser.newPage();
  const networkRequests = [];
  const errors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
      console.error('[Browser Error]', msg.text());
    }
  });

  page.on('response', response => {
    const url = response.url();
    if (url.includes('.mp3')) {
      networkRequests.push({ url, status: response.status() });
      console.log(`[Audio Response] ${response.status()} -> ${url}`);
    }
  });

  console.log('Navigating to app...');
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

  // Log in as Admin first (since app is gated)
  console.log('Logging in as Admin to access app...');
  const tabButtons = await page.$$('button');
  for (const b of tabButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Admin & Thử Nghiệm')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 600));

  const loginButtons = await page.$$('button');
  for (const b of loginButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Vào với Admin')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1200));

  // Switch to Pinyin tab
  console.log('Clicking "Bảng Âm Pinyin" tab...');
  const navButtons = await page.$$('button');
  for (const b of navButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Bảng Âm Pinyin')) {
      await b.click();
      break;
    }
  }

  await new Promise(r => setTimeout(r, 1000));

  // 1. Click Tone mā
  const maButtons = await page.$$('button');
  for (const b of maButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('mā') && text.includes('妈')) {
      console.log('Testing tone sound (mā)...');
      await b.click();
      break;
    }
  }

  await new Promise(r => setTimeout(r, 1000));

  // 2. Switch to Initials
  const subButtons = await page.$$('button');
  for (const b of subButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('21 Thanh Mẫu')) {
      await b.click();
      break;
    }
  }

  await new Promise(r => setTimeout(r, 800));

  // Click initials (b, p, zh, q)
  const initialButtons = await page.$$('button');
  for (const b of initialButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (['b', 'p', 'zh', 'q', 'x'].includes(text.trim())) {
      console.log(`Clicking initial "${text.trim()}"...`);
      await b.click();
      await new Promise(r => setTimeout(r, 500));
    }
  }

  // 3. Switch to Finals
  const allButtons = await page.$$('button');
  for (const b of allButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('36 Vận Mẫu')) {
      await b.click();
      break;
    }
  }

  await new Promise(r => setTimeout(r, 800));

  // Click finals
  const finalButtons = await page.$$('button');
  for (const b of finalButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('ü') || text.includes('ai')) {
      console.log(`Clicking final "${text.trim().slice(0, 10)}"...`);
      await b.click();
      await new Promise(r => setTimeout(r, 500));
    }
  }

  await new Promise(r => setTimeout(r, 1500));

  console.log('\n--- VERIFICATION SUMMARY ---');
  console.log(`Total MP3 audio requests captured: ${networkRequests.length}`);
  networkRequests.forEach(req => console.log(`  ✓ Status ${req.status}: ${req.url}`));

  console.log(`Browser Errors: ${errors.length}`);

  await browser.close();
  server.kill();

  if (networkRequests.length > 0 && errors.length === 0) {
    console.log('✅ ALL AUDIO TESTS PASSED PERFECTLY!\n');
    process.exit(0);
  } else {
    console.error('❌ Audio test failed: no audio captured or errors found.');
    process.exit(1);
  }
}

runTest().catch(err => {
  console.error('Test crashed:', err);
  process.exit(1);
});
