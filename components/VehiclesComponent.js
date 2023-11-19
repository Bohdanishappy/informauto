'use client';
import { Rings } from 'react-loader-spinner';
import copy from 'copy-to-clipboard';
import AddVahicleModal from '@/components/AddVahicleModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useAuth } from '@/contexts/AuthContext';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import WarningModal from '@/components/WarningModal';
import LanguageChanger from './LanguageChanger';
import { useTranslation } from 'react-i18next';
import { ClipboardDocumentIcon } from '@heroicons/react/20/solid';

const VehiclesComponent = () => {
  const router = useRouter();
  const [t] = useTranslation();
  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [vahicles, setVahicles] = useState([]);
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/cars?timestamp=${timestamp}`, {
          cache: 'no-store',
        });
        const data = await response.json();
        setVahicles(data.cars);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleDelete = (id) => {
    setDeleteItemId(id);
    setDeleteItem(true);
  };
  const deleteCar = async () => {
    try {
      const response = await fetch(`/api/cars/${deleteItemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response', response);
      if (response.status === 200) {
        const data = await response.json();
        setDeleteItem(false);
        setVahicles((prev) => {
          return [...prev.filter((item) => item.ticket !== deleteItemId)];
        });
        setDeleteItemId(null);
        toast.success('Deleted Successfully!', {
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
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };
  return currentUser ? (
    loading ? (
      <div className="h-screen flex justify-center items-center">
        <Rings
          height="300"
          width="300"
          color="#0d6efd"
          radius="6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
      </div>
    ) : (
      <div className="px-4 sm:px-6 lg:px-8 py-5">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-semibold leading-6 text-mainBlue">
              <span className="cursor-pointer" onClick={() => router.push('/')}>
                {t('inform')}
                <span className="text-black">{t('auto')}</span>
              </span>
            </h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex sm:gap-3">
            <button
              type="button"
              className="block w-full sm:w-auto mb-2 sm:mb-0 rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={() => handleLogout()}
            >
              {t('logout')}
            </button>
            <button
              type="button"
              className="block w-full sm:w-auto mb-2 sm:mb-0 rounded-md bg-mainBlue px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-mainBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainBlue"
              onClick={() => setOpen(true)}
            >
              {t('add_vehicle')}
            </button>
            <LanguageChanger />
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      {t('token')}
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      {t('name')}
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      {t('Copy Link')}
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {vahicles.map((car) => (
                    <tr key={car.ticket}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div>
                            <div className="flex items-center font-medium text-gray-900">
                              {car.ticket}
                              <ClipboardDocumentIcon
                                className="w-[20px] h-[20px] cursor-pointer inline ml-2 text-mainBlue"
                                onClick={() => {
                                  copy(car.ticket);
                                  toast.success('Coppied!', {
                                    position: 'bottom-center',
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: 'light',
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div>
                            <div className="font-medium text-gray-900">
                              {car.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div>
                            <div className="font-medium text-gray-900">
                              <ClipboardDocumentIcon
                                className="inline cursor-pointer text-mainBlue w-[30px] h-[30px]"
                                onClick={() => {
                                  copy(
                                    `${window.location.origin}/vehicles/${car.ticket}`
                                  );
                                  toast.success('Coppied!', {
                                    position: 'bottom-center',
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: 'light',
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <PencilSquareIcon
                          className="inline cursor-pointer text-mainBlue w-[30px] h-[30px]"
                          onClick={() => router.push(`/vehicles/${car.ticket}`)}
                        />
                        <TrashIcon
                          className="inline cursor-pointer ml-3 w-[30px] h-[30px] text-red-500"
                          onClick={() => handleDelete(car.ticket)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <AddVahicleModal
          open={open}
          setOpen={setOpen}
          setVahicles={setVahicles}
        />
        <WarningModal
          open={deleteItem}
          setOpen={setDeleteItem}
          onDelete={deleteCar}
        />
      </div>
    )
  ) : (
    router.push('/login')
  );
};

export default VehiclesComponent;
