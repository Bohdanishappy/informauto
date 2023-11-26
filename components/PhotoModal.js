import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';

const PhotoModal = ({
  open,
  setOpen,
  selectedPhoto,
  setSelectedPhoto,
  photos,
  setSelectedPhotoIndex,
  selectedPhotoIndex,
}) => {
  const cancelButtonRef = useRef(null);

  const handleNextPhoto = () => {
    if (photos.length - 1 !== selectedPhotoIndex) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
      setSelectedPhoto(photos[selectedPhotoIndex + 1]);
    }
  };
  const handleBackPhoto = () => {
    if (selectedPhotoIndex !== 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
      setSelectedPhoto(photos[selectedPhotoIndex - 1]);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden bg-black px-4 pb-4 pt-5 text-left shadow-xl transition-all h-screen w-full  sm:px-6 flex items-center">
                <div className="absolute top-0 left-0 pt-4 pr-4 flex justify-end pb-4">
                  <span className="text-white text-2xl ml-5">
                    {selectedPhotoIndex + 1}/{photos.length}
                  </span>
                </div>
                <div className="absolute top-0 left-0 right-0 pt-4 pr-4 flex justify-end pb-4">
                  <XMarkIcon
                    onClick={() => setOpen(false)}
                    className="w-[40px] z-[100] cursor-pointer h-[40px] text-white"
                  />
                </div>
                <div className="absolute top-0 left-0 bottom-0 flex items-center pb-4">
                  <ArrowLeftIcon
                    onClick={() => handleBackPhoto()}
                    className="w-[40px] cursor-pointer h-[40px] text-white"
                  />
                </div>
                <div className="absolute top-0 right-0 bottom-0 flex items-center pb-4">
                  <ArrowRightIcon
                    onClick={() => handleNextPhoto()}
                    className="w-[40px] cursor-pointer h-[40px] text-white"
                  />
                </div>
                <div className="flex justify-center">
                  <img
                    className="w-full"
                    src={selectedPhoto}
                    alt="selectedPhoto"
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default PhotoModal;
