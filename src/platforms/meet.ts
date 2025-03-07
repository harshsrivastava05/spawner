import { By, until, WebDriver } from "selenium-webdriver";

async function openMeet(driver: WebDriver, url: string) {
  try {
    await driver.get(url);
    await driver.sleep(3000);
    const popubutton = await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(),"Got it")]')),
      10000
    );
    await popubutton.click();
    // const nameinput = await driver.wait(
    //   until.elementLocated(By.id('c11')),
    //   10000
    // );
    const nameinput = await driver.wait(
      until.elementLocated(By.xpath('//input[@placeholder="Your name"]')),
      10000
    );
    await nameinput.clear();
    await nameinput.click();
    await nameinput.sendKeys("value");
    const Buttoninput = await driver.wait(
      until.elementLocated(
        By.xpath(
          '//span[contains(text(),"Ask to join") or contains(text(),"Join")]'
        )
      ),
      10000
    );
    await Buttoninput.click();
  } finally {
    // await driver.quit();
  }
}

export default openMeet;
