import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

//Recebimento das informações por parametro
//Trartativas de erros / excessões do antigo response => agora é throw
//Acesso ao repositório

interface RequestDTO {
    provider: String;
    date: Date;
}

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }


    public execute({ date, provider }: RequestDTO): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentsInSameDate = this.appointmentsRepository.findByDate(appointmentDate)

        if (findAppointmentsInSameDate) {
            throw Error('this appointment s already booked')
        }

        const appointment = this.appointmentsRepository.create({ provider, date: appointmentDate });

        return appointment;
    }
}

export default CreateAppointmentService;
