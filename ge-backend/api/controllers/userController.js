const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret"; // Adicione uma chave secreta segura no arquivo .env

async function createUser(ctx) {
  try {
    const { cpf, password, name, birthday } = ctx.request.body;
    const existingUser = await prisma.user.findUnique({ where: { cpf } });

    if (existingUser) {
      ctx.status = 400;
      ctx.body = { message: "Usuário já cadastrado" };
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        cpf,
        password: hashedPassword,
        birthday,
      },
    });
    ctx.body = newUser;
  } catch (error) {
    console.error("Erro ao cadastrar o usuário:", error);
    ctx.status = 500;
    ctx.body = { error: "Erro ao cadastrar o usuário" };
  }
}

async function getUsers(ctx) {
  try {
    const users = await prisma.user.findMany();
    ctx.body = users;
  } catch (error) {
    console.error("Erro ao buscar os usuários:", error);
    ctx.status = 500;
    ctx.body = { error: "Erro ao buscar os usuários" };
  }
}

async function deleteUser(ctx) {
  try {
    const { id } = ctx.params;
    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    ctx.status = 204;
  } catch (error) {
    console.error("Erro ao excluir o usuário:", error);
    ctx.status = 500;
    ctx.body = { error: "Erro ao excluir o usuário" };
  }
}

async function updateUser(ctx) {
  try {
    const { id } = ctx.params;
    const { cpf, password, name, birthday } = ctx.request.body;
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        cpf,
        birthday,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });
    ctx.body = updatedUser;
  } catch (error) {
    console.error("Erro ao atualizar o usuário:", error);
    ctx.status = 500;
    ctx.body = { error: "Erro ao atualizar o usuário" };
  }
}

async function loginUser(ctx) {
  try {
    const { cpf, password } = ctx.request.body;
    const user = await prisma.user.findUnique({
      where: { cpf },
    });

    if (!user) {
      ctx.status = 401;
      ctx.body = { message: "Usuário não encontrado" };
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      ctx.status = 401;
      ctx.body = { message: "Senha incorreta" };
      return;
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    ctx.body = { token };
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    ctx.status = 500;
    ctx.body = { error: "Erro ao fazer login" };
  }
}

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  loginUser,
};
