"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
function openZoom(driver, url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield driver.get(url);
            yield driver.sleep(8000);
            const popubutton = yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.className("onetrust-close-btn-container")), 10000);
            yield popubutton.click();
            // const elem = await driver.wait(
            //   until.elementLocated(By.xpath("//a[contains(text(),'SIGN IN')]")),
            //   10000
            // );
            // await elem.clear();
            // await elem.click();
            const emailField = yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath("//input[@id='email']")), 10000);
            yield emailField.clear();
            yield emailField.click();
            emailField.sendKeys("email");
            const passField = yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath("//input[@id='password']")), 10000);
            yield passField.clear();
            yield passField.click();
            passField.sendKeys("password");
            const Buttoninput = yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.id("zm-button__slot")), 10000);
            yield Buttoninput.click();
        }
        finally {
            // await driver.quit();
        }
    });
}
exports.default = openZoom;
