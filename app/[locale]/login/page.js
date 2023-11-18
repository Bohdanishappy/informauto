import LoginComponent from '@/components/LoginComponent';
import TranslationsProvider from '@/components/TranslationsProvider';
const i18nNamespaces = ['login'];
const Login = async ({ params: { locale } }) => {
  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale}>
      <LoginComponent />
    </TranslationsProvider>
  );
};

export default Login;
