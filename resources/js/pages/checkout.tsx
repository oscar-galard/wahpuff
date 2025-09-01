import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
// ... (resto de tus imports y lógica)

const PaymentPage = ({ auth, plans }) => {
	// ... (tu lógica de useState y useEffect para planes y precios)

	// Agregamos un estado para el ID de la orden de PayPal
	const [paypalOrderId, setPaypalOrderId] = useState(null);

	// En lugar del handleSubmit que hacía un POST, ahora generamos la orden
	const createPaypalOrder = async () => {
		try {
			// Llama a tu endpoint del backend para crear la orden de PayPal
			const response = await fetch(route('paypal.createOrder'), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					// Incluye el CSRF token de Laravel/Inertia
					'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
				},
				body: JSON.stringify({
					plan_id: selectedPlan.id,
					amount: finalPrice,
					// ... cualquier otro dato que necesites enviar
				})
			});
			const data = await response.json();
			setPaypalOrderId(data.id); // Guarda el ID de la orden en el estado

			return data.id;
		} catch (error) {
			console.error("Error al crear la orden de PayPal:", error);
		}
	};

	const capturePaypalOrder = async (orderId) => {
		try {
			// Llama a tu endpoint del backend para capturar la orden
			const response = await fetch(route('paypal.captureOrder'), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
				},
				body: JSON.stringify({ order_id: orderId })
			});
			const data = await response.json();
			console.log("Orden capturada:", data);

			// Redirige al usuario a una página de éxito
			window.location.href = route('dashboard');
		} catch (error) {
			console.error("Error al capturar la orden de PayPal:", error);
		}
	};

	// La lógica de los botones de PayPal se renderiza aquí
	useEffect(() => {
		// Asegúrate de que el script de PayPal se cargue después de que el componente se monte
		if (typeof window.paypal !== 'undefined') {
			window.paypal.Buttons({
				createOrder: function (data, actions) {
					return createPaypalOrder();
				},
				onApprove: function (data, actions) {
					return capturePaypalOrder(data.orderID);
				},
				onError: function (err) {
					console.error(err);
				}
			}).render('#paypal-button-container'); // Un contenedor en tu JSX
		}
	}, [selectedPlan]); // Vuelve a renderizar si el plan cambia

	return (
		// ... (Tu HTML/JSX para el resumen del carrito, descuentos, etc.)

		<div id="paypal-button-container"></div>
	);
};
