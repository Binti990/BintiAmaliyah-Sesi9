const {Builder, By, until} = require ('selenium-webdriver');
const assert = require ('assert');

describe ('Google search test', function () {
    // tingkatkan timeout karena selenium lumayan lambat
    this.timeout(60000);
    let driver ;

    
    it ('Urutan produk dari A ke Z', async function (){
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

        const sortSelect = await driver.findElement(By.xpath('//*[@id="header_container"]/div[2]/div/span/select'))
        await sortSelect.sendKeys('Name (A to Z)');

        const firstItem = await driver.findElement(By.xpath('//*[@id="item_4_title_link"]/div'))
        const itemname = await firstItem.getText();

        assert.strictEqual(itemname, 'Sauce Labs Backpack');

        await driver.quit();
    });
        
});