import { Browser, Builder } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

async function getChromeDriver() {
  const options = new Options({});
  options.addArguments("--disable-blink-features=AutomationControlled");
  options.addArguments("--use-fake-ui-for-media-stream");
  options.addArguments("--window-size=1080,720");
  options.addArguments("--auto-select-desktop-capture-source=[RECORD]");
  options.addArguments("--auto-select-desktop-capture-source=[RECORD]");
  options.addArguments("--enable-usermedia-screen-capturing");
  options.addArguments('--auto-select-tab-capture-source-by-title="Meet"');
  options.addArguments("--allow-running-insecure-content");
  options.addArguments("--disable-user-media-security=true");
  options.addArguments("--disable-popup-blocking");
  
 
  // ​​--allow-file-access-from-files--use-fake-device-for-media-stream--allow-running-insecure-content--allow-file-access-from-files--use-fake-device-for-media-stream--allow-running-insecure-content
  
  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();
  return driver;
}

export default getChromeDriver;
