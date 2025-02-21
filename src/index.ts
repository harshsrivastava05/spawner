import { By, until, WebDriver } from "selenium-webdriver";
import getChromeDriver from "./ChromeDriver";
import openMeet from "./platforms/meet";
import openZoom from "./platforms/zoom";
import ZoomJoin from "./platforms/JoinZoom";

const url = "your url here";

async function startScreenshare(driver: WebDriver, recordingTime: number) {
  console.log("startScreensharecalled");
  const response = await driver.executeScript(`

        function wait(delayInMS) {
            return new Promise((resolve) => setTimeout(resolve, delayInMS));
        }

        function startRecording(stream, lengthInMS) {
            let recorder = new MediaRecorder(stream);
            let data = [];
            
            recorder.ondataavailable = (event) => data.push(event.data);
            recorder.start();
            
            let stopped = new Promise((resolve, reject) => {
                recorder.onstop = resolve;
                recorder.onerror = (event) => reject(event.name);
            });
            
            let recorded = wait(lengthInMS).then(() => {
                if (recorder.state === "recording") {
                recorder.stop();
                }
            });
            
            return Promise.all([stopped, recorded]).then(() => data);
        }
      
        console.log("before media devices")
        window.navigator.mediaDevices.getDisplayMedia({
            video: {
              displaySurface: "browser"
            },
            audio: true,
            preferCurrentTab: true
        }).then(async screenStream => {                        
            const audioContext = new AudioContext();
            const screenAudioStream = audioContext.createMediaStreamSource(screenStream)
            const audioEl1 = document.querySelectorAll("audio")[0];
            const audioEl2 = document.querySelectorAll("audio")[1];
            const audioEl3 = document.querySelectorAll("audio")[2];
            const audioElStream1 = audioContext.createMediaStreamSource(audioEl1.srcObject)
            const audioElStream2 = audioContext.createMediaStreamSource(audioEl3.srcObject)
            const audioElStream3 = audioContext.createMediaStreamSource(audioEl2.srcObject)

            const dest = audioContext.createMediaStreamDestination();

            screenAudioStream.connect(dest)
            audioElStream1.connect(dest)
            audioElStream2.connect(dest)
            audioElStream3.connect(dest)
          
          // Combine screen and audio streams
          const combinedStream = new MediaStream([
              ...screenStream.getVideoTracks(),
              ...dest.stream.getAudioTracks()
          ]);
          
          console.log("before start recording")
          const recordedChunks = await startRecording(combinedStream, ${recordingTime});
          console.log("after start recording")
          
          let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
          
          // Create download for video with audio
          const recording = document.createElement("video");
          recording.src = URL.createObjectURL(recordedBlob);
          
          const downloadButton = document.createElement("a");
          downloadButton.href = recording.src;
          downloadButton.download = "RecordedScreenWithAudio.webm";    
          downloadButton.click();
          
          console.log("after download button click")
          
          // Clean up streams
          screenStream.getTracks().forEach(track => track.stop());
          audioStream.getTracks().forEach(track => track.stop());
        })
        
    `);

  console.log(response);
  driver.sleep(1000000);
}

async function Main() {
  const driver = await getChromeDriver();
  await openMeet(driver, url);
  await new Promise((x) => setTimeout(x, 20000));
  // wait until admin lets u join
  const recordingTime = 20000; // time in ms
  await startScreenshare(driver, recordingTime);
}
Main();
