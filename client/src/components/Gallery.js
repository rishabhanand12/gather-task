import React, { useEffect, useState } from "react";
import ImageModal from "./ImageModal";
import LoaderSpinner from "./LoaderSpinner";

export default function Gallery(_props) {
  // let [images, setImages] = useState(null); //state hook for images
  // let [modal, setmodal] = useState({
  //   // state hook for modal image visible on image click
  //   isVisible: false,
  //   image: null,
  //   codeTally: null,
  // });

  // useEffect(() => {
  //   async function fetchImages() {
  //     try {
  //       let url = "/api/image";
  //       let res = await fetch(url);
  //       if (res.status === 200) {
  //         let data = await res.json();
  //         setImages(data.images);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   fetchImages();
  // }, []);

  // async function handleImageClick(index) {
  //   // function runs after image click
  //   try {
  //     let imgName = images[index].name;
  //     let url = `/api/image/${imgName}`; // fetches image data upon request with image name in req url
  //     let res = await fetch(url);
  //     if (res.status === 200) {
  //       let data = await await res.json();
  //       setmodal({
  //         isVisible: true,
  //         image: data.image,
  //         codeTally: data.codeTally,
  //       });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // function handleModalClose() {
  //   // closes modal on close button click
  //   setmodal({
  //     isVisible: false,
  //     image: null,
  //     codeTally: null,
  //   });
  // }

  // if (!images) return <LoaderSpinner />;

  // return (
  //   <>
  //     <div className="container">
  //       <h1 className="text-center">Gallery</h1>
  //       <div className="gallery-container padding">
  //         {images.map((image, index) => {   // renders images in a grid
  //           return ( 
  //             <img
  //               onClick={() => handleImageClick(index)}
  //               className="gallery-img"
  //               key={index}  // index used for key instead if uuid since images aren't constanly changing. should use uuid
  //               src={image.location}
  //               alt={image.name}
  //             />
  //           );
  //         })}
  //       </div>
  //       {modal.isVisible && (   // image modal only visible if image clicked
  //         <ImageModal
  //           image={modal.image}
  //           codeTally={modal.codeTally}
  //           closeModal={handleModalClose}
  //         />
  //       )}
  //     </div>
  //   </>
  // );
  return <h1>Gallery</h1>
}
