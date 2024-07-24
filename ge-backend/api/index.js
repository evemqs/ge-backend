const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors'); // Importar o pacote @koa/cors
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();
const app = new Koa();
const router = new Router();

app.use(cors()); // Usar CORS para permitir todas as origens
app.use(bodyParser());

//* Importar controllers
const userController = require('./controllers/userController');
const schoolController = require('./controllers/schoolController');
const teacherController = require('./controllers/teacherController');
const studentController = require('./controllers/studentController');

//! Rotas para Users
router.post('/cadastrar/user', userController.createUser);
router.post('/login/user', userController.loginUser);
router.get('/get/users', userController.getUsers);
router.put('/atualizar/user/:id', userController.updateUser);
router.delete('/deletar/user/:id', userController.deleteUser);

//! Rotas para Schools
router.post('/cadastrar/school', schoolController.createSchool);
router.get('/get/schools', schoolController.getSchools);
router.put('/atualizar/school/:id', schoolController.updateSchool);
router.delete('/deletar/school/:id', schoolController.deleteSchool);

//! Rotas para Teachers
router.post('/cadastrar/teacher', teacherController.createTeacher);
router.get('/get/teachers', teacherController.getTeachers);
router.put('/atualizar/teacher/:id', teacherController.updateTeacher);
router.delete('/deletar/teacher/:id', teacherController.deleteTeacher);

//! Rotas para Students
router.post('/cadastrar/student', studentController.createStudent);
router.get('/get/students', studentController.getStudents);
router.put('/atualizar/student/:id', studentController.updateStudent);
router.delete('/deletar/student/:id', studentController.deleteStudent);

const PORT = process.env.PORT || 3001;

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
