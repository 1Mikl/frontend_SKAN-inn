import { string, number, date, setLocale } from 'yup';
import { isINNLegalEntity } from './functions';
import { removeNonDigit, getTodayEnd } from '../helpers';

setLocale({
  number: {
    min: ({ min }) => `Минимум от ${min}`,
    max: ({ max }) => `Максимум до ${max}`,
  },
});

export const login = string().required('Введите логин');

export const password = string().required('Введите пароль');

export const limit = number()
  .typeError('Лимит должен быть числом')
  .required('Введите лимит')
  .min(1)
  .max(1000);

export const inn = string()
  .required('Введите ИНН компании')
  .transform(removeNonDigit)
  .test('innValid', 'Введите корректные данные', value => isINNLegalEntity(value));


export const startDate = date()
  .typeError('Значение должно быть датой (дд.мм.гггг)')
  .max(getTodayEnd(), 'дата начала не может быть позже даты конца')
  .required('Выберите дату начала');

export const endDate = date()
  .typeError('Значение должно быть датой (дд.мм.гггг)')
  .max(getTodayEnd(), 'даты не должны быть в будущем времени')
  .required('Выберите дату конца');
