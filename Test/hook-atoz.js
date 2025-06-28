const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
//const firefox = require('selenium-webdriver/firefox');

describe('Test Suite - Gogle Search', function (){
    let driver;

    before(async function (){
        console.log('ini didalam before() hook')
        driver = await new Builder().forBrowser('chrome').build(); 

        await driver.get('https://www.saucedemo.com/');

        
        let inputUsername = await driver.findElement(By.xpath('//*[@id="user-name"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@id="password"]'))
        let buttonlogin = await driver.findElement(By.xpath('//*[@id="login-button"]'))

        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await buttonlogin.click();

        await driver.get('https://www.saucedemo.com/inventory.html');
        const CurrentUrl = await driver.getCurrentUrl();

    });

    after(async function () {
        console.log('ini didalam after() hook')
        await driver.quit();
    });

    it('Test Case 2 - A to Z', async function (){

        const sortSelect = await driver.findElement(By.xpath('//*[@id="header_container"]/div[2]/div/span/select'))
        await sortSelect.sendKeys('Name (A to Z)');

        const firstItem = await driver.findElement(By.xpath('//*[@id="item_4_title_link"]/div'))
        const itemname = await firstItem.getText();

    });
});