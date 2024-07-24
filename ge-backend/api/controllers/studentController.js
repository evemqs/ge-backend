const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//! Create - Cria um novo aluno
async function createStudent(ctx) {
  try {
    const { name, cpf, birthday, teacherId } = ctx.request.body;
    const newStudent = await prisma.student.create({
      data: {
        name,
        cpf,
        birthday,
        teacherId,
      },
    });
    ctx.body = newStudent;
  } catch (error) {
    console.error('Erro ao criar o aluno:', error);
    ctx.status = 500;
    ctx.body = { error: 'Erro ao criar o aluno' };
  }
}

//! GET ALL Students - Busca todos os alunos
async function getStudents(ctx) {
  try {
    const students = await prisma.student.findMany({
      include: {
        teacher: true,
      },
    });
    ctx.body = students;
  } catch (error) {
    console.error('Erro ao buscar os alunos:', error);
    ctx.status = 500;
    ctx.body = { error: 'Erro ao buscar os alunos' };
  }
}

//! UPDATE Student by ID - Atualiza um aluno pelo ID
async function updateStudent(ctx) {
  try {
    const { id } = ctx.params;
    const { nome, cpf, birthday, teacherId } = ctx.request.body;
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        nome,
        cpf,
        birthday,
        teacherId,
      },
    });
    ctx.body = updatedStudent;
  } catch (error) {
    console.error('Erro ao atualizar o aluno:', error);
    ctx.status = 500;
    ctx.body = { error: 'Erro ao atualizar o aluno' };
  }
}

//! DELETE Student by ID - Exclui um aluno pelo ID
async function deleteStudent(ctx) {
  try {
    const { id } = ctx.params;
    await prisma.student.delete({
      where: { id },
    });
    ctx.status = 204;
  } catch (error) {
    console.error('Erro ao excluir o aluno:', error);
    ctx.status = 500;
    ctx.body = { error: 'Erro ao excluir o aluno' };
  }
}

module.exports = {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
};
