import HomeComponent from '@/components/HomeComponent';
import TranslationsProvider from '@/components/TranslationsProvider';
const i18nNamespaces = ['home'];

const Home = async ({ params: { locale } }) => {
  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
      <HomeComponent />
    </TranslationsProvider>
  );
};

export default Home;
