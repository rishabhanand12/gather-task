import React, { useState } from "react";
import ReactDOM from "react-dom";
import CountTable from "./CountTable";
import BoundingRectBox from "./BoundingRectBox";
import BoundingRectBarcode from "./BoundingRectBarcode";
import BoundingRectCode from "./BoundingRectCode";

export default function ImageModal(props) {
  let { image, codeTally, closeModal } = props;
  let { imageMetadata } = image;
  let [isOverlayVisible, setIsOverlayVisible] = useState(false);

  function handleOverlayVisibility() {
    setIsOverlayVisible(!isOverlayVisible);
  }

  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay-div">
        <div className="modal-container">
          <div
            className="modal-img"
            style={{ background: `url(${image.location})` }} // image added as a background image so bounding rect divs could be rendered on top of the image
          >
            {isOverlayVisible && (
              <>
                {imageMetadata.map((data) => {
                  // rendering the overlay based on image metadata array
                  var position = calcBoxCoordinates(data.imgSize, data.rect); // calculating bounding rect dimensions and position coordinates using the normalised values
                  var dimension = calcBoxSize(data.imgSize, data.rect);
                  if (data.className === "box") {
                    // check if the metadata obj is for a box
                    return (
                      <BoundingRectBox
                        dimension={dimension}
                        position={position}
                      />
                    );
                  } else if (data.className === "barcode") {
                    // check if the metadata obj is for a barcode
                    return (
                      <>
                        <BoundingRectCode //  renders a code rect everytime there is a barcode
                          position={position}
                          dimension={dimension}
                          code={data.code}
                        />
                        <BoundingRectBarcode
                          dimension={dimension}
                          position={position}
                        />
                      </>
                    );
                  }
                })}
              </>
            )}
          </div>
          <div className="modal-info">
            <div className="modal-info-btns">
              <span onClick={handleOverlayVisibility}>
                {isOverlayVisible ? "Hide Overlay" : "Show Overlay"}
              </span>
              <span onClick={closeModal}>close X</span>
            </div>
            <h2 className="text-center padding">{image.name}</h2>
            <h3 className="text-center padding">Item Summary</h3>
            <CountTable codeCount={codeTally} />
          </div>
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
}

function calcBoxSize(imgSize, rect) {
  // helper function that calculates box dimensions from normalised values
  return {
    width: imgSize[0] * rect[1][0],
    height: imgSize[1] * rect[1][1],
  };
}

function calcBoxCoordinates(imgSize, rect) {
  // helper function that calculates box dimensions from normalised values
  return {
    left: imgSize[0] * rect[0][0],
    bottom: imgSize[1] * rect[0][1],
  };
}
