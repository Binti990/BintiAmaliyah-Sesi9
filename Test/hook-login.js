const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
//const firefox = require('selenium-webdriver/firefox');

describe('Test Suite - Gogle Search', function (){
    let driver;

    before(async function (){
        console.log('ini didalam before() hook')
        driver = await new Builder().forBrowser('chrome').build(); 
    });

    after(async function () {
        console.log('ini didalam after() hook')
        await driver.quit();
    });

    it('Test Case 1 - Sukses Login Saucedemo', async function (){
            
        await driver.get('https://www.saucedemo.com/inventory.html');
        const CurrentUrl = await driver.getCurrentUrl();
    });
});
    