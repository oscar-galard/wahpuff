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
      background-color: #E05B3A; /* accent-color */
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
    .user-info {
      background-color: #FFC49A; /* secondary-color */
      padding: 1.5rem;
      border-radius: 8px;
      margin: 1.5rem 0;
    }
    .info-item {
      margin-bottom: 0.75rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid #f0f0f0;
    }
    .info-item:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .label {
      font-weight: bold;
      color: #E05B3A; /* accent-color */
    }
    .value {
      margin-left: 0.5rem;
      color: #3A3A3A;
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
    .highlight {
      background-color: #FFF8E1;
      padding: 10px;
      border-left: 4px solid #FF9966;
      font-weight: bold;
      text-align: center;
      margin: 15px 0;
      color: #E05B3A;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>🎉 ¡Nuevo Estudiante Registrado!</h1>
    </div>
    <div class="email-body">
      <h2>¡Hola!</h2>
      
      <div class="greeting">Tienes un nuevo estudiante en Wahpuff</div>
      
      <div class="message">
        Se ha registrado un nuevo usuario en tu plataforma. A continuación encontrarás los detalles del nuevo estudiante:
      </div>

      <div class="highlight">
        📅 Registrado el: {{ now()->format('d/m/Y H:i') }}
      </div>

      <div class="user-info">
        <div class="info-item">
          <span class="label">Nombre:</span>
          <span class="value">{{ $user->name }}</span>
        </div>
        <div class="info-item">
          <span class="label">Email:</span>
          <span class="value">{{ $user->email }}</span>
        </div>
        <div class="info-item">
          <span class="label">Fecha de Registro:</span>
          <span class="value">{{ $user->created_at->format('d/m/Y H:i') }}</span>
        </div>
        <div class="info-item">
          <span class="label">ID de Usuario:</span>
          <span class="value">{{ $user->id }}</span>
        </div>
      </div>

      <div class="message">
        ¡Bienvenido a la comunidad de Wahpuff! Este nuevo estudiante está listo para comenzar su viaje musical.
      </div>

      <div class="message" style="font-style: italic; text-align: center; color: #E05B3A; font-weight: bold;">
        Recuerda seguirlo en su proceso de aprendizaje y ofrecerle la mejor experiencia posible.
      </div>
    </div>
    <div class="email-footer">
      Wahpuff Admin · Notificaciones Automáticas · Monterrey, México
    </div>
  </div>
</body>
</html>