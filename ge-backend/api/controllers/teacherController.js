const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//! Create - Cria um novo professor
async function createTeacher(ctx) {
  try {
    const { name, cpf, birthday, password, schoolId, students = [], } = ctx.request.body;

    const studentIds = Array.isArray(students)?students : [];

    const newTeacher = await prisma.teacher.create({
      data: { name, cpf, birthday, password, schoolId: schoolId, students: {
          connect: studentIds.map(studentId => ({ id: studentId })),
        },
      },
    });

    ctx.body = newTeacher;
  } catch (error) {
    console.error("Erro ao criar o professor:", error);
    ctx.status = 500;
    ctx.body = { error: "Erro ao criar professor" };
  }
}

//! GET ALL Teachers - Busca todos os professores
async function getTeachers(ctx) {
  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        school: true,
        students: true,
      },
    });
    ctx.body = teachers;
  } catch (error) {
    console.error("Erro ao buscar os professores:", error);
    ctx.status = 500;
    ctx.body = { error: "Erro ao buscar os professores" };
  }
}

//! UPDATE Teacher by ID - Atualiza um professor pelo ID
async function updateTeacher(ctx) {
  try {
    const { id } = ctx.params;
    const {
      name,
      cpf,
      birthday,
      password,
      schoolId,
      students = [],
    } = ctx.request.body;

    
    const studentIds = Array.isArray(students) ? students : [];

    const updatedTeacher = await prisma.teacher.update({
      where: { id },
      data: {
        name,
        cpf,
        birthday,
        password,
        schoolId: schoolId,
        students: {
          set: studentIds.map(studentId => ({ id: studentId })),
        },
      },
    });

    ctx.body = updatedTeacher;
  } catch (error) {
    console.error("Erro ao atualizar o professor:", error);
    ctx.status = 500;
    ctx.body = { error: "Erro ao atualizar o professor" };
  }
}

//! DELETE Teacher by ID - Exclui um professor pelo ID
async function deleteTeacher(ctx) {
  try {
    const { id } = ctx.params;
    await prisma.teacher.delete({
      where: { id },
    });
    ctx.status = 204;
  } catch (error) {
    console.error("Erro ao excluir o professor:", error);
    ctx.status = 500;
    ctx.body = { error: "Erro ao excluir o professor" };
  }
}

module.exports = {
  createTeacher,
  getTeachers,
  updateTeacher,
  deleteTeacher,
};
