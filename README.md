# Google Meet Bot

A bot built using Selenium WebDriver and Node.js that automatically joins a Google Meet meeting, records the session, and saves it to your device.

## Features
- Automatically joins a Google Meet meeting.
- Records the meeting.
- Saves the recorded session to your device.

## Prerequisites
Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [Google Chrome](https://www.google.com/chrome/)
- [Chromedriver](https://sites.google.com/chromium.org/driver/) (Ensure it matches your Chrome version)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/harshsrivastava05/spawner.git
   cd spawner
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   - Add the following details:
     ```ini
     MEETING_LINK=https://meet.google.com/your-meeting-code
     ```

## Usage
1. Run the bot:
   ```sh
   node index.js
   ```
2. The bot will open Google Meet, join the meeting, and start recording.
3. The recorded session will be saved in the specified output folder.

## Notes
- Ensure your Google account allows less secure app logins or set up OAuth authentication.
- The bot requires Chrome and Chromedriver to be installed and properly configured.
- Consider using a headless screen recorder like `ffmpeg` or `OBS` for recording.

## Contributing
Feel free to fork the project and submit pull requests.

## License
This project is licensed under the MIT License.

