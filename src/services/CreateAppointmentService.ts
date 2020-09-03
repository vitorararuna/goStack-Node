import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

//Recebimento das informações por parametro
//Trartativas de erros / excessões do antigo response => agora é throw
//Acesso ao repositório

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {

  public async execute({ date, provider_id }: RequestDTO): Promise<Appointment> {

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentsInSameDate = await appointmentsRepository.findByDate(appointmentDate)

    if (findAppointmentsInSameDate) {
      throw new AppError('this appointment s already booked')
    }

    const appointment = appointmentsRepository.create({ provider_id, date: appointmentDate });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
