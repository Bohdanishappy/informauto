import { Fragment, useState } from 'react';
import shortid from 'shortid';
import { Rings } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import Input from './Input';
import { useTranslation } from 'react-i18next';

const AddVahicleModal = ({ open, setOpen, setVahicles }) => {
  const [t] = useTranslation();
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState({
    ticket: shortid.generate(),
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

  const handleName = (value) => {
    setVehicle((prev) => {
      return {
        ...prev,
        name: value,
      };
    });
  };

  const handleCancle = () => {
    setVehicle((prev) => {
      return {
        ...prev,
        name: '',
      };
    });
    setOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/cars/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicle),
      });
      const data = await response.json();
      if (response.status === 201) {
        setVahicles((prev) => {
          return [...prev, data.item];
        });
        setVehicle((prev) => {
          return {
            ...prev,
            ticket: shortid.generate(),
            name: '',
          };
        });
        setLoading(false);
        setOpen(false);
        toast.success('Added Successfully!', {
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
    } catch (e) {
      console.log(e);
      setLoading(false);
      setOpen(false);
      toast.error('Error. Item not created.', {
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

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    {loading ? (
                      <Rings
                        height="80"
                        width="80"
                        color="#4fa94d"
                        radius="6"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="rings-loading"
                      />
                    ) : (
                      <CheckIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {t('add_vehicle')}
                    </Dialog.Title>
                    <div className="mt-2">
                      <Input
                        label=""
                        value={vehicle.name}
                        placeholder={t('enter_vahicle_name')}
                        type="text"
                        name="name"
                        onChange={(e) => handleName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={() => handleSubmit()}
                  >
                    {t('add')}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => handleCancle()}
                  >
                    {t('cancel')}
                  </button>
                </div>
                {/* <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setOpen(false)}
                  >
                    CREATE VAHICLE
                  </button>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default AddVahicleModal;
