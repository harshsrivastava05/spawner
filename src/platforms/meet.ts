import { By, until, WebDriver, Key } from "selenium-webdriver";

async function openMeet(driver: WebDriver, url: string) {
  try {
    await driver.get(url);
    await driver.sleep(3000);
    
    try {
      // Disable mic (Ctrl+D) and camera (Ctrl+E)
      const body = await driver.findElement(By.css('body'));
      await body.sendKeys(Key.chord(Key.CONTROL, 'd'));
      await driver.sleep(1000);
      await body.sendKeys(Key.chord(Key.CONTROL, 'e'));
      await driver.sleep(1000);
    } catch (error) {
      console.log("Error while trying to disable mic/camera:", error);
    } finally {
      // Continue to join the meeting regardless
      try {
        const popubutton = await driver.wait(
          until.elementLocated(By.xpath('//span[contains(text(),"Got it")]')),
          5000
        );
        await popubutton.click();
      } catch (e) {
        // Popup might not appear, which is fine
      }

      const nameinput = await driver.wait(
        until.elementLocated(By.xpath('//input[@placeholder="Your name"]')),
        10000
      );
      await nameinput.clear();
      await nameinput.click();
      await nameinput.sendKeys("spawner");
      const Buttoninput = await driver.wait(
        until.elementLocated(
          By.xpath(
            '//span[contains(text(),"Ask to join") or contains(text(),"Join")]'
          )
        ),
        10000
      );
      await Buttoninput.click();
    }
  } finally {
    // await driver.quit();
  }
}

export default openMeet;
