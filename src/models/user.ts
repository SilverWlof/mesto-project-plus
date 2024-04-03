/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import {
  model,
  Model,
  Schema,
  Document,
} from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import UnauthException from '../common/exceptions/UnauthException';

interface IUser {
  name?: string;
  avatar?: string;
  about?: string;
  email: string;
  password: string;
}
interface UserModel extends Model<IUser> {
  findUserByCredentials: (email: string, password: string) => Promise<Document<unknown, any, IUser>>
}

const userSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email }).select('+password').orFail(new Error('NoUserException'))
    .then((foundUser: IUser) => {
      if (!foundUser) {
        return Promise.reject(new UnauthException('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, foundUser.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthException('Неправильные почта или пароль'));
        }

        return foundUser;
      });
    });
});

export default model<IUser, UserModel>('user', userSchema);
