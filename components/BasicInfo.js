import React from 'react';
import Input from './Input';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const BasicInfo = ({ vehicle, setVehicle }) => {
  const { currentUser } = useAuth();
  const [t] = useTranslation();
  const handleField = (e) => {
    setVehicle((prev) => {
      return {
        ...prev,
        basicInfo: {
          ...prev.basicInfo,
          [e.target.name]: e.target.value,
        },
      };
    });
  };
  return (
    <div className="mb-5">
      <h1 className="text-3xl mb-5">
        <span className="heading_underline">{t('basic_info')}</span>
      </h1>
      <div className="section_border">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label={t('model')}
            value={vehicle.basicInfo.model}
            placeholder={t('model')}
            type="text"
            name="model"
            onChange={handleField}
            readOnly={!currentUser}
          />
          <Input
            label={t('performance')}
            value={vehicle.basicInfo.performance}
            placeholder={t('performance')}
            type="text"
            name="performance"
            onChange={handleField}
            readOnly={!currentUser}
          />
          <Input
            label={t('year')}
            value={vehicle.basicInfo.year}
            placeholder={t('year')}
            type="number"
            name="year"
            onChange={handleField}
            readOnly={!currentUser}
          />
          <Input
            label={t('fule')}
            value={vehicle.basicInfo.fule}
            placeholder={t('fule')}
            type="text"
            name="fule"
            onChange={handleField}
            readOnly={!currentUser}
          />
          <Input
            label={t('millage')}
            value={vehicle.basicInfo.millage}
            placeholder={t('millage')}
            type="text"
            name="millage"
            onChange={handleField}
            readOnly={!currentUser}
          />
          <Input
            label={t('vin_number')}
            value={vehicle.basicInfo.vinNumber}
            placeholder={t('vin_number')}
            type="text"
            name="vinNumber"
            onChange={handleField}
            readOnly={!currentUser}
          />
          <Input
            label={t('price')}
            value={vehicle.basicInfo.price}
            placeholder={t('price')}
            type="text"
            name="price"
            onChange={handleField}
            readOnly={!currentUser}
          />
          <Input
            label={t('stk')}
            value={vehicle.basicInfo.stk}
            placeholder={t('stk')}
            type="text"
            name="stk"
            onChange={handleField}
            readOnly={!currentUser}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
