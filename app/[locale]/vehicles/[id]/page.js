import EditVahicleComponent from '@/components/EditVahicleComponent';
import TranslationsProvider from '@/components/TranslationsProvider';
const i18nNamespaces = ['vehicledetail'];
const EditVahicle = async ({ params: { locale, id } }) => {
  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
      <EditVahicleComponent id={id} />
    </TranslationsProvider>
  );
};

export default EditVahicle;
