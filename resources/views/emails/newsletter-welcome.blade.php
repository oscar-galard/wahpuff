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
    .promo {
      background-color: #FFC49A; /* secondary-color */
      padding: 1rem;
      border-left: 5px solid #E05B3A; /* accent-color */
      margin-bottom: 1.5rem;
      font-weight: 600;
      color: #E05B3A;
      text-align: center;
    }
    .email-body ul {
      list-style: none;
      padding-left: 0;
    }
    .email-body li {
      margin-bottom: 1rem;
      font-size: 1rem;
      color: #3A3A3A;
    }
    .original-price {
      text-decoration: line-through;
      color: #888888; /* illustration-grey */
      margin-right: 0.5rem;
    }
    .current-price {
      color: #E05B3A; /* accent-color */
      font-weight: bold;
    }
    .email-footer {
      background-color: #3A3A3A; /* dark-bg */
      padding: 1rem;
      text-align: center;
      font-size: 0.9rem;
      color: #FFFFFF; /* light-text-color */
    }
    .button {
      display: inline-block;
      background-color: #FF9966; /* primary-color */
      color: #FFFFFF !important;
      padding: 0.75rem 1.5rem;
      text-decoration: none !important;
      border-radius: 5px;
      margin-top: 1.5rem;
      font-weight: bold;
      text-align: center;
    }
    .greeting {
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }
    .message {
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .whatsapp-message {
      background-color: #e8f5e9;
      border: 1px solid #4caf50;
      border-radius: 5px;
      padding: 15px;
      margin: 20px 0;
      font-style: italic;
      text-align: center;
      color: #2e7d32;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>¡Gracias por registrarte a la newsletter de Wahpuff!</h1>
    </div>
    <div class="email-body">
      <h2>¡Hola {{ $subscriber->name }}!</h2>
      
      <div class="greeting">Gracias por unirte a nuestra comunidad de músicos</div>
      
      <div class="message">
        Estamos emocionados de tenerte con nosotros. Tu suscripción a nuestra newsletter te mantendrá informado sobre promociones especiales, nuevos cursos y consejos para mejorar tu técnica de guitarra.
      </div>

      <div class="promo">
        🚀 ¡Precios especiales por apertura! Solo por tiempo limitado.
      </div>
      
      <p>Descubre nuestras promociones exclusivas:</p>

      <ul>
        <li>
          <strong>Plan Descubre Desde:</strong>
          <span class="original-price">$399 MXN</span>
          <span class="current-price">$299 MXN</span>
          <br>Aprende desde 0 y obtendrás 4 clases.
        </li>
        <li>
          <strong>Plan Impulsa Desde:</strong>
          <span class="original-price">$699 MXN</span>
          <span class="current-price">$525 MXN</span>
          <br>¿Quieres dedicarle más tiempo a tu aprendizaje? Este es el plan correcto!.
        </li>
        <li>
          <strong>Plan Domina Desde:</strong>
          <span class="original-price">$999 MXN</span>
          <span class="current-price">$749 MXN</span>
          <br>¿Quieres ser profesional? Elige este plan.
        </li>
      </ul>

      <div class="whatsapp-message">
        <strong>¡Tu código de descuento exclusivo:</strong><br>
        <code style="font-size: 1.2em; background: #d4edda; padding: 5px 10px; border-radius: 4px; color: #155724;">WELCOME25</code><br><br>
        <strong>Mensaje para WhatsApp:</strong><br>
        "Hola, estoy suscrito a la newsletter, quiero aprender a tocar guitarra con Wahpuff!!"
      </div>

      <p>Hablemos por WhatsApp para agendar tu primera clase completamente gratis!</p>

      <div style="text-align: center;">
        <a href="https://wa.me/528447678301?text=Hola,%20estoy%20suscrito%20a%20la%20newsletter,%20quiero%20aprender%20a%20tocar%20guitarra%20con%20Wahpuff!!" class="button">Hablar por WhatsApp</a>
      </div>
      
      <div class="message">
        ¡Nuevamente, bienvenido a la familia de Wahpuff! Estamos aquí para acompañarte en tu viaje musical.
      </div>
    </div>
    <div class="email-footer">
      Wahpuff · Monterrey, México · +52 84 4767 8301
    </div>
  </div>
</body>
</html>
