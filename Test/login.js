const {Builder, By, until} = require ('selenium-webdriver');
const assert = require ('assert');

describe ('Google search test', function () {
    // tingkatkan timeout karena selenium lumayan lambat
    this.timeout(60000);
    let driver ;

    
    it ('Sukses Login Saucedemo', async function (){
        driver = await new Builder().forBrowser('chrome').build();

        await driver.get('https://www.saucedemo.com/');

        
        let inputUsername = await driver.findElement(By.xpath('//*[@id="user-name"]'))
        let inputPassword = await driver.findElement(By.xpath('//*[@id="password"]'))
        let buttonlogin = await driver.findElement(By.xpath('//*[@id="login-button"]'))

        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await buttonlogin.click();

        const CurrentUrl = await driver.getCurrentUrl();
        assert.strictEqual(CurrentUrl, 'https://www.saucedemo.com/inventory.html')

        await driver.quit();
    });

});