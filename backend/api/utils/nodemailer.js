const nodemailer = require('nodemailer');
require('dotenv').config();

function generarCodigoVerificacion() {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
}

async function enviarCorreoVerificacion(correo, codigoVerificacion) {
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verificación de Correo - Municipalidad de Montes de Oca</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
                margin: 0;
                padding: 20px;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
            }
            .card {
                background-color: #1e3a8a;
                color: white;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
            .logo {
                text-align: center;
                margin-bottom: 20px;
            }
            .logo img {
                height: 50px;
            }
            h1 {
                text-align: center;
                font-size: 24px;
                margin-bottom: 20px;
            }
            .content {
                text-align: center;
                margin-bottom: 30px;
                font-size: 16px;
                line-height: 1.5;
            }
            .verification-code {
                background-color: rgba(255, 255, 255, 0.9);
                color: #1e3a8a;
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                padding: 15px;
                margin: 20px auto;
                max-width: 200px;
                border-radius: 5px;
                letter-spacing: 2px;
            }
            .footer {
                margin-top: 30px;
                text-align: center;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.7);
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="card">
                <div class="logo">
                    <svg width="240" height="50" viewBox="0 0 240 50" fill="white">
                        <path d="M30,10 L10,30 L20,40 L40,20 L30,10 Z"></path>
                        <path d="M20,10 L0,30 L10,40 L30,20 L20,10 Z"></path>
                        <text x="55" y="22" font-size="14" font-weight="bold">MUNICIPALIDAD</text>
                        <text x="55" y="38" font-size="14" font-weight="bold">MONTES DE OCA</text>
                    </svg>
                </div>
                <h1>Verificación de Correo</h1>
                <div class="content">
                    <p>Tu código de verificación es:</p>
                    <div class="verification-code">${codigoVerificacion}</div>
                    <p>Ingresa este código en la página de verificación para activar tu cuenta.</p>
                </div>
                <div class="footer">
                    <p>Este es un correo automático, por favor no responda a este mensaje.</p>
                    <p>© 2025 Municipalidad de Montes de Oca. Todos los derechos reservados.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: correo,
        subject: 'Verificación de correo - Municipalidad de Montes de Oca',
        html: htmlTemplate
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.response);
    } catch (err) {
        console.error('Error al enviar correo:', err);
    }
}

module.exports = {
    enviarCorreoVerificacion,
    generarCodigoVerificacion
};