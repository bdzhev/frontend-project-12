import * as Yup from 'yup';

const schemas = {
  modal: {
    editAddModals: (t, existingChannelNames) => (
      Yup.object({
        channelName: Yup.string()
          .strict()
          .trim(t('modals.errors.trimmed'))
          .required(t('modals.errors.required'))
          .min(3, t('modals.errors.short'))
          .max(20, t('modals.errors.long'))
          .notOneOf([existingChannelNames], t('modals.errors.alreadyExists')),
      })
    ),
  },
  loginForm: (t) => (
    Yup.object({
      username: Yup.string()
        .required(t('loginForm.errors.required'))
        .min(3, t('loginForm.errors.username.short'))
        .max(20, t('loginForm.errors.username.long')),
      password: Yup.string()
        .required(t('loginForm.errors.required')),
    })
  ),
  signupForm: (t) => (
    Yup.object({
      username: Yup.string()
        .required(t('loginForm.errors.required'))
        .min(3, t('loginForm.errors.username.short'))
        .max(20, t('loginForm.errors.username.long')),
      password: Yup.string()
        .required(t('loginForm.errors.required'))
        .min(6, t('signupForm.errors.shortPassword')),
      passwordCopy: Yup.string()
        .required(t('loginForm.errors.required'))
        .oneOf([Yup.ref('password')], t('signupForm.errors.matchingPasswords')),
    })
  ),
};

export default schemas;
