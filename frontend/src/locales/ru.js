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
          short: 'От 3 до 20 символов',
          long: 'От 3 до 20 символов',
        },
        authError: 'Неверные имя пользователя или пароль',
      },
      username: 'Ваш ник',
      password: 'Пароль',
      login: 'Войти',
    },
    signupForm: {
      errors: {
        matchingPasswords: 'Пароли должны совпадать',
        shortPassword: 'Не менее 6 символов',
        userExists: 'Такой пользователь уже существует',
        unknown: 'Неизвестная ошибка, пожалуйста попробуйте позже',
      },
      labels: {
        repeatPassword: 'Подтвердите пароль',
        username: 'Имя пользователя',
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
        placeholder: 'Введите сообщение',
        arialabel: 'Новое сообщение',
      },
      messageBox: {
        numOfMessages: {
          message_zero: 'сообщений',
          message_one: 'сообщение',
          message_few: 'сообщения',
          message_many: 'сообщений',
        },
      },
      errors: {
        messagesReqError: 'Не удалось загрузить сообщения',
        channelsReqError: 'Не удалось загрузить каналы',
      },
      channelItem: {
        dropdown: 'Управление каналом',
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
        network: 'Ошибка соединения',
        profanity: 'Недопустимое название канала',
      },
      addForm: {
        headerLabel: 'Добавить канал',
        label: 'Имя канала',
        cancelButton: 'Отменить',
        submitButton: 'Отправить',
        success: 'Канал создан',
        loading: 'Добавляем канал...',
      },
      editForm: {
        headerLabel: 'Переименовать канал',
        label: 'Выберите новое название для канала',
        cancelButton: 'Отмена',
        submitButton: 'Переименовать',
        success: 'Канал переименован',
        loading: 'Вносим изменения...',
      },
      removeForm: {
        headerLabel: 'Удалить канал',
        cancelButton: 'Отмена',
        submitButton: 'Удалить',
        success: 'Канал удалён',
        loading: 'Удаляем канал...',
      },
    },
  },
};

export default ru;
