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
function ZoomJoin(driver, url) {
    return __awaiter(this, void 0, void 0, function* () {
        yield driver.get(url);
        yield driver.sleep(8000);
        yield driver.executeScript(`
        const joinButton = document.createElement("a");
        joinButton.setAttribute("web_client", "");
        joinButton.setAttribute("tabindex", "0");
        joinButton.setAttribute("role", "button");
        joinButton.setAttribute("id", "clickable_join_now"); 
        joinButton.textContent = "Join from your browser";
        document.body.appendChild(joinButton);
        `);
        const joinmeeting = yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.id("clickable_join_now")), 4000);
        yield joinmeeting.click();
        yield driver.sleep(3000);
        const nameinput = yield driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath('//*[@id="input-for-name"]')), 10000);
        yield nameinput.clear();
        yield nameinput.click();
        yield nameinput.sendKeys("value");
        yield driver.sleep(1000);
        yield driver
            .wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath('//*[@id="root"]/div/div[1]/button')), 10000)
            .click();
    });
}
exports.default = ZoomJoin;
