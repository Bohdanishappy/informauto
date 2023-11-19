import React from 'react';
import Accordion from './Accordion';
import { useTranslation } from 'react-i18next';

const RoadTest = ({ vehicle, setVehicle }) => {
  const [t] = useTranslation();
  const handleOption = (i, j, changedOpiton) => {
    let newArray = [...vehicle.roadTest.options];
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
        roadTest: {
          options: newArray,
        },
      };
    });
  };
  const handleNotes = (i, value) => {
    let newArray = [...vehicle.roadTest.options];
    newArray[i] = {
      ...newArray[i],
      notes: value,
    };
    setVehicle((prev) => {
      return {
        ...prev,
        roadTest: {
          options: newArray,
        },
      };
    });
  };
  return (
    <div className="mb-5">
      <h1 className="text-3xl mb-5">
        <span className="heading_underline">{t('road_test')}</span>
      </h1>
      <Accordion
        handleNotes={handleNotes}
        handleOption={handleOption}
        items={vehicle.roadTest.options}
      />
    </div>
  );
};

export default RoadTest;
