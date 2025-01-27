import { Builder, Browser, By, Key, until } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

async function Main() {
  const options = new Options({});
  options.addArguments("--disable-blink-features=AutomationControlled");
  options.addArguments("--use-fake-ui-for-media-stream");
  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();
  try {
    await driver.get("https://meet.google.com/pdc-zifk-wea");
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
    await driver.quit();
  }
}
Main();
