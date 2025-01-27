const ru = {
  translation: {
    navBar: {
      title: 'Hexlet Chat',
      signout: 'Выйти',
    },
    loginPage: {
      cardTitle: 'Войти',
      noAccountQuestion: 'Нет аккаунта? ',
      register: 'Регистрация',
    },
    loginForm: {
      errors: {
        required: 'Обязательное поле',
        username: {
          short: 'Логин должен быть длинее 3 символов',
          long: 'Логин должен быть короче 20 символов',
        },
        authError: 'Неправильный пароль или логин',
      },
      username: 'Логин',
      password: 'Пароль',
      login: 'Войти',
    },
    signupForm: {
      errors: {
        matchingPasswords: 'Пароли должны совпадать',
        shortPassword: 'Пароль должен быть длинее 6 знаков',
        userExists: 'Пользователь с таким логином уже существует',
        unknown: 'Неизвестная ошибка, пожалуйста попробуйте позже',
      },
      labels: {
        repeatPassword: 'Повторите пароль',
      },
      sendFormButton: 'Зарегистрироваться',
    },
    signupPage: {
      cardTitle: 'Регистрация',
    },
    notFoundPage: {
      notFoundMessage: 'Страница не найдена :(',
    },
    chatPage: {
      channelsList: {
        header: 'Каналы',
      },
      messageForm: {
        placeholder: 'Введите сообщение...',
      },
      messageBox: {
        numOfMessages: {
          message_zero: 'сообщений',
          message_one: 'сообщение',
          message_few: 'сообщения',
          message_many: 'сообщений',
        },
      },
      channelItem: {
        removeButton: 'Удалить',
        editButton: 'Переименовать',
      },
    },
    modals: {
      errors: {
        required: 'Обязательное поле',
        short: 'Слишком короткое название',
        long: 'Слишком длинное название',
        alreadyExists: 'Канал с таким названием уже существует',
      },
      addForm: {
        headerLabel: 'Добавить новый канал',
        label: 'Название нового канала',
        cancelButton: 'Отмена',
        submitButton: 'Добавить',
      },
      editForm: {
        headerLabel: 'Переименовать канал',
        label: 'Выберите новое название для канала',
        cancelButton: 'Отмена',
        submitButton: 'Добавить',
      },
      removeForm: {
        headerLabel: 'Удалить канал',
        cancelButton: 'Отменить',
        submitButton: 'Удалить',
      },
    },
  },
};

export default ru;
