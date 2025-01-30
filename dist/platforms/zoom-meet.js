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
// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
function Zoom(driver, password, url) {
    return __awaiter(this, void 0, void 0, function* () {
        //   await driver.manage().window().maximize();
        yield driver.sleep(8000);
        function clickJoinFromBrowser() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield driver.sleep(60000);
                    const joinButton = yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath("//a[@role='button' and contains(text(), 'Join from your browser')]")), 10000);
                    yield joinButton.click();
                    console.log("Clicked 'Join from your browser' button.");
                }
                catch (error) {
                    console.error("Error clicking 'Join from your browser' button:", error);
                }
            });
        }
        function loginProcess(password, url) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield driver.get(url);
                    const pasinput = yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.id("input-for-pwd")), 10000);
                    yield pasinput.clear();
                    yield pasinput.click();
                    yield pasinput.sendKeys(password);
                    yield driver.sleep(1000);
                    const nameinput = yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath('//*[@id="input-for-name"]')), 10000);
                    yield nameinput.clear();
                    yield nameinput.click();
                    yield nameinput.sendKeys("value");
                    yield driver.sleep(1000);
                    yield driver
                        .wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath('//*[@id="zm-btn"]')), 10000)
                        .click();
                    yield driver.sleep(5000);
                    yield driver
                        .wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath('//*[@id="root"]/div/div[1]/button')), 10000)
                        .click();
                }
                catch (error) {
                    console.error("Error in logging:", error);
                    process.exit(1);
                }
            });
        }
        function afterLogin() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.className("video-avatar__avatar")), 100000);
                    yield driver.executeScript('document.getElementById("wc-footer").className = "footer";');
                    yield driver
                        .wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath('//*[@id="wc-footer"]/div/div[2]/div[1]/button')), 10000)
                        .click();
                }
                catch (error) {
                    console.error("Error occurred, not able to open participants list in time:", error);
                }
            });
        }
        yield loginProcess(password, url);
        yield clickJoinFromBrowser();
        yield afterLogin();
    });
}
exports.default = Zoom;
