const {Builder, By, Key, until} = require("selenium-webdriver")
require("dotenv").config()

describe("", () => {
    let driver;

    beforeAll(async() => {
        driver = await new Builder().forBrowser('chrome').build();
        jest.setTimeout(90 * 1000)
        await driver.manage().window().maximize();
    })

    afterAll(async() => {
        jest.setTimeout(5 * 1000)
        await driver.quit();
    })

    const setDelay = async() => {
        
    }

    it("Should open homepage and title should say Home", async() =>{
        await driver.get(process.env.url);
        await driver.getTitle().then(title => {
            expect(title).toEqual("Home")
        })
        await setDelay();
    })
    it("Should open contact page and title should say Contact Us", async() => {
        // await driver.get(driver.getCurrentUrl());
        // let element = await driver.findElement(By.name('contact'))
        // await element.sendKeys('Contact Us', Key.TAB);
        // await element.submit();
        // await setDelay();
        await driver.findElement(By.name("contact")).click();
        await setDelay();

        await driver.wait(until.titleContains('Contact Us'), 30000)
        await driver.getTitle().then(title => {
            expect(title).toEqual("Contact Us")
        })
        await setDelay();
    })

    it("Signup should have message 'More info coming to' and email address entered", async() => {
        await driver.get(driver.getCurrentUrl());
        const email = await driver.findElements(By.name('email'))
        if (email) {
            await driver.actions().sendKeys('email@email.com').sendKeys(Key.TAB)
            await setDelay()
            await driver.actions().sendKeys(Key.RETURN).perform()
        }
        const element = driver.findElements(By.id('message'));
        if (element) {
          expect(element).toContain('More info coming to email@email.com');
        }
        // let text = await driver.findElement(By.css('h1')).getText();
        // await text.contains('More info coming to heather@heather.com')
        const error = await driver.findElements(By.id("error")).getText()
        expect(error).toEqual("Error")
        await setDelay();
    })
})

