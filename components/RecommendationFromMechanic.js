import React from 'react';
import TextArea from './TextArea';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const RecommendationFromMechanic = ({ vehicle, setVehicle }) => {
  const { currentUser } = useAuth();
  const [t] = useTranslation();
  const handleField = (e) => {
    setVehicle((prev) => {
      return {
        ...prev,
        recommendationFromMechanic: {
          ...prev.recommendationFromMechanic,
          [e.target.name]: e.target.value,
        },
      };
    });
  };
  return (
    <div className="mb-5">
      <h1 className="text-3xl font-bold text-mainBlue mb-5">
        <span>{t('recommendation_from_mechanic')}</span>
      </h1>
      <div className="section_border">
        <TextArea
          label={t('our_advice')}
          name="ourAdvice"
          value={vehicle.recommendationFromMechanic.ourAdvice}
          placeholder={t('our_advice')}
          onChange={handleField}
          readOnly={!currentUser}
        />
        <TextArea
          label={t('interier')}
          name="interier"
          value={vehicle.recommendationFromMechanic.interier}
          placeholder={t('interier')}
          onChange={handleField}
          readOnly={!currentUser}
        />
        <TextArea
          label={t('exterier')}
          name="exterier"
          value={vehicle.recommendationFromMechanic.exterier}
          placeholder={t('exterier')}
          onChange={handleField}
          readOnly={!currentUser}
        />
        <TextArea
          label={t('servis_needed')}
          name="servisNeeded"
          value={vehicle.recommendationFromMechanic.servisNeeded}
          placeholder={t('servis_needed')}
          onChange={handleField}
          readOnly={!currentUser}
        />
      </div>
    </div>
  );
};

export default RecommendationFromMechanic;
