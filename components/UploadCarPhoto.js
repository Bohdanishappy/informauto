import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { deleteObject, getStorage, ref, ref as sRef } from 'firebase/storage';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/utils/firebase';
import UploadFile from './UploadFile';
import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/24/outline';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const UploadCarPhoto = ({ vehicle, setVehicle }) => {
  const { currentUser } = useAuth();
  const [t] = useTranslation();
  const [ok, setOk] = useState(0);
  const [notOk, setNotOk] = useState(0);
  const [toJudge, setToJudge] = useState(0);
  const [progress, setProgress] = useState(0);
  const deletePicuteFromStorage = (delUrl) => {
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
            mainPicture: '',
          };
        });
        const response = await fetch(`/api/cars/${vehicle.ticket}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...vehicle,
            mainPicture: '',
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
  const handleUploadClick = async (e) => {
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
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setVehicle((prev) => {
            return {
              ...prev,
              mainPicture: downloadURL,
            };
          });
          const response = await fetch(`/api/cars/${vehicle.ticket}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...vehicle,
              mainPicture: downloadURL,
            }),
          });
          if (response.status === 200) {
            toast.success('Photo Saved!', {
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
  const handleDrop = async (files) => {
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
              mainPicture: downloadURL,
            };
          });
          const response = await fetch(`/api/cars/${vehicle.ticket}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...vehicle,
              mainPicture: downloadURL,
            }),
          });
          if (response.status === 200) {
            toast.success('Photo Saved!', {
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
  const calculateTotalCounts = () => {
    let totalOk = 0;
    let totalNotOk = 0;
    let totalToJudge = 0;

    // Iterate through the nested structure
    const iterateOptions = (options) => {
      options.forEach((option) => {
        if (option.ok) totalOk += 1;
        if (option.notOk) totalNotOk += 1;
        if (option.toJudge) totalToJudge += 1;

        // If the option has nested options, recursively iterate
        if (option.options) {
          iterateOptions(option.options);
        }
      });
    };

    // roadTest
    vehicle.roadTest.options.forEach((category) => {
      iterateOptions(category.options);
    });

    // interior
    vehicle.interior.options.forEach((category) => {
      iterateOptions(category.options);
    });
    // exterior
    vehicle.exterior.options.forEach((category) => {
      iterateOptions(category.options);
    });
    // Now you have the total counts
    console.log('Total OK:', totalOk);
    setOk(totalOk);
    console.log('Total Not OK:', totalNotOk);
    setNotOk(totalNotOk);
    console.log('Total To Judge:', totalToJudge);
    setToJudge(totalToJudge);
  };
  useEffect(() => {
    calculateTotalCounts();
  }, [vehicle]);

  const changeRecomendation = () => {
    setVehicle((prev) => {
      return {
        ...prev,
        recomendedToBuy: true,
        notRecomendedToBuy: false,
        toJudge: false,
      };
    });
  };
  const changeNotRecomendation = () => {
    setVehicle((prev) => {
      return {
        ...prev,
        recomendedToBuy: false,
        notRecomendedToBuy: true,
        toJudge: false,
      };
    });
  };
  const changeToJudge = () => {
    setVehicle((prev) => {
      return {
        ...prev,
        recomendedToBuy: false,
        notRecomendedToBuy: false,
        toJudge: true,
      };
    });
  };

  return (
    <div className="mb-5">
      <h1 className="text-3xl text-mainBlue font-bold mb-5">
        <span>{t('car_photo')}</span>
      </h1>
      <div className="section_border">
        {vehicle.mainPicture ? (
          <div className="max-w-[760px] m-auto relative">
            <Image
              width={760}
              height={300}
              src={vehicle.mainPicture}
              className="w-full rounded-xl"
            />
            {currentUser && (
              <TrashIcon
                className="text-red-600 w-[30px] h-[30px] absolute top-4 right-4 cursor-pointer"
                onClick={() => deletePicuteFromStorage(vehicle.mainPicture)}
              />
            )}
          </div>
        ) : (
          <>
            {progress > 0 ? (
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                      In Progress
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
            ) : (
              <>
                {currentUser ? (
                  <UploadFile
                    id="Car Photo"
                    label="Car Photo"
                    accept="image/*"
                    acceptType="image/"
                    extentions="PNG, JPG, GIF up to 10MB"
                    handleUploadClick={handleUploadClick}
                    handleDrop={handleDrop}
                  />
                ) : (
                  <h3>Photo has not uploaded</h3>
                )}
              </>
            )}
          </>
        )}
        <div className="sm:flex sm:justify-between sm:gap-3">
          <div className="mt-5 py-3 px-2 sm:px-5 rounded-md bg-slate-100 border">
            <div className="flex items-center">
              <CheckCircleIcon
                className={`inline cursor-pointer w-[30px] h-[30px] text-green-500`}
              />
              <span className="ml-2">
                {ok + 17 + vehicle.photoVideoReport.morePhotos.length + 2}{' '}
                {t('points_checked')}
              </span>
            </div>
            <div className="flex items-center mt-1">
              <XCircleIcon
                className={`inline cursor-pointer w-[30px] h-[30px] text-red-500`}
              />
              <span className="ml-2">
                {notOk} {t('issues_founded')}
              </span>
            </div>
            <div className="flex items-center mt-1">
              <ExclamationTriangleIcon
                className={`inline cursor-pointer w-[30px] h-[30px] text-yellow-500`}
              />
              <span className="ml-2">
                {toJudge} {t('to_judge')}
              </span>
            </div>
          </div>
          <div
            className={`mt-5 py-3 px-2 sm:px-5 rounded-md bg-slate-100 border ${
              !currentUser && 'flex items-center'
            }`}
          >
            <div
              className={`flex items-center cursor-pointer ${
                !currentUser && !vehicle.recomendedToBuy && 'hidden'
              }`}
              onClick={() => (currentUser ? changeRecomendation() : null)}
            >
              <CheckCircleIcon
                className={`inline cursor-pointer ${
                  !currentUser ? 'w-[50px] h-[50px]' : 'w-[30px] h-[30px]'
                } ${
                  vehicle.recomendedToBuy ? 'text-green-500' : 'text-slate-300'
                }`}
              />
              <span className={`ml-2 ${!currentUser && 'text-3xl'}`}>
                {t('recomended_to_buy')}
              </span>
            </div>
            <div
              className={`flex items-center mt-1 cursor-pointer ${
                !currentUser && !vehicle.notRecomendedToBuy && 'hidden'
              }`}
              onClick={() => (currentUser ? changeNotRecomendation() : null)}
            >
              <XCircleIcon
                className={`inline cursor-pointer ${
                  !currentUser ? 'w-[50px] h-[50px]' : 'w-[30px] h-[30px]'
                } ${
                  vehicle.notRecomendedToBuy ? 'text-red-500' : 'text-slate-300'
                }`}
              />
              <span className={`ml-2 ${!currentUser && 'text-3xl'}`}>
                {' '}
                {t('not_recomended_to_buy')}
              </span>
            </div>
            <div
              className={`flex items-center mt-1 cursor-pointer ${
                !currentUser && !vehicle.toJudge && 'hidden'
              }`}
              onClick={() => (currentUser ? changeToJudge() : null)}
            >
              <ExclamationTriangleIcon
                className={`inline cursor-pointer ${
                  !currentUser ? 'w-[50px] h-[50px]' : 'w-[30px] h-[30px]'
                }
                ${vehicle.toJudge ? 'text-yellow-500' : 'text-slate-300'}
                `}
              />
              <span className={`ml-2 ${!currentUser && 'text-3xl'}`}>
                {t('to_judge')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCarPhoto;
