import React from 'react';
import Accordion from './Accordion';
import { useTranslation } from 'react-i18next';

const Exterior = ({ vehicle, setVehicle }) => {
  const [t] = useTranslation();
  const handleOption = (i, j, changedOpiton) => {
    let newArray = [...vehicle.exterior.options];
    newArray[i] = {
      ...newArray[i],
      options: newArray[i].options.map((item, index) => {
        if (index === j) {
          if (changedOpiton === 'ok') {
            return {
              ...item,
              ok: true,
              notOk: false,
              toJudge: false,
            };
          } else if (changedOpiton === 'notOk') {
            return {
              ...item,
              ok: false,
              notOk: true,
              toJudge: false,
            };
          } else if (changedOpiton === 'toJudge') {
            return {
              ...item,
              ok: false,
              notOk: false,
              toJudge: true,
            };
          }
        } else {
          return item;
        }
      }),
    };
    setVehicle((prev) => {
      return {
        ...prev,
        exterior: {
          options: newArray,
        },
      };
    });
  };
  return (
    <div className="mb-5">
      <h1 className="text-3xl mb-5">
        <span className="heading_underline">{t('EXTERIOR')}</span>
      </h1>
      <Accordion handleOption={handleOption} items={vehicle.exterior.options} />
    </div>
  );
};

export default Exterior;
