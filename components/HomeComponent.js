'use client';
import { XCircleIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageChanger from './LanguageChanger';

const HomeComponent = () => {
  const router = useRouter();
  const [t] = useTranslation();
  const [ticket, setTicket] = useState('');
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/cars/${ticket}`);
      console.log('response', response);
      if (response.ok) {
        router.push(`/vehicles/${ticket}`);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setNotFound(true);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="absolute top-5 right-5">
        <LanguageChanger />
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-mainBlue">
            {t('inspect')} <span className="text-black">{t('report')}</span>
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t('ticket_number')}
              </label>
              <div className="mt-2">
                <input
                  id="ticket"
                  name="ticket"
                  type="text"
                  value={ticket}
                  onChange={(e) => {
                    setNotFound(false);
                    setTicket(e.target.value);
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {notFound && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircleIcon
                      className="h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error:</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <ul role="list" className="list-disc space-y-1 pl-5">
                        <li>
                          {t('Record with this Ticket Number')} '
                          <span className="text-mainBlue">{ticket}</span>'{' '}
                          {t("don't exist.")}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t('open')}
              </button>
            </div>
          </form>
          <button
            onClick={() => router.push('/vehicles')}
            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mt-3"
          >
            {t('machanic')}
          </button>
        </div>
      </div>
    </>
  );
};
export default HomeComponent;
