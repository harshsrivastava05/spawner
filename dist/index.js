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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChromeDriver_1 = __importDefault(require("./ChromeDriver"));
const insert_1 = __importDefault(require("./platforms/insert"));
const url = "https://us04web.zoom.us/j/9156246426?pwd=Y2FCQzMrSGRBL1JlTWpIMVBpczlvdz09";
const meetingid = "915 624 6426";
const password = "169268";
function startScreenshare(driver) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("startScreensharecalled");
        const response = yield driver.executeScript(`

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

            // window.setInterval(() => {
            //   document.querySelectorAll("audio").forEach(audioEl => {
            //     if (!audioEl.getAttribute("added")) {
            //       console.log("adding new audio");
            //       const audioEl = document.querySelector("audio");
            //       const audioElStream = audioContext.createMediaStreamSource(audioEl.srcObject)
            //       audioEl.setAttribute("added", true);
            //       audioElStream.connect(dest)
            //     }
            //   })

            // }, 2500);
          
          // Combine screen and audio streams
          const combinedStream = new MediaStream([
              ...screenStream.getVideoTracks(),
              ...dest.stream.getAudioTracks()
          ]);
          
          console.log("before start recording")
          const recordedChunks = await startRecording(combinedStream, 60000);
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
    });
}
function Main() {
    return __awaiter(this, void 0, void 0, function* () {
        const driver = yield (0, ChromeDriver_1.default)();
        //   await openMeet(driver, url);
        // await openZoom(driver, url);
        // await Zoom(driver, password, url);
        yield (0, insert_1.default)(driver, url);
        yield new Promise((x) => setTimeout(x, 20000));
        // wait until admin lets u join
        yield startScreenshare(driver);
    });
}
Main();
