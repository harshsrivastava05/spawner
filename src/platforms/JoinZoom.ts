import { By, until, WebDriver } from "selenium-webdriver";

async function ZoomJoin(driver: WebDriver, url: string) {
  await driver.get(url);
  await driver.sleep(8000);
  await driver.executeScript(`
        const joinButton = document.createElement("a");
        joinButton.setAttribute("web_client", "");
        joinButton.setAttribute("tabindex", "0");
        joinButton.setAttribute("role", "button");
        joinButton.setAttribute("id", "clickable_join_now"); 
        joinButton.textContent = "Join from your browser";
        document.body.appendChild(joinButton);
        `);
  const joinmeeting = await driver.wait(
    until.elementLocated(By.id("clickable_join_now")),
    4000
  );
  await joinmeeting.click();
  await driver.sleep(3000);

  const nameinput = await driver.wait(
    until.elementLocated(By.xpath('//*[@id="input-for-name"]')),
    10000
  );
  await nameinput.clear();
  await nameinput.click();
  await nameinput.sendKeys("value");
  await driver.sleep(1000);

  await driver
    .wait(
      until.elementLocated(By.xpath('//*[@id="root"]/div/div[1]/button')),
      10000
    )
    .click();
}

export default ZoomJoin;