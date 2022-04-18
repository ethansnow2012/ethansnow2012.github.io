import puppeteer from 'puppeteer'

const rootPath = "http://localhost:3000/"
const maxTransitionTime = "1500"

jest.useRealTimers();
jest.setTimeout(10000);

function setupPuppeteer() {
  let browser= puppeteer.Browser
  let page= puppeteer.Page
  beforeEach(async () => {
    
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 100,
        timeout: 10000
    })//puppeteerOptions
    page = await browser.newPage()
  })

  afterEach(async () => {
    await browser.close()
  })
  return {
    page: () => page
  }
}
describe('describe 1', ()=>{  
  const {page} = setupPuppeteer()
  test('Main Page Load Successfully', async ()=>{
    await page().goto(rootPath)
    
    await page().waitForSelector(".p-select-wrapper");
    await page().waitForSelector(".p-content-wrapper-outter");
    await page().waitForSelector(".p-select-wrapper select option");
    
    const firstSelectOptionText = await page().$eval('.p-select-wrapper select option', (e) => e.textContent);

    expect(firstSelectOptionText).toBe('All')
  })
  test('Click the content button on main page', async ()=>{
    await page().goto(rootPath)

    await page().waitForSelector(".p-select-wrapper");
    await page().waitForSelector(".p-content-wrapper-outter");
    await page().waitForSelector(".p-select-wrapper select option");

    await page().click('.p-content-wrapper-outter .goto-content');
    await page().waitForTimeout(maxTransitionTime);

    await page().waitForSelector('.topicDescription-inner', {
      visible: true,
    })
  })

  test(`Side Effect Chain after Login 
    Start:
    then: 
      1. tag is editable
      2. content is editable
  `, async ()=>{
    await page().goto(rootPath)
    await page().waitForSelector(".btn-test-login");
    await page().click('.btn-test-login');
    await page().waitForSelector(".btn-signout");
    const btnSignIn = (await page().$('.btn-signin')) || "";
    
    expect(btnSignIn).toBeFalsy()
    
    await page().waitForSelector(".btn-editmode");
    await page().click(".btn-editmode");

    await page().waitForSelector(".p-select-wrapper-i2 > * > .active");
    await page().click('.p-select-wrapper-i2 > * > .active');
    await page().waitForSelector(".p-select-wrapper-i2 > * > .active.editable");

    await page().click('.p-content-wrapper-outter .goto-content');
    await page().waitForTimeout(maxTransitionTime);

    await page().waitForSelector('.topicDescription-inner', {
      visible: true,
    })
    
  })

})

