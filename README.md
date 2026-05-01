# Spawner: Google Meet Bot & Recorder

A robust, local automation tool built with **Selenium WebDriver**, **Node.js (Express)**, and a **Chrome Extension** that automatically joins Google Meet meetings, records the session (video + audio), and saves it directly to your device.

## How It Works
1. **The Backend**: A local Express server runs silently in the background, listening for requests to start a recording.
2. **The Frontend**: A custom Chrome Extension allows you to easily input your Google Meet link and desired recording duration.
3. **The Automation**: The server receives the request, launches a headless-ready Chrome instance, mutes the microphone and camera to silently join as "spawner," and captures the screen and tab audio using the WebRTC `MediaRecorder` API.

## Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [Google Chrome](https://www.google.com/chrome/)
- The project relies on the underlying Chrome installation to launch the Selenium WebDriver.

## Setup & Deployment (Local)

Because this application relies on a local browser to record the screen and download it locally, **running it as a background service on your own PC is the recommended approach.**

### 1. Start the Backend Server
First, install the dependencies and start the local Express server:
```sh
git clone https://github.com/harshsrivastava05/spawner.git
cd spawner
npm install
npm run dev
```
> The server will start and listen on `http://localhost:3000`. You can leave this terminal open or run it using a process manager like [PM2](https://pm2.keymetrics.io/) for persistent background execution.

### 2. Install the Chrome Extension
You need to load the trigger extension into your Chrome browser:
1. Open Google Chrome.
2. Navigate to `chrome://extensions/` in the URL bar.
3. Toggle **Developer mode** ON in the top right corner.
4. Click **Load unpacked** in the top left corner.
5. Select the `extension` folder located inside the `spawner` project directory.
6. Pin the "Spawner Trigger" extension to your Chrome toolbar.

## Usage
1. Click the "Spawner Trigger" extension icon in your browser.
2. Paste the **Meeting Link** (e.g., `https://meet.google.com/abc-defg-hij`).
3. Enter the **Recording Time** in minutes.
4. Click **Start Recording**.
5. The server will launch a new Chrome window, automatically disable the mic and camera (via keyboard shortcuts), join the meeting as "spawner", and begin recording.
6. Once the time is up, the video file (`RecordedScreenWithAudio.webm`) will automatically download to your computer's default `Downloads` folder!

## Cloud Deployment (Advanced)
If you wish to deploy this bot to a cloud server (VPS) instead of your local machine:
- You will need to install a virtual frame buffer (like **Xvfb** on Linux) so Chrome has a virtual screen to capture.
- You must install virtual audio drivers (like **PulseAudio**) to process tab audio.
- The `downloadButton.click()` logic will save the file to the cloud server's local file system. You will need to build an additional endpoint in `src/index.ts` to retrieve and serve the `.webm` files back to you.
- You will need to update `extension/popup.js` to point to your cloud server's IP address instead of `localhost:3000`.

## Contributing
Feel free to fork the project and submit pull requests to add support for more platforms (like Zoom or Teams) or enhance the recording capabilities!

## License
This project is licensed under the MIT License.
