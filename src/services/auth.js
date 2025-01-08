const { PrismaClient, Role } = require("@prisma/client");
const { generateVerificationToken } = require("../libs/token");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

exports.findExistingUserByEmail = async (email) => {
  const existingUser = await prisma.account.findFirst({
    where: {
      email,
    },
    include: {
      user: true,
    },
  });

  return existingUser;
};

exports.registerWithGoogle = async (email, firstName, lastName, image) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const verificationToken = await generateVerificationToken(email);
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phone: "1",
        address: "11",
        totalPrice: 0,
        account: {
          create: {
            email,
            password: bcrypt.hashSync(email, salt),
            verifiedEmailId: verificationToken.id,
            role: Role.USER,
            image,
          },
        },
      },
    });

    console.log(newUser);

    return {
      newUser,
      token: verificationToken.token,
    };
  } catch (err) {
    console.log(err);
  }
};
