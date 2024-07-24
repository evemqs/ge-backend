const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//! Create - Cria uma nova escola
async function createSchool(ctx) {
  try {
    const { nome, endereco } = ctx.request.body;
    const newSchool = await prisma.school.create({
      data: {
        nome,
        endereco,
      },
    });
    ctx.body = newSchool;
  } catch (error) {
    console.error('Erro ao criar a escola:', error);
    ctx.status = 500;
    ctx.body = { error: 'Erro ao criar a escola' };
  }
}

//! GET ALL Schools - Busca todas as escolas
async function getSchools(ctx) {
  try {
    const schools = await prisma.school.findMany({
      include: {
        teachers: true,
      },
    });
    ctx.body = schools;
  } catch (error) {
    console.error('Erro ao buscar as escolas:', error);
    ctx.status = 500;
    ctx.body = { error: 'Erro ao buscar as escolas' };
  }
}

//! UPDATE School by ID - Atualiza uma escola pelo ID
async function updateSchool(ctx) {
  try {
    const { id } = ctx.params;
    const { nome, endereco } = ctx.request.body;
    const updatedSchool = await prisma.school.update({
      where: { id },
      data: {
        nome,
        endereco,
      },
    });
    ctx.body = updatedSchool;
  } catch (error) {
    console.error('Erro ao atualizar a escola:', error);
    ctx.status = 500;
    ctx.body = { error: 'Erro ao atualizar a escola' };
  }
}

//! DELETE School by ID - Exclui uma escola pelo ID
async function deleteSchool(ctx) {
  try {
    const { id } = ctx.params;
    await prisma.school.delete({
      where: { id },
    });
    ctx.status = 204;
  } catch (error) {
    console.error('Erro ao excluir a escola:', error);
    ctx.status = 500;
    ctx.body = { error: 'Erro ao excluir a escola' };
  }
}

module.exports = {
  createSchool,
  getSchools,
  updateSchool,
  deleteSchool,
};
