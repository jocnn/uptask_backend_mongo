import nodemailer from 'nodemailer'

export const emailRegistro = async datos => {
  const { nombre, email, token } = datos

  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "74357fe3bd8f7f",
      pass: "c2a694b51512a7"
    }
  });

  // info de email
  const info = await transport.sendMail({
    from: ' "Uptask - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: "Uptask - Comprueba tu cuenta",
    text: "Comprueba tu cuenta en Uptask",
    html: `
    <p>Hola ${nombre}, comprueba tu cuenta en Uptask</p>    
    <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:</p>

    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
    
    <p>Si tu no creaste esta cuenta, puedes ignorar esta cuenta</p>
    `
  })


}