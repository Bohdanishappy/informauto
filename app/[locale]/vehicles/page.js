import TranslationsProvider from '@/components/TranslationsProvider';
import VehiclesComponent from '@/components/VehiclesComponent';
const i18nNamespaces = ['vehicles'];
const Vehicles = async ({ params: { locale } }) => {
  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
      <VehiclesComponent />
    </TranslationsProvider>
  );
};

export default Vehicles;
