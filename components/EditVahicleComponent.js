'use client';
import { Rings } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import BasicInfo from '@/components/BasicInfo';
import Exterior from '@/components/Exterior';
import Interior from '@/components/Interior';
import PhotoVideoReport from '@/components/PhotoVideoReport';
import RoadTest from '@/components/RoadTest';
import UploadCarPhoto from '@/components/UploadCarPhoto';
import RecommendationFromMechanic from '@/components/RecommendationFromMechanic';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import LanguageChanger from './LanguageChanger';

const EditVahicleComponent = ({ id }) => {
  const router = useRouter();
  const [t] = useTranslation();
  const { currentUser } = useAuth();
  const [fetchLoading, setFetchLoading] = useState(true);
  const [vehicle, setVehicle] = useState({
    _id: id,
    ticket: '',
    name: '',
    mainPicture: '',
    recomendedToBuy: true,
    notRecomendedToBuy: false,
    toJudge: false,
    basicInfo: {
      model: '',
      performance: '',
      year: '',
      fule: '',
      millage: '',
      vinNumber: '',
      price: '',
      stk: '',
    },
    recommendationFromMechanic: {
      ourAdvice: '',
      interier: '',
      exterier: '',
      servisNeeded: '',
    },
    photoVideoReport: {
      exterierVideos: '',
      interierVideos: '',
      morePhotos: [],
      notes: '',
    },
    roadTest: {
      options: [
        {
          name: 'Engine',
          options: [
            {
              name: 'Engine start',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Engine idling',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Engine sound cold',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Engine sound warmed up',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Engine sound at hight revs',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Engine sound at low revs',
              ok: true,
              notOk: false,
              toJudge: false,
            },
          ],
          notes: '',
        },
        {
          name: 'Transmission',
          options: [
            {
              name: 'Gearbox in use (auto/manual)',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Transmission hot/cold shifting quality',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Gearbox - sounds when shifting (auto/manual)',
              ok: true,
              notOk: false,
              toJudge: false,
            },
          ],
          notes: '',
        },
        {
          name: 'Clutch',
          options: [
            {
              name: 'Clutch function',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Clutch slipping',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Clutch vibration',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Clutch noise',
              ok: true,
              notOk: false,
              toJudge: false,
            },
          ],
          notes: '',
        },
        {
          name: 'Driving',
          options: [
            {
              name: 'Driving overall impression',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Holding the direction - driving',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Holding the direction - braking',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Holding the direction - acceleration',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Brakes - noise',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Brakes - vibration',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Brakes - efficiency',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Hand brake',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Honking',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Washing windows',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Window wipes',
              ok: true,
              notOk: false,
              toJudge: false,
            },
          ],
          notes: '',
        },
        {
          name: 'Other',
          options: [
            {
              name: 'Turbo sounds',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Chassis - noises',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Body and shocks - no creaks/rattles',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Cruise control',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Other premium equipment related to driving',
              ok: true,
              notOk: false,
              toJudge: false,
            },
          ],
          notes: '',
        },
      ],
    },
    interior: {
      options: [
        {
          name: 'INDOOR EQUIPMENT',
          options: [
            {
              name: 'Unpleasant odors, hair, etc.',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Steering wheel wear',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Controls on/around the steering wheel',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Dashboard',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Hazard warning lights',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Rear-view mirrors - adjustment',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Rear-view mirrors - damage',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Steering lock',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Handbrake wear',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Opening the compartment',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Ceiling - condition',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Electrical sockets and lighter',
              ok: false,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Damage on plastic parts of the interior',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Remote locking -Trunk electric control',
              ok: false,
              notOk: false,
              toJudge: false,
            },
          ],
          notes: '',
        },
        {
          name: 'Seats',
          options: [
            {
              name: 'Seats stains',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Seats torn',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Adjusting the seats',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Seat heating/cooling/ventilation',
              ok: false,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Folding the seats',
              ok: true,
              notOk: false,
              toJudge: false,
            },
          ],
          notes: '',
        },
        {
          name: 'Air Bags And Seat Belts',
          options: [
            {
              name: 'Airbags',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Seat belts',
              ok: true,
              notOk: false,
              toJudge: false,
            },
          ],
          notes: '',
        },
        {
          name: 'Audio And Alarm',
          options: [
            {
              name: 'Radio',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'All speakers',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Alarm/theft protection',
              ok: false,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Navigation',
              ok: false,
              notOk: false,
              toJudge: false,
            },
          ],
          notes: '',
        },
        {
          name: 'Heating AC',
          options: [
            {
              name: 'Air conditioning',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Heating',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Defrost (window)',
              ok: false,
              notOk: false,
              toJudge: false,
            },
          ],
          notes: '',
        },
        {
          name: 'Roof Window Opeaning',
          options: [
            {
              name: 'Sunroof',
              ok: false,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Opening',
              ok: false,
              notOk: false,
              toJudge: false,
            },
          ],
          notes: '',
        },
        {
          name: 'Diagnosis',
          options: [
            {
              name: 'connection/errors',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'record (photo from diagnostics)',
              ok: true,
              notOk: false,
              toJudge: false,
            },
          ],
          notes: '',
        },
      ],
    },
    exterior: {
      options: [
        {
          name: 'Engine Space',
          options: [
            {
              name: 'engine',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Liquid leaks',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Hose, pipe',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Straps',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Cables',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Oil in the air cleaner',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Water, dirt or coolant in the engine oil',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Timing belt/chain (if visible)',
              ok: false,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Engine oil (amount/color)',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Coolant',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Brake fluid',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Washer fluid',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Cooler',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Cooling fans',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Water pump',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Coolant tank',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Air filter',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Fuel pump noise',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Fuel filter',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Intake filter',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Starter operation',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Ignition system',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Battery',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Alternator',
              ok: true,
              notOk: false,
              toJudge: false,
            },
          ],
          notes: '',
        },
        {
          name: 'Body Parts',
          options: [
            {
              name: 'Corrosion',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Part fitting',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Other body defects',
              ok: true,
              notOk: false,
              toJudge: false,
            },
          ],
          notes: '',
        },
        {
          name: 'Paint',
          options: [
            {
              name: 'Paint defects if found',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Thickness control on 18 spots',
              ok: false,
              notOk: false,
              toJudge: false,
            },
          ],
          notes: '',
        },
        {
          name: 'Head Lights',
          options: [
            {
              name: 'Front functionality',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Back functionality',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Scratches on the headlights',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Clarity',
              ok: true,
              notOk: false,
              toJudge: false,
            },
          ],
          notes: '',
        },
        {
          name: 'Windows',
          options: [
            {
              name: 'Scratches/cracks on the windows',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Rubber seals around the windows',
              ok: true,
              notOk: false,
              toJudge: false,
            },
          ],
          notes: '',
        },
        {
          name: 'Tires Wheels Breaks',
          options: [
            {
              name: 'Tires and wheels are the correct size',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Tread depth FR',
              ok: false,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Tread depth FL',
              ok: false,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Tread depth BR',
              ok: false,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Tread depth BL',
              ok: false,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Tire pressure',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Wheel covers/alloy wheels',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Tyre type',
              ok: false,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Brake fluid leak',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Front brake discs',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Rear brake discs',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Front brake pads',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Rear brake pads',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Spare wheel',
              ok: false,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Handbrake',
              ok: true,
              notOk: false,
              toJudge: false,
            },
          ],
          notes: '',
        },
        {
          name: 'Windows And Door Locks',
          options: [
            {
              name: 'Windows rolling down',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Door locks',
              ok: true,
              notOk: false,
              toJudge: false,
            },
          ],
          notes: '',
        },
        {
          name: 'chassis',
          options: [
            {
              name: 'Corrosion control',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Visual inspection of the chassis',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Exhaust visually, soot',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Signs of a traffic accident',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Liquid leaks',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'engine cover',
              ok: false,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Noisiness of bearings',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Checking clearances in parts of the chassis',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Automatic/manual transmission (cover what can be seen)',
              ok: true,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Bonnet insulation',
              ok: false,
              notOk: false,
              toJudge: false,
            },
            {
              name: 'Battery check',
              ok: true,
              notOk: false,
              toJudge: false,
            },
          ],
          notes: '',
        },
      ],
    },
  });

  console.log('vehicle', vehicle);

  useEffect(() => {
    const fetchData = async () => {
      setFetchLoading(true);
      try {
        const response = await fetch(`/api/cars/${id}`, { cache: 'no-store' });
        const data = await response.json();
        console.log('data.item', data.item);
        setVehicle(data.item);
        setFetchLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setFetchLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicle),
      });
      console.log('response', response);
      if (response.status === 200) {
        const data = await response.json();
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
        // router.push('/vehicles');
      } else if (response.status === 404) {
        toast.error(data.message, {
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
      console.log('error', error);
      toast.error('Error: something went wrong.', {
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
  };

  return fetchLoading ? (
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
    <div className="container px-5 py-5 md:max-w-[1200px] m-auto">
      <div className="block sm:flex sm:justify-between">
        <h1 className="text-4xl text-mainBlue">
          {t('name')}: <span className="text-black">{vehicle.name}</span>
        </h1>
        <div className="block mt-3 sm:mt-0 sm:flex sm:gap-3">
          <button
            type="button"
            className="block w-full sm:w-auto mb-2 sm:mb-0 rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => router.push(currentUser ? '/vehicles' : '/')}
          >
            {t('back')}
          </button>
          <LanguageChanger />
        </div>
      </div>
      <UploadCarPhoto vehicle={vehicle} setVehicle={setVehicle} />
      <BasicInfo vehicle={vehicle} setVehicle={setVehicle} />
      <RecommendationFromMechanic vehicle={vehicle} setVehicle={setVehicle} />
      <PhotoVideoReport vehicle={vehicle} setVehicle={setVehicle} />
      <h1 className="text-3xl mb-5">
        <span className="heading_underline">{t('tech_protocol')}</span>
      </h1>
      <div className="section_border">
        <RoadTest vehicle={vehicle} setVehicle={setVehicle} />
        <Interior vehicle={vehicle} setVehicle={setVehicle} />
        <Exterior vehicle={vehicle} setVehicle={setVehicle} />
      </div>
      {currentUser && (
        <div className="mt-5 block sm:flex sm:justify-between sm:items-center">
          <button
            className="w-full mb-2 sm:mb-0 sm:w-[200px] rounded-lg text-xl font-bold bg-slate-300 text-white py-3"
            onClick={() => router.push('/vehicles')}
          >
            {t('back')}
          </button>
          <button
            className="w-full sm:w-[200px] rounded-lg text-xl font-bold bg-mainBlue text-white py-3"
            onClick={() => handleSubmit()}
          >
            {t('save')}
          </button>
        </div>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default EditVahicleComponent;
