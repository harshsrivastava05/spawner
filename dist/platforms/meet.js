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
function openMeet(driver, url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield driver.get(url);
            yield driver.sleep(3000);
            const popubutton = yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath('//span[contains(text(),"Got it")]')), 10000);
            yield popubutton.click();
            // const nameinput = await driver.wait(
            //   until.elementLocated(By.id('c11')),
            //   10000
            // );
            const nameinput = yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath('//input[@placeholder="Your name"]')), 10000);
            yield nameinput.clear();
            yield nameinput.click();
            yield nameinput.sendKeys("value");
            const Buttoninput = yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath('//span[contains(text(),"Ask to join") or contains(text(),"Join")]')), 10000);
            yield Buttoninput.click();
        }
        finally {
            // await driver.quit();
        }
    });
}
exports.default = openMeet;
