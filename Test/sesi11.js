import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';
import chrome from 'selenium-webdriver/chrome.js';

import fs from 'fs';
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import page_login from '../pages/page_login.js';

describe ('Google search test', function () {
    // tingkatkan timeout karena selenium lumayan lambat
    this.timeout(60000);
    let driver ;

    before(async function (){
        console.log('ini didalam before() hook')
        driver = await new Builder().forBrowser('chrome').build(); 

        await driver.get('https://www.saucedemo.com/');

        
        let inputUsernamePOM = await driver.findElement(page_login.inputUsername)
        let inputPasswordPOM = await driver.findElement(page_login.inputPassword)
        let buttonloginPOM = await driver.findElement(page_login.buttonLogin)

        await inputUsernamePOM.sendKeys('standard_user');
        await inputPasswordPOM.sendKeys('secret_sauce');
        await buttonloginPOM.click();
    });

    after(async function () {
        console.log('ini didalam after() hook')
        await driver.quit();
    });

    it ('Test Case 1 - Sukses Login Saucedemo', async function (){

        const CurrentUrl = await driver.getCurrentUrl();
        assert.strictEqual(CurrentUrl, 'https://www.saucedemo.com/inventory.html')

    });

    it ('Test Case 1 - ScreenShot Login Page', async function (){

        //full screeshot
        let ss_full = await driver.takeScreenshot();
        fs.writeFileSync("screenshot/full_screenshot1.png", Buffer.from(ss_full, "base64"));

        //partial screeshot
        let inventoryTitle = await driver.findElement(By.xpath('//*[@id="header_container"]/div[1]/div[2]/div'));
        let ss_title = await inventoryTitle.takeScreenshot();
        fs.writeFileSync("screenshot/inventory_screenshot.png", Buffer.from(ss_title, "base64"));

    });

    it ('Test Case 1 - Cek Visual Login Page', async function (){

        let screenshot = await driver.takeScreenshot();
        let imgBuffer = Buffer.from(screenshot, "base64")
        fs.writeFileSync("screenshot/current.png", imgBuffer);

        
        if (!fs.existsSync("screenshot/baseline.png")) {
            fs.copyFileSync("screenshot/current.png", "screenshot/baseline.png");
            console.log("baseline image saved");
        }

        let img1 = PNG.sync.read(fs.readFileSync("screenshot/baseline.png"));
        let img2 = PNG.sync.read(fs.readFileSync("screenshot/current.png"));
        let {width, height} = img1;
        let diff = new PNG({width, height});

        let numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1});

        fs.writeFileSync("screenshot/diff.png", PNG.sync.write(diff));

        if (numDiffPixels > 0) {
            console.log(`Visual differences found! Pixels different: ${numDiffPixels}`);
        } else {
            console.log(`No Visual differences found!`);
        }
        
    });

    it ('Test Case 2 - Urutan produk dari A ke Z', async function (){
    
        const sortSelect = await driver.findElement(By.xpath('//*[@id="header_container"]/div[2]/div/span/select'))
        await sortSelect.sendKeys('Name (A to Z)');

        const firstItem = await driver.findElement(By.xpath('//*[@id="item_4_title_link"]/div'))
        const itemname = await firstItem.getText();
    
        assert.strictEqual(itemname, 'Sauce Labs Backpack');
    
    });

    it ('Test Case 2 - ScreenShot Page A to Z', async function (){

        //full screeshot
        let ss_full = await driver.takeScreenshot();
        fs.writeFileSync("screenshot/full_screenshot2.png", Buffer.from(ss_full, "base64"));

        //partial screeshot
        const sortSelect = await driver.findElement(By.xpath('//*[@id="header_container"]/div[2]/div/span/select'));
        let ss_select = await sortSelect.takeScreenshot();
        fs.writeFileSync("screenshot/atoz_screenshot.png", Buffer.from(ss_select, "base64"));

        const firstItem = await driver.findElement(By.xpath('//*[@id="item_4_title_link"]/div'))
        let ss_itemname = await firstItem.takeScreenshot();
        fs.writeFileSync("screenshot/item_screenshot.png", Buffer.from(ss_itemname, "base64"));

    });

    it ('Test Case 2 - Cek Visual Page Sort Cart A to Z', async function (){

        const sortSelect = await driver.findElement(By.xpath('//*[@id="header_container"]/div[2]/div/span/select'))
        await sortSelect.sendKeys('Name (A to Z)');

        const firstItem = await driver.findElement(By.xpath('//*[@id="item_4_title_link"]/div'))
        const itemname = await firstItem.getText();
    
        assert.strictEqual(itemname, 'Sauce Labs Backpack');

        let screenshot = await driver.takeScreenshot();
        let imgBuffer = Buffer.from(screenshot, "base64")
        fs.writeFileSync("screenshot/current1.png", imgBuffer);

        
        if (!fs.existsSync("screenshot/baseline1.png")) {
            fs.copyFileSync("screenshot/current1.png", "screenshot/baseline1.png");
            console.log("baseline1 image saved");
        }

        let img1 = PNG.sync.read(fs.readFileSync("screenshot/baseline1.png"));
        let img2 = PNG.sync.read(fs.readFileSync("screenshot/current1.png"));
        let {width, height} = img1;
        let diff = new PNG({width, height});

        let numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1});

        fs.writeFileSync("screenshot/diff1.png", PNG.sync.write(diff));

        if (numDiffPixels > 0) {
            console.log(`Visual differences found! Pixels different: ${numDiffPixels}`);
        } else {
            console.log(`No Visual differences found!`);
        }
        
    });

    it ('Test Case 3 - Shopping Cart', async function (){

        const cartIcon = await driver.findElement(By.css('#shopping_cart_container a'));
        await cartIcon.click();
        
        const CurrentUrl = await driver.getCurrentUrl();
        assert.strictEqual(CurrentUrl, 'https://www.saucedemo.com/cart.html');
        
        const cartTitle = await driver.findElement(By.css('.title'));
        const titleText = await cartTitle.getText();
            
        assert.strictEqual(titleText, 'Your Cart');
    });

    it ('Test Case 3 - Screenshot Shopping Cart', async function (){

        await driver.get('https://www.saucedemo.com/cart.html');
        const CurrentUrl = await driver.getCurrentUrl();

        //full screeshot
        let ss_full = await driver.takeScreenshot();
        fs.writeFileSync("screenshot/full_screenshot3.png", Buffer.from(ss_full, "base64"));

        //partial screeshot
        const cartIcon = await driver.findElement(By.css('#shopping_cart_container a'));
        let ss_icon = await cartIcon.takeScreenshot();
        fs.writeFileSync("screenshot/shoppingcart_screenshot.png", Buffer.from(ss_icon, "base64"));

        const cartTitle = await driver.findElement(By.css('.title'));
        let ss_title = await cartTitle.takeScreenshot();
        fs.writeFileSync("screenshot/carttitle_screenshot.png", Buffer.from(ss_title, "base64"));
    });

    it.only ('Test Case 3 - Cek Visual Page Shopping Cart', async function (){

        const cartIcon = await driver.findElement(By.css('#shopping_cart_container a'));
        await cartIcon.click();
        
        const CurrentUrl = await driver.getCurrentUrl();
        assert.strictEqual(CurrentUrl, 'https://www.saucedemo.com/cart.html');
        
        const cartTitle = await driver.findElement(By.css('.title'));
        const titleText = await cartTitle.getText();
    
        assert.strictEqual(titleText, 'Your Cart');

        let screenshot = await driver.takeScreenshot();
        let imgBuffer = Buffer.from(screenshot, "base64")
        fs.writeFileSync("screenshot/current2.png", imgBuffer);

        
        if (!fs.existsSync("screenshot/baseline2.png")) {
            fs.copyFileSync("screenshot/current2.png", "screenshot/baseline2.png");
            console.log("baseline2 image saved");
        }

        let img1 = PNG.sync.read(fs.readFileSync("screenshot/baseline2.png"));
        let img2 = PNG.sync.read(fs.readFileSync("screenshot/current2.png"));
        let {width, height} = img1;
        let diff = new PNG({width, height});

        let numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1});

        fs.writeFileSync("screenshot/diff2.png", PNG.sync.write(diff));

        if (numDiffPixels > 0) {
            console.log(`Visual differences found! Pixels different: ${numDiffPixels}`);
        } else {
            console.log(`No Visual differences found!`);
        }
    });
});