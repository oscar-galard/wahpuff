<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      background-color: #f4f4f4;
      font-family: 'Roboto', sans-serif;
      color: #3A3A3A;
      padding: 0;
      margin: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 2rem auto;
      background-color: #FFFFFF; /* light-bg */
      border-radius: 8px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.08);
      overflow: hidden;
    }
    .email-header {
      background-color: #FF9966; /* primary-color */
      color: #FFFFFF;
      padding: 1.5rem;
      text-align: center;
    }
    .email-body {
      padding: 2rem;
    }
    .email-body h2 {
      margin-top: 0;
      color: #3A3A3A;
    }
    .verification-button {
      display: inline-block;
      background-color: #FF9966; /* primary-color */
      color: #FFFFFF !important;
      padding: 12px 30px;
      text-decoration: none !important;
      border-radius: 5px;
      margin: 20px 0;
      font-weight: bold;
      text-align: center;
    }
    .verification-info {
      background-color: #FFC49A; /* secondary-color */
      padding: 1rem;
      border-left: 5px solid #E05B3A; /* accent-color */
      margin-bottom: 1.5rem;
      font-weight: 600;
      color: #E05B3A;
      text-align: center;
    }
    .email-footer {
      background-color: #3A3A3A; /* dark-bg */
      padding: 1rem;
      text-align: center;
      font-size: 0.9rem;
      color: #FFFFFF; /* light-text-color */
    }
    .greeting {
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }
    .message {
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .note {
      font-style: italic;
      color: #666;
      font-size: 0.9rem;
      margin-top: 2rem;
      padding: 10px;
      border-left: 3px solid #FF9966;
      background-color: #f9f9f9;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>¡Confirma tu correo electrónico!</h1>
    </div>
    <div class="email-body">
      <h2>¡Hola {{ $user->name }}!</h2>
      
      <div class="greeting">Gracias por registrarte en Wahpuff</div>
      
      <div class="message">
        Estamos emocionados de tenerte en nuestra comunidad. Para completar tu registro y comenzar a disfrutar de todos los beneficios de tu cuenta, por favor verifica tu dirección de correo electrónico.
      </div>
      
      <div class="verification-info">
        📧 Confirma tu correo electrónico para activar tu cuenta
      </div>
      
      <div style="text-align: center; margin: 25px 0;">
        <a href="{{ $verificationUrl }}" class="verification-button" style="color: white !important;">Verificar Correo Electrónico</a>
      </div>
      
      <div class="message">
        Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. Estamos aquí para ayudarte en tu viaje musical.
      </div>
      
      <div class="note">
        Si no solicitaste esta verificación, puedes ignorar este correo. 
        El enlace de verificación expirará en 24 horas.
      </div>
      
      <div style="margin-top: 2rem; text-align: center;">
        <p style="font-weight: bold; color: #E05B3A;">¡Bienvenido a Wahpuff!</p>
        <p style="font-size: 0.9rem;">Tu plataforma para aprender guitarra de manera personalizada</p>
      </div>
    </div>
    <div class="email-footer">
      Wahpuff · Monterrey, México · +52 84 4767 8301
    </div>
  </div>
</body>
</html>