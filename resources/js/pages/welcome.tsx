import { type SharedData } from '@/types';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import React, { useState, useEffect, FormEventHandler } from 'react';
import Swal from 'sweetalert2';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        name: '',
        email: '',
        phone: '',
    });

    const handleNewsletterSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('newsletter.subscribe'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                Swal.fire({
                    title: '¡Suscripción exitosa!',
                    text: 'Gracias por suscribirte a nuestro boletín. Pronto recibirás nuestras ofertas especiales.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Aceptar'
                });
            },
            onError: (errors) => {
                Swal.fire({
                    title: 'Error en la suscripción',
                    text: 'Hubo un problema al suscribirte. Por favor, inténtalo nuevamente.',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

	return (
		<>
			<Head title="Wahpuff clases de guitarra">
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" xintegrity="sha512-..." crossOrigin="anonymous" referrerPolicy="no-referrer" />
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
				<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
				<script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
			</Head>

			<div className="page-container modern">
				<header className="main-header modern">
					<div className="logo-area">
						{/* Asegúrate de que la ruta de la imagen sea accesible desde tu servidor */}
						<img className="wahpuff-logo" src="/images/wahpuff-logox170.png" alt="Logo" />
					</div>

					<div
						id="hamburger-toggle"
						className="hamburger-icon"
						aria-label="Abrir menú"
						role="button"
						onClick={toggleMenu}
					>
						<span></span>
						<span></span>
						<span></span>
					</div>

					{/* Navegación principal - Clases actualizadas para CSS externo */}
					<nav className={`main-nav modern ${isOpen ? 'is-open' : ''}`}>
						{auth.user ? (
							<Link className="nav-link"
								href={route('dashboard')}
								onClick={() => setIsOpen(false)}
							>
								Dashboard
							</Link>
						) : (
							<>
								<Link
									href={route('login')}
									className="nav-link"
									onClick={() => setIsOpen(false)}
								>
									Ingresar
								</Link>
								<Link
									href={route('register')}
									className="nav-link"
									onClick={() => setIsOpen(false)}
								>
									Registrarse
								</Link>
							</>
						)}
					</nav>
				</header>

				<main className="main-content">
					{/* Sección Hero */}
					<section className="hero-section modern background-image-hero">
						<div className="hero-overlay"></div>
						<div className="hero-content">
							<div className="hero-text">
								<h1>Aprende guitarra con clases personalizadas en Monterrey</h1>
								{/* Corrección: Se eliminó el </strong> extra */}
								<p className="hero-subtitle">¿Cansado de tutoriales que no explican bien o no avanzan contigo? Con Wahpuff, aprendes paso a paso, con <strong>acompañamiento real</strong> y un plan hecho para ti.<br /></p>
								<p><strong> Clases online o a Domicilio</strong></p>
								<div className="hero-actions">
									<a href="#register" className="btn-primary large">
										<ion-icon name="logo-whatsapp"></ion-icon> ¡Quiero mi primera clase GRATIS!
									</a>
								</div>
								<div className="hero-rating">
									<span className="stars">★★★★★</span>
									<span className="rating-text"><strong>Valorado</strong> por cientos de alumnos</span>
								</div>
							</div>
						</div>
					</section>

					{/* Sección Problema-Solución */}
					<section className="problem-solution-section">
						<div className="content-wrapper">
							<h2>¿Te suena familiar?</h2>
							<div className="problem-grid">
								<div className="problem-item card">
									<img src="images/friendship.png" alt="Falta de acompañamiento personalizado" />
									<h3>No cuentas con acompañamiento personalizado.</h3>
									<p>¿Te sientes solo en tu proceso de aprendizaje? Muchos tutoriales no ofrecen la guía individual que necesitas para superar tus retos.</p>
								</div>
								<div className="problem-item card">
									<img src="images/question.png" alt="Dudas sin respuesta" />
									<h3>Tienes dudas, pero nadie te responde.</h3>
									<p>Cuando te surge una pregunta técnica o un acorde no te sale, ¿te frustras al no tener a quién recurrir para una respuesta rápida?</p>
								</div>
								<div className="problem-item card">
									{/* Asegúrate de que la ruta de la imagen sea accesible */}
									<img src="images/frustration.png" alt="Videos impersonales y genéricos" />
									<h3>Todo parece una serie de videos impersonales y genéricos.</h3>
									<p>Es común sentir que los cursos en línea son solo grabaciones frías sin interacción ni un toque humano que te motive.</p>
								</div>
							</div>
							<h3 className="callout">Por más que sigues tutoriales, ¿sientes que no avanzas?</h3>

							<h2>¡Imagina lo que puedes lograr!</h2>
							<div className="result-demonstration card">
								<img src="images/trophy.png" alt="Logro de tocar guitarra" />
								<h3 className="highlight-text">🎶 **Toca cientos de canciones en solo 7 clases.**</h3>
								<p>Sí, ¡aunque ahora no sepas tocar ni una nota! Imagina ver a tu familia y amigos sorprendidos al escucharte tocar y pensar: "¿Cómo lograste eso tan rápido?"</p>
							</div>
						</div>
					</section>

					{/* Sección de Objeciones */}
					<section className="objections-section">
						<h2>Supera cualquier obstáculo</h2>
						<div className="objections-grid">
							<div className="objection-item">
								<ion-icon name="bulb-outline"></ion-icon>
								<h3>¿No soy un experto?</h3>
								<p>¡No tienes que serlo! Solo necesitas el <strong>método correcto</strong> y nosotros estaremos ahi en cada momento.</p>
							</div>
							<div className="objection-item">
								<ion-icon name="alarm-outline"></ion-icon>
								<h3>¿Poco tiempo al día?</h3>
								<p>¡Solo <strong>30 minutos al día</strong> son suficientes para ver resultados reales!</p>
							</div>
							<div className="objection-item">
								<ion-icon name="wallet-outline"></ion-icon>
								<h3>¿Es muy caro?</h3>
								<p>Tenemos <strong>diferentes planes para distintos presupuestos</strong>, elige el que mas te convenga.</p>
							</div>
							<div className="objection-item">
								<ion-icon name="musical-notes"></ion-icon>
								<h3>Es muy dificil!</h3>
								<p>Nuestro metodo te acompaña <strong>paso a paso</strong>, combinado lo mejor de las clases online con lo mejor de las clases presenciales.</p>
							</div>
						</div>
						<h3 className="callout">Obtén lo mejor de las clases online, con el toque humano de las clases presenciales.</h3>
					</section>

					{/* Sección de Prueba Social */}
					<section className="proof-section modern">
						<h2>Resultados Comprobados</h2>
						<div className="proof-wrapper">
							<div className="proof-content">
								<div className="proof-points">
									<ul>
										<li>
											<p><strong>Técnicas comprobadas</strong> que aceleran tu aprendizaje.</p>
										</li>
										<li>
											<p>Ya hemos enseñado a <strong>cientos de alumnos</strong> con este método.</p>
										</li>
									</ul>
								</div>
							</div>

							<div className="testimonial-section">
								<div className="proof-item testimonial">
									{/* Asegúrate de que la ruta de la imagen sea accesible */}
									<img src="images/avatar.png" alt="Foto de Sofi" className="testimonial-img" />
									<div className="testimonial-quote">
										<span className="quote-mark">“</span>
										<blockquote> Como Sofi, que con solo 1 hora a la semana, logró tocar canciones que muchos tardan años en dominar.
											Y todo esto ¡En solo 7 clases!
										</blockquote>
										<span className="quote-mark closing">”</span>
									</div>
									<cite>— Sofi, Alumna de Wahpuff</cite>
								</div>
							</div>
						</div>
					</section>

					{/* Sección de Planes */}
					<section className="plans-section modern" id="planes">
						<h2>Elige tu Camino Musical</h2>
						<p className="plans-intro">¡Comienza hoy mismo! Tenemos un <strong>plan</strong> perfecto para ti:</p>
						<div className="plan-cards-container modern">
							<div className="plan-card">
								<p className="plan-name">Descubre</p>
								<h3 className="plan-price">$399 <span className="price-unit">/ mes</span></h3>
								<ul className="plan-features">
									<li>Acceso a biblioteca de videos</li>
									<li>2 Sesiones de práctica</li>
									<li>2 Clases online en vivo</li>
								</ul>
								<Link href={route('payment.page')} className="btn-secondary small">Seleccionar Plan</Link>
							</div>
							<div className="plan-card popular">
								<p className="plan-name">Impulsa</p>
								<h3 className="plan-price">$699 <span className="price-unit">/ mes</span></h3>
								<ul className="plan-features">
									<li>Acceso completo a videos</li>
									<li>2 Sesiones de práctica</li>
									<li>4 Clases online en vivo</li>
								</ul>
								<Link href={route('payment.page')} className="btn-primary small">Seleccionar Plan</Link>
							</div>
							<div className="plan-card">
								<p className="plan-name">Domina</p>
								<h3 className="plan-price">$999 <span className="price-unit">/ mes</span></h3>
								<ul className="plan-features">
									<li>Acceso ilimitado a todo</li>
									<li>4 Sesiones de práctica</li>
									<li>4 Clases online en vivo</li>
								</ul>
								<Link href={route('payment.page')} className="btn-secondary small">Seleccionar Plan</Link>
							</div>
						</div>
					</section>

					{/* Sección de Contacto */}
					<section className="contact-section modern" id="contact">
						<div className="contact-content centered two-columns">
							<div className="contact-text-area">
								<h2>¡Tu próximo paso está aquí!</h2>
								<p>Experimenta la alegría de tocar la guitarra con un método que realmente funciona.</p>
								<a href="#register" className="whatsapp-link large" rel="noopener noreferrer">
									<ion-icon name="logo-whatsapp" className="whatsapp-icon"></ion-icon>
									<span>Quiero mi primera clase gratis</span>
								</a>
							</div>
						</div>
					</section>

					{/* Sección de Suscripción al Boletín */}
					<section className="newsletter-section" id="register">
						<div className="content-wrapper">
							<h2>Suscribete YA!</h2>
							<p className="section-description">
								Recibe noticias sobre nuevos cursos y <strong>¡Descuentos Especiales!</strong>
							</p>

                            <form onSubmit={handleNewsletterSubmit} className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="name">Nombre:</label>
                                    <input type="text" id="name" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                    {errors.name && <div className='text-red-500 text-xs mt-1'>{errors.name}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                                    {errors.email && <div className='text-red-500 text-xs mt-1'>{errors.email}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Teléfono (opcional):</label>
                                    <input type="tel" id="phone" name="phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                                    {errors.phone && <div className='text-red-500 text-xs mt-1'>{errors.phone}</div>}
                                </div>
                                <button type="submit" className="btn-primary" disabled={processing}>Enviar</button>
                            </form>
						</div>
					</section>
				</main>

				{/* Pie de página */}
				<footer className="main-footer modern">
					<div className="footer-content">
						<div className="footer-logo">
							{/* Asegúrate de que la ruta de la imagen sea accesible */}
							<img src="images/wahpuff-logox170.png" alt="Wahpuff Logo" className="wahpuff-logo small" />
							<p>© 2025 Wahpuff. Todos los derechos reservados.</p>
						</div>
						<nav className="footer-nav">
							<a href="#terms" className="footer-link">Términos de Uso</a>
							<a href="#privacy" className="footer-link">Política de Privacidad</a>
						</nav>
					</div>
				</footer>
			</div>
		</>
	);
}
