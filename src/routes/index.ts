import { Router } from "express";
import appointmentsRouter from "./appointments.routes";
import userRouter from "./user.routes";
import sessionsRouter from "./sessions.routes";

const routes = Router();

routes.use("/appointments", appointmentsRouter);
routes.use("/users", userRouter);
routes.use("/sessions", sessionsRouter);

export default routes;
