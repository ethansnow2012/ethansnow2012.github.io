import puppeteer from 'puppeteer'

const rootPath = "http://localhost:3000/"
const maxTransitionTime = "1500"

jest.useRealTimers();
jest.setTimeout(27000);

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
describe('End-to-End test', ()=>{  
  const {page} = setupPuppeteer()
  test('Main Page Load Successfully', async ()=>{
    await page().goto(rootPath)
    await page().waitForSelector(".swiper-slide-active a");
    await page().click('.swiper-slide-active a');
    
    await page().waitForSelector(".p-select-wrapper");
    await page().waitForSelector(".p-content-wrapper-outter");
    await page().waitForSelector(".p-select-wrapper select option");
    
    const firstSelectOptionText = await page().$eval('.p-select-wrapper select option', (e) => e.textContent);

    expect(firstSelectOptionText).toBe('All')
  })
  test('Click the content button on main page', async ()=>{
    await page().goto(rootPath)
    await page().waitForSelector(".swiper-slide-active a");
    await page().click('.swiper-slide-active a');

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
    await page().waitForSelector(".swiper-slide-active a");
    await page().click('.swiper-slide-active a');

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
  test('topic are correctly shown via tags ', async ()=>{
    await page().goto(rootPath)
    await page().waitForSelector(".swiper-slide-active a");
    await page().click('.swiper-slide-active a');

    await page().waitForSelector(".btn-test-login");
    await page().click('.btn-test-login');

    await page().waitForTimeout(maxTransitionTime);
    await page().click(".goto-content");
    await page().waitForTimeout(maxTransitionTime);

    // await page().waitForSelector(".btn-editmode");
    // await page().click(".btn-editmode");

    await page().waitForSelector(".btn-test-login");
    await page().click('.btn-test-login');
    await page().waitForSelector('.topicDescription-inner *[contenteditable="true"]');
    await page().type('.topicDescription-inner *[contenteditable="true"]', 'test comment', {delay: 1})
    await page().click(".goback");

    await page().waitForSelector(".btn-editmode");
    await page().click(".btn-editmode");

    await page().waitForSelector(".p-content-wrapper-controlwrapper-i");
    await page().click(".p-content-wrapper-controlwrapper-i");

    // the new card is born now
    await page().waitForSelector(".p-content-wrapper .topic");

    let newElementTopic = await page().$('.p-content-wrapper .topic')
    let newElementDescription = await page().$('.p-content-wrapper .description')
    let newElementTagWrapper = await page().$('.p-content-wrapper .tag-wrapper')

    let topicInnerText  = await page().evaluate(el => el.textContent, newElementTopic)
    let descriptionInnerText  = await page().evaluate(el => el.textContent, newElementDescription)
    let descriptionTagWrapper  = await page().evaluate(el => el.textContent, newElementTagWrapper)
    
    expect(topicInnerText + descriptionInnerText + descriptionTagWrapper).toBe('')

    await page().click(".btn-viewmode");

    await page().click(".p-select-wrapper-i2 .active:nth-child(6)");

    await page().waitForTimeout(maxTransitionTime);

    newElementTopic = await page().$('.p-content-wrapper .topic')
    newElementDescription = await page().$('.p-content-wrapper .description')
    newElementTagWrapper = await page().$('.p-content-wrapper .tag-wrapper')

    topicInnerText  = await page().evaluate(el => el.textContent, newElementTopic)
    descriptionInnerText  = await page().evaluate(el => el.textContent, newElementDescription)
    descriptionTagWrapper  = await page().evaluate(el => el.textContent, newElementTagWrapper)
    
    expect(topicInnerText + descriptionInnerText + descriptionTagWrapper).not.toBe('')

  })
  test('Page landing behavior', async ()=>{
    await page().goto(rootPath)
    await page().waitForSelector(".swiper-slide-active a");
    await page().click('.swiper-slide-active a');

    await page().waitForSelector(".tag-wrapper-i");
    await page().click(".tag-wrapper-i");
    await page().waitForSelector(".p-select-wrapper-i2 > div > .active");
    console.log('how many?', (page().$$('.p-select-wrapper-i2 > div > .active')) )
    
    const activeTagCount = (await page().$$('.p-select-wrapper-i2 > div > .active')).length
    expect(activeTagCount).toBe(1)

  })
})


