import { By } from "selenium-webdriver";

class PageLogin {
    static inputUsername = By.xpath('//*[@id="user-name"]');
    static inputPassword = By.xpath('//*[@id="password"]');
    static buttonLogin = By.xpath('//*[@id="login-button"]');
}

//module.exports = PageLogin;

// pakai ini buat ESM support
export default PageLogin;
