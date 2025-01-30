import { useTranslation } from 'react-i18next';
import { Image } from 'react-bootstrap';
import { routes } from '../../utils/routes';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <Image fluid alt={t('page404.title')} className="h-25" src="/404.svg" />
      <h4>{t('page404.title')}</h4>
      <p className="text-muted">
        {t('page404.text')}
        <a href={routes.main}>{t('page404.link')}</a>
      </p>
    </div>
  );
};

export default NotFound;
