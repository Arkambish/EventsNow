import React from "react";
import { ReactNode } from "react";

// export interface ScannerProps {
//   isActive?: boolean;
//   children?: ReactNode;
//   interval?: number;
//   license?: string;
//   onInitialized?: (enhancer: CameraEnhancer, reader: BarcodeReader) => void;
//   onScanned?: (results: TextResult[]) => void;
//   onPlayed?: (playCallbackInfo: PlayCallbackInfo) => void;
//   onClosed?: () => void;
// }

const BarcodeScanner = (): React.ReactElement => {
  // const container = React.useRef(null);

  // React.useEffect(() => {
  //   const init = async () => {
  //     if (BarcodeReader.isWasmLoaded() === false) {
  //       if (props.license) {
  //         BarcodeReader.license = props.license;
  //       } else {
  //         BarcodeReader.license =
  //           "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ=="; //one-day trial license
  //       }
  //       BarcodeReader.engineResourcePath =
  //         "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@9.6.11/dist/";
  //     }
  //     reader.current = await BarcodeReader.createInstance();
  //     enhancer.current = await CameraEnhancer.createInstance();
  //     await enhancer.current.setUIElement(container.current!);
  //     enhancer.current.on("played", (playCallbackInfo: PlayCallbackInfo) => {
  //       if (props.onPlayed) {
  //         props.onPlayed(playCallbackInfo);
  //       }
  //     });
  //     enhancer.current.on("cameraClose", () => {
  //       if (props.onClosed) {
  //         props.onClosed();
  //       }
  //     });
  //     enhancer.current.setVideoFit("cover");
  //     if (props.onInitialized) {
  //       props.onInitialized(enhancer.current, reader.current);
  //     }
  //   };
  //   if (mounted.current === false) {
  //     init();
  //   }
  //   mounted.current = true;
  // }, []);

  return (
    <></>
    // <div
    //   ref={container}
    //   style={{ position: "relative", width: "100%", height: "100%" }}
    // >
    //   <div className="dce-video-container"></div>
    // </div>
  );
};

export default BarcodeScanner;
