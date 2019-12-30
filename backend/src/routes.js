import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';
import EnrollController from './app/controllers/EnrollController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/sessions/students', StudentController.getUserData);

routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.get('/students/:id/help-orders', HelpOrderController.indexById);
routes.get('/students/help-orders/:id', HelpOrderController.singleOrder);
routes.post('/students/:id/help-orders', HelpOrderController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/students', StudentController.index);
routes.get('/student/:id', StudentController.getById);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

routes.get('/plans', PlanController.index);
routes.get('/plan/:id', PlanController.getById);
routes.post('/plans', PlanController.store);
routes.put('/plans', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/enroll', EnrollController.index);
routes.get('/enroll/:id', EnrollController.getById);
routes.post('/enroll', EnrollController.store);
routes.put('/enroll', EnrollController.update);
routes.delete('/enroll/:id', EnrollController.delete);

routes.get('/help-orders', HelpOrderController.index);
routes.get('/help-orders/not-answered', HelpOrderController.indexNotAnsewerd);
routes.get('/help-orders/:id', HelpOrderController.singleOrder);

routes.put('/help-orders/:id', HelpOrderController.update);

export default routes;
