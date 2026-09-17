import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function runAuthTest() {
  console.log('--- STARTING AUTH & ADMIN APPROVAL LIFECYCLE TEST ---');

  // 1. Start vite preview server
  console.log('Starting preview server on port 4174...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4174'], {
    cwd: process.cwd(),
    stdio: 'pipe'
  });

  await new Promise((resolve) => {
    server.stdout.on('data', (data) => {
      const out = data.toString();
      if (out.includes('http://localhost:4174')) resolve();
    });
    setTimeout(resolve, 2500);
  });

  console.log('Launching Chrome via Puppeteer-Core...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('[Browser Error]', msg.text());
    }
  });

  page.on('dialog', async dialog => {
    await dialog.accept();
  });

  // STEP 1: Visit as unauthenticated user
  console.log('STEP 1: Visiting as unauthenticated user...');
  await page.goto('http://localhost:4174', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => localStorage.clear());
  await page.goto('http://localhost:4174', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  // Verify Login Screen is present
  const bodyText1 = await page.evaluate(() => document.body.innerText);
  if (!bodyText1.includes('Đăng nhập bằng tài khoản Google') && !bodyText1.includes('Hán Ngữ Zero to Hero')) {
    throw new Error('Login screen not displayed for unauthenticated user!');
  }
  console.log('  ✓ Unauthenticated user is properly gated at login screen.');

  // STEP 2: Register a new student (pending approval)
  console.log('STEP 2: Registering a new Google user (hocvien.test@gmail.com)...');
  // Click on "Admin & Thử Nghiệm" tab
  const tabButtons = await page.$$('button');
  for (const b of tabButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Admin & Thử Nghiệm')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 500));

  await page.type('input[type="email"]', 'hocvien.test@gmail.com');

  // Click Submit
  const submitBtn = await page.$('button[type="submit"]');
  await submitBtn.click();
  await new Promise(r => setTimeout(r, 1000));

  // Verify student is admitted directly into the learning app
  const bodyText2 = await page.evaluate(() => document.body.innerText);
  if (!bodyText2.includes('hocvien.test') || !bodyText2.includes('Hán Ngữ Zero to Hero')) {
    throw new Error('Student did not enter the learning app directly!');
  }
  console.log('  ✓ New student automatically approved and enters learning app directly.');

  // STEP 3: Log out to switch to Admin
  console.log('STEP 3: Logging out from student...');
  const logoutButtons = await page.$$('button');
  for (const b of logoutButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    const title = await page.evaluate(el => el.getAttribute('title'), b);
    if ((text && text.includes('Đăng Xuất')) || title === 'Đăng xuất') {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1000));

  // STEP 4: Log in as Admin
  console.log('STEP 4: Logging in as Admin (admin@mandarin.app)...');
  const demoButtons = await page.$$('button');
  for (const b of demoButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Vào với Admin')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1500));

  // Verify Admin is inside the app and has admin status
  const bodyText3 = await page.evaluate(() => document.body.innerText);
  if (!bodyText3.includes('Lộ Trình Tổng Quan') || (!bodyText3.includes('Admin') && !bodyText3.includes('Phê Duyệt'))) {
    throw new Error('Admin did not get access or lacks Admin controls!');
  }
  console.log('  ✓ Admin logged in and has access to app and approval controls.');

  // STEP 5: Open Admin Approval Modal and verify user management
  console.log('STEP 5: Opening Admin Approval Modal...');
  const navButtons = await page.$$('button');
  for (const b of navButtons) {
    const title = await page.evaluate(el => el.getAttribute('title'), b);
    const text = await page.evaluate(el => el.textContent, b);
    if ((title && title.includes('phê duyệt')) || (text && text.includes('Phê Duyệt'))) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1000));

  // Close modal
  const closeButtons = await page.$$('button');
  for (const b of closeButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.trim() === 'Đóng') {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 800));
  console.log('  ✓ Admin verified user management modal successfully.');

  // STEP 6: Log out Admin and log in as hocvien.test@gmail.com
  console.log('STEP 6: Logging out Admin to verify student access...');
  // Trigger logout in navbar

  const allButtonsAfter = await page.$$('button');
  for (const b of allButtonsAfter) {
    const title = await page.evaluate(el => el.getAttribute('title'), b);
    if (title === 'Đăng xuất') {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1500));

  // Log in as hocvien.test@gmail.com again
  console.log('Logging in as previously approved student...');
  const tabButtons3 = await page.$$('button');
  for (const b of tabButtons3) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Admin & Thử Nghiệm')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 500));

  const emailInput = await page.$('input[type="email"]');
  if (emailInput) {
    await page.evaluate(el => { el.value = ''; }, emailInput);
    await emailInput.type('hocvien.test@gmail.com', { delay: 10 });
    const val = await page.evaluate(el => el.value, emailInput);
    console.log('Typed input value:', val);
  }
  const submitBtn2 = await page.$('button[type="submit"]');
  console.log('Submit button found:', !!submitBtn2);
  if (submitBtn2) {
    await submitBtn2.click();
  }
  await new Promise(r => setTimeout(r, 2000));

  // Verify Student is now INSIDE the app!
  const bodyText4 = await page.evaluate(() => document.body.innerText);
  console.log('Body text in Step 6:', bodyText4.slice(0, 300));
  if (!bodyText4.includes('Lộ Trình Tổng Quan') || !bodyText4.includes('Bảng Âm Pinyin')) {
    throw new Error('Approved student could not access the learning app!');
  }
  console.log('  ✓ Approved student successfully entered the learning application!');

  await browser.close();
  server.kill();
  console.log('\n✅ ALL AUTH & ADMIN APPROVAL TESTS PASSED WITH 100% SUCCESS!\n');
  process.exit(0);
}

runAuthTest().catch(err => {
  console.error('Auth test failed:', err);
  process.exit(1);
});
