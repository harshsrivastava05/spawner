import { By, until, WebDriver } from "selenium-webdriver";

async function openZoom(driver: WebDriver, url: string) {
  try {
    await driver.get(url);
    await driver.sleep(8000);

    const popubutton = await driver.wait(
        until.elementLocated(By.className("onetrust-close-btn-container")),
        10000
      );
      await popubutton.click();

    // const elem = await driver.wait(
    //   until.elementLocated(By.xpath("//a[contains(text(),'SIGN IN')]")),
    //   10000
    // );
    // await elem.clear();

    // await elem.click();

    const emailField = await driver.wait(
      until.elementLocated(By.xpath("//input[@id='email']")),
      10000
    );
    await emailField.clear();
    await emailField.click();
    emailField.sendKeys("email");

    const passField = await driver.wait(
      until.elementLocated(By.xpath("//input[@id='password']")),
      10000
    );
    await passField.clear();
    await passField.click();
    passField.sendKeys("password");
    const Buttoninput = await driver.wait(
      until.elementLocated(By.id("zm-button__slot")),
      10000
    );
    await Buttoninput.click();
  } finally {
    // await driver.quit();
  }
}

export default openZoom;
