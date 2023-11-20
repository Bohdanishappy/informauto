import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import dynamic from 'next/dynamic';
import UploadFile from './UploadFile';
import FileUploadButton from './FileUploadButton';
import TextArea from './TextArea';
import { deleteObject, getStorage, ref, ref as sRef } from 'firebase/storage';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/utils/firebase';
import { TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { XMarkIcon } from '@heroicons/react/20/solid';
import PhotoModal from './PhotoModal';
const VideoPlayer = dynamic(() => import('./VideoPlayer'), {
  ssr: false,
});

const PhotoVideoReport = ({ vehicle, setVehicle }) => {
  const handle = useFullScreenHandle();
  const { currentUser } = useAuth();
  const [t] = useTranslation();
  const [progress, setProgress] = useState(0);
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [openPhoto, setOpenPhoto] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const handleField = (e) => {
    setVehicle((prev) => {
      return {
        ...prev,
        photoVideoReport: {
          ...prev.photoVideoReport,
          [e.target.name]: e.target.value,
        },
      };
    });
  };
  const deletePicuteFromStorage = (delUrl, name) => {
    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(storage, delUrl);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        setVehicle((prev) => {
          return {
            ...prev,
            photoVideoReport: {
              ...prev.photoVideoReport,
              [name]: '',
            },
          };
        });
      })
      .catch((error) => {
        // Deletion unsuccessful
        console.log('Image deletion unsuccessful');
      });
  };
  const deleteMorePhotosFromStorage = (delUrl, index) => {
    const storage = getStorage();
    // Create a reference to the file to delete
    const desertRef = ref(storage, delUrl);

    // Delete the file
    deleteObject(desertRef)
      .then(async () => {
        // File deleted successfully
        setVehicle((prev) => {
          return {
            ...prev,
            photoVideoReport: {
              ...prev.photoVideoReport,
              morePhotos: [
                ...prev.photoVideoReport.morePhotos.filter(
                  (item, i) => i !== index
                ),
              ],
            },
          };
        });
        const response = await fetch(`/api/cars/${vehicle.ticket}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...vehicle,
            photoVideoReport: {
              ...vehicle.photoVideoReport,
              morePhotos: [
                ...vehicle.photoVideoReport.morePhotos.filter(
                  (item, i) => i !== index
                ),
              ],
            },
          }),
        });
        if (response.status === 200) {
          toast.success('Saved!', {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      })
      .catch((error) => {
        // Deletion unsuccessful
        console.log('Image deletion unsuccessful');
      });
  };
  const handleUploadClick = async (e, name, setProgress) => {
    if (e.target.files.length < 1) return;
    const file = e.target.files[0];
    // change file name
    const myNewFile = new File([file], new Date().getTime() + file.name, {
      type: file.type,
    });
    const sotrageRef = sRef(storage, `videos/${myNewFile.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, myNewFile);
    uploadTask?.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setVehicle((prev) => {
            return {
              ...prev,
              photoVideoReport: {
                ...prev.photoVideoReport,
                [name]: downloadURL,
              },
            };
          });
          const response = await fetch(`/api/cars/${vehicle.ti}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...vehicle,
              photoVideoReport: {
                ...vehicle.photoVideoReport,
                [name]: downloadURL,
              },
            }),
          });
          if (response.status === 200) {
            toast.success('Saved!', {
              position: 'bottom-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
          }
          setProgress(0);
        });
      }
    );
  };
  const handleMorePhotoUpload = async (e) => {
    if (e.target.files.length < 1) return;
    const file = e.target.files[0];
    // change file name
    const myNewFile = new File([file], new Date().getTime() + file.name, {
      type: file.type,
    });
    const sotrageRef = sRef(storage, `images/${myNewFile.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, myNewFile);
    uploadTask?.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress2(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setVehicle((prev) => {
            return {
              ...prev,
              photoVideoReport: {
                ...prev.photoVideoReport,
                morePhotos: [...prev.photoVideoReport.morePhotos, downloadURL],
              },
            };
          });
          const response = await fetch(`/api/cars/${vehicle.ticket}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...vehicle,
              photoVideoReport: {
                ...vehicle.photoVideoReport,
                morePhotos: [
                  ...vehicle.photoVideoReport.morePhotos,
                  downloadURL,
                ],
              },
            }),
          });
          if (response.status === 200) {
            toast.success('Saved!', {
              position: 'bottom-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
          }
          setProgress2(0);
        });
      }
    );
  };
  const handleDrop = async (files, name, setProgress) => {
    if (files.length < 1) return;
    const file = files[0];

    // Change file name
    const myNewFile = new File([file], new Date().getTime() + file.name, {
      type: file.type,
    });

    const storageRef = sRef(storage, `images/${myNewFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, myNewFile);

    uploadTask?.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setVehicle((prev) => {
            return {
              ...prev,
              photoVideoReport: {
                ...prev.photoVideoReport,
                [name]: downloadURL,
              },
            };
          });
          const response = await fetch(`/api/cars/${vehicle.ticket}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...vehicle,
              photoVideoReport: {
                ...vehicle.photoVideoReport,
                [name]: downloadURL,
              },
            }),
          });
          if (response.status === 200) {
            toast.success('Saved!', {
              position: 'bottom-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
          }
          setProgress(0);
        });
      }
    );
  };
  return (
    <div className="mb-5">
      <h1 className="text-3xl mb-5">
        <span className="heading_underline">{t('photo_video_report')}</span>
      </h1>
      <div className="section_border">
        <div className="mb-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              {vehicle.photoVideoReport.exterierVideos ? (
                <div>
                  <h2 className="text-2xl">{t('exterier_video')}</h2>
                  <div className="relative">
                    <VideoPlayer
                      url={vehicle.photoVideoReport.exterierVideos}
                    />
                    {currentUser && (
                      <TrashIcon
                        className="text-red-600 w-[30px] h-[30px] absolute top-4 right-4 cursor-pointer"
                        onClick={() =>
                          deletePicuteFromStorage(
                            vehicle.photoVideoReport.exterierVideos,
                            'exterierVideos'
                          )
                        }
                      />
                    )}
                  </div>
                </div>
              ) : (
                <>
                  {progress > 0 ? (
                    <div>
                      <h2 className="text-2xl">{t('exterier_video')}</h2>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                              {t('in_progress')}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-teal-600">
                              {progress.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
                          <div
                            style={{ width: `${progress}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {currentUser ? (
                        <UploadFile
                          id="Exterier Video"
                          label={t('exterier_video')}
                          accept="video/*"
                          acceptType="video/"
                          extentions="mp4, 10MB"
                          handleUploadClick={(e) =>
                            handleUploadClick(e, 'exterierVideos', setProgress)
                          }
                          handleDrop={(files) =>
                            handleDrop(files, 'exterierVideos', setProgress)
                          }
                        />
                      ) : (
                        <h3>Exterier Video has not uploaded</h3>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            <div>
              {vehicle.photoVideoReport.interierVideos ? (
                <div>
                  <h2 className="text-2xl">{t('interier_video')}</h2>
                  <div className="relative">
                    <VideoPlayer
                      url={vehicle.photoVideoReport.interierVideos}
                    />
                    {currentUser && (
                      <TrashIcon
                        className="text-red-600 w-[30px] h-[30px] absolute top-4 right-4 cursor-pointer"
                        onClick={() =>
                          deletePicuteFromStorage(
                            vehicle.photoVideoReport.interierVideos,
                            'interierVideos'
                          )
                        }
                      />
                    )}
                  </div>
                </div>
              ) : (
                <>
                  {progress1 > 0 ? (
                    <div>
                      <h2 className="text-2xl">{t('interier_video')}</h2>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                              {t('in_progress')}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-teal-600">
                              {progress1.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
                          <div
                            style={{ width: `${progress1}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {currentUser ? (
                        <UploadFile
                          id="Interier Video"
                          label={t('interier_video')}
                          accept="video/*"
                          acceptType="video/"
                          extentions="mp4, 10MB"
                          handleUploadClick={(e) =>
                            handleUploadClick(e, 'interierVideos', setProgress1)
                          }
                          handleDrop={(files) =>
                            handleDrop(files, 'interierVideos', setProgress1)
                          }
                        />
                      ) : (
                        <h3>Interier Video has not uploaded</h3>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mb-5">
          <h2 className="text-2xl">{t('more_photos')}</h2>
          {vehicle.photoVideoReport.morePhotos.length > 0 && (
            <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-8 lg:grid-cols-8 gap-4 mt-3 mb-5">
              {vehicle.photoVideoReport.morePhotos.map((photo, i) => (
                <>
                  <div className="relative">
                    {currentUser && (
                      <TrashIcon
                        className="text-red-600 w-[20px] h-[20px] absolute top-0 right-0 cursor-pointer"
                        onClick={() => deleteMorePhotosFromStorage(photo, i)}
                      />
                    )}
                    {/* <FullScreen handle={handle}> */}
                    <div
                      key={`photo_${i}`}
                      onClick={!handle.active ? handle.enter : handle.exit}
                    >
                      <Image
                        width={320}
                        height={100}
                        src={photo}
                        onClick={() => {
                          setSelectedPhoto(photo);
                          setSelectedPhotoIndex(i);
                          setOpenPhoto(true);
                        }}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                    {/* </FullScreen> */}
                  </div>
                </>
              ))}
            </div>
          )}
          {/* {selectedPhoto && (
            <div className="relative top-0 left-0 right-0 bottom-0 bg-black z-[100]">
              <XMarkIcon className="text-white w-[30px] h-[30px]" />
              <img className="w-full" src={selectedPhoto} alt="photo" />
            </div>
          )} */}
          <PhotoModal
            selectedPhoto={selectedPhoto}
            setSelectedPhoto={setSelectedPhoto}
            open={openPhoto}
            setOpen={setOpenPhoto}
            photos={vehicle.photoVideoReport.morePhotos}
            setSelectedPhotoIndex={setSelectedPhotoIndex}
            selectedPhotoIndex={selectedPhotoIndex}
          />
          <div className="my-3">
            {progress2 > 0 ? (
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                      {t('in_progress')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-teal-600">
                      {progress2.toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
                  <div
                    style={{ width: `${progress2}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                  ></div>
                </div>
              </div>
            ) : (
              <>
                {currentUser ? (
                  <FileUploadButton
                    buttonText={t('upload_photo')}
                    onFileSelect={handleMorePhotoUpload}
                  />
                ) : (
                  <h3>{t('no_more_photos_have_uploaded')}</h3>
                )}
              </>
            )}
          </div>
        </div>
        <div className="my-3">
          <TextArea
            label={t('notes')}
            name="notes"
            value={vehicle.photoVideoReport.notes}
            placeholder={t('enter_notes')}
            onChange={handleField}
            readOnly={!currentUser}
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoVideoReport;
