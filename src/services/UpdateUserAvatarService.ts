
import uploadConfig from '../config/upload';
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError(
        'Only authenticated users can change avatar',
        401,
      );
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join( //Buscando pelo arquivo de avatar do usuario em seu diretório e o nome de qual quero remover
        uploadConfig.directory,
        user.avatar,
      );

      const userAvatarFileExists = await fs.promises.stat( //Trás o status do arquivo, caso ele exista
        userAvatarFilePath,
      );

      if (userAvatarFileExists) { //se existir, deleto o arquivo
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
