"use client"
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../Firebase";
import React, { useState } from 'react';


const FireStorage = () => {

    const storage = getStorage(app);

    const [imageUpload, setImageUpload] = useState();
    const [imageDownload, setImageDownload] = useState("cyber-crime.png");
    const [downloadedImage, setDownloadedImage] = useState(null);
    const [downloadClicked, setDownloadClicked] = useState(false);



    const uploadFile = () => {
        if (!imageUpload) return;

        const imageRef = ref(storage, "legalease/pfp/" + imageUpload.name);

        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                console.log(url);
                console.log("Image upload : ", imageUpload.name);
                alert("Your image has been uploaded.");
            });
        })
    }

    function downloadFile() {
        console.log("inside download file");
        if (!imageDownload) return;
        //if(downloadClicked===false) return;
        console.log("passed auth");
        setDownloadClicked(false);
        const imageRef = ref(storage, "legalease/pfp/" + imageDownload);
        getDownloadURL(imageRef)
            .then((url) => {
                // Insert url into an <img> tag to "download"
                alert("Download url is generated");
                setDownloadedImage(url);
                console.log("Download url : ", url);
            }).catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        alert("File doesn't exist");
                        break;
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        alert("Unauthorised access");
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        alert("Upload is cancelled");
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        alert("An unknown error occured");
                        break;
                }
            }
            )
    }
    function deleteFile(){
        console.log("inside deleteImage");
        // Create a reference to the file to delete
        const desertRef = ref(storage, 'legalease/pfp/Group 17.png');

        // Delete the file
        deleteObject(desertRef).then(() => {
            alert("file deleted successfully");
            // File deleted successfully
        }).catch((error) => {
            // Uh-oh, an error occurred!
            alert("An error occured.");
        });
    }

    return (
        <>
            <div className="h-[300px] w-[600px] bg-green-300 m-10 flex flex-col justify-center items-center">
                <div>
                <input type="file" onChange={(event) => { setImageUpload(event.target.files[0]); }} />
                <button onClick={uploadFile} className="h-[50px] w-[100px] p-[15px] rounded-lg bg-blue-400 hover:bg-blue-600">
                    Upload
                </button>
                </div>
                <img src={downloadedImage} alt=""/>

                {/*<div className="h-[100px] bg-red-100">
                    <button onClick={downloadFile} className="p-3 bg-red-500 hover:bg-red-600">download</button>
                    <button onClick={deleteFile} className="p-3 bg-purple-500 hover:bg-purple-600">delete</button>
                    <img src={downloadedImage} alt="hp" />
    </div>*/}
            </div>
        </>
    )

}
export default FireStorage