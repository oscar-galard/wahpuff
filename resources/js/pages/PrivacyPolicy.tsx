import React from 'react';
import { Head } from '@inertiajs/react';
import AuthLayout from '@/layouts/auth-layout';

const PrivacyPolicy = () => {
    return (
        <AuthLayout title="Política de Privacidad y Condiciones de Uso" description="">
            <Head title="Política de Privacidad y Condiciones de Uso" />
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Política de Privacidad y Condiciones de Uso – Wahpuff</h1>
                
                <p className="text-gray-700 mb-6">
                    En Wahpuff nos tomamos muy en serio tu privacidad y la claridad de los servicios que ofrecemos. 
                    Al hacer uso de nuestro sitio web wahpuff.xyz y de los servicios de clases o laboratorios, 
                    aceptas las siguientes políticas y condiciones:
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Privacidad y Protección de Datos</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Los datos personales proporcionados por el usuario (nombre, correo electrónico, teléfono, etc.) serán utilizados únicamente para la correcta prestación de los servicios contratados y para la comunicación con el alumno.</li>
                    <li>No compartiremos tu información con terceros sin tu consentimiento, salvo cuando sea requerido por la ley.</li>
                    <li>Podremos utilizar tus datos para enviarte recordatorios, actualizaciones de clases, información sobre promociones o material educativo relacionado.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Uso de Cookies</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Nuestro sitio utiliza cookies para mejorar la experiencia del usuario y para fines de análisis y publicidad.</li>
                    <li><strong>Cookies esenciales:</strong> necesarias para el correcto funcionamiento de la web.</li>
                    <li><strong>Cookies de análisis:</strong> nos ayudan a entender cómo los usuarios navegan el sitio y mejorar su experiencia.</li>
                    <li><strong>Cookies de publicidad:</strong> utilizamos cookies de terceros (como Google Ads y Meta Ads) para mostrarte anuncios relevantes basados en tus intereses y tu actividad en la web.</li>
                    <li>El usuario puede gestionar y desactivar las cookies desde la configuración de su navegador en cualquier momento.</li>
                    <li>Al continuar navegando en wahpuff.xyz aceptas el uso de cookies de acuerdo con esta política.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Publicidad y Terceros</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Implementamos servicios de terceros como Google Ads y Meta Ads, que pueden recopilar información mediante cookies y tecnologías similares para mostrar publicidad personalizada.</li>
                    <li>Estos proveedores pueden mostrar anuncios basados en tus visitas anteriores a este u otros sitios web.</li>
                    <li>Puedes desactivar la publicidad personalizada a través de la configuración de anuncios en tu cuenta de Google o Meta, o utilizando herramientas de exclusión voluntaria (opt-out).</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Condiciones de Clases y Laboratorios</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>El usuario se compromete a respetar los horarios de clase agendados. En caso de emergencia, se deberá avisar con al menos 2 horas de anticipación.</li>
                    <li>Si una clase es cancelada con menos de 2 horas de aviso, esta no podrá ser repuesta.</li>
                    <li>Las clases y laboratorios no son acumulables; deberán utilizarse dentro del periodo mensual contratado.</li>
                    <li>Los descuentos no son acumulables entre cursos ni promociones. Ejemplo: el descuento por curso grupal no se combina con el descuento de curso a domicilio.</li>
                    <li>La duración de las clases y laboratorios puede variar, usualmente entre 30 y 50 minutos, dependiendo de las temáticas y actividades.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Acceso a Material Gratuito</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Los videos publicados en wahpuff.com son de libre acceso y no requieren pago.</li>
                    <li>Lo que el usuario paga es el acompañamiento personalizado en clases y laboratorios, con seguimiento de objetivos y personalización del plan de estudio.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Modificaciones de la Política</h2>
                <p className="text-gray-700">
                    Nos reservamos el derecho de actualizar esta política en cualquier momento. 
                    Te recomendamos revisar periódicamente esta página para estar informado de los cambios.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Contacto</h2>
                <p className="text-gray-700">
                    Para cualquier consulta sobre estas políticas, puedes escribirnos a: 
                    <a href="mailto:soporte@wahpuff.com" className="text-blue-600 hover:underline"> soporte@wahpuff.com</a>
                </p>
            </div>
        </AuthLayout>
    );
};

export default PrivacyPolicy;