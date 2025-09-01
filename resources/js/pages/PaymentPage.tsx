import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Link } from '@inertiajs/react';

const GuestLayout = ({ children }) => (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        {children}
    </div>
);

const PaymentPage = () => {
    const { props } = usePage();
    const plans = props.plans;
    const paypalClientId = props.paypalClientId;

    const [selectedPlan, setSelectedPlan] = useState(plans[0]);
    const [discountCode, setDiscountCode] = useState('');
    const [finalPrice, setFinalPrice] = useState(selectedPlan?.price || 0);
    const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, success, error

    useEffect(() => {
        setFinalPrice(selectedPlan?.price || 0);
    }, [selectedPlan]);

    // Function to get JWT token from storage
    const getAuthToken = () => {
        return localStorage.getItem('jwt_token'); // Assuming you store the token here after login
    }

    if (paymentStatus === 'success') {
        return (
            <GuestLayout>
                <Head title="Pago Exitoso" />
                <div className="max-w-lg mx-auto my-12 bg-white rounded-lg shadow-xl p-8 text-center">
                    <div className="mb-4">
                        <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">¡Pago completado con éxito!</h1>
                    <p className="text-gray-600 mb-6">Gracias por tu compra. Tu suscripción ha sido activada.</p>
                    <Link
                        href={route('dashboard')}
                        className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600"
                    >
                        Ir al Dashboard
                    </Link>
                </div>
            </GuestLayout>
        );
    }

    return (
        <GuestLayout>
            <Head title="Checkout" />
            <div className="max-w-6xl mx-auto my-12 bg-white rounded-lg shadow-xl">
                <div className="bg-orange-300 text-white p-4 text-center rounded-t-lg">
                    ¡Oferta especial! <strong>Obtén un plan anual y te regalamos 2 meses.</strong>
                </div>
                <div className="grid md:grid-cols-2 gap-8 p-8">
                    <div>
                        <h1 className="text-2xl font-bold mb-6">Tu carrito</h1>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                            <h3 className="font-semibold mb-2">Elige tu Plan</h3>
                            <div className="flex space-x-4">
                                {plans.map(plan => (
                                    <button
                                        key={plan.id}
                                        onClick={() => setSelectedPlan(plan)}
                                        className={`px-4 py-2 rounded-full border transition-colors ${selectedPlan.id === plan.id
                                            ? 'bg-orange-300 text-white border-orange-300'
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                            }`}
                                    >
                                        {plan.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-xl font-bold mb-4">Resumen de la Orden</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-2 border-b">
                                <p className="font-semibold text-gray-700">Plan: {selectedPlan.name}</p>
                                <p className="font-bold text-gray-900">${selectedPlan.price}</p>
                            </div>
                            <div className="py-2 border-t mt-4 flex justify-between items-center text-lg font-bold">
                                <span>Subtotal</span>
                                <span>${finalPrice}</span>
                            </div>
                            <div className="mt-4">
                                <PayPalScriptProvider options={{
                                    clientId: paypalClientId,
                                    currency: "MXN",
                                    intent: "capture",
                                    locale: "es_MX"
                                }}>
                                    <PayPalButtons
                                        style={{ layout: 'vertical', color: 'blue', shape: 'pill', label: 'pay' }}
                                        createOrder={(data, actions) => {
                                            const token = getAuthToken();
                                            return fetch('/api/payments/create', {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': `Bearer ${token}`,
                                                },
                                                body: JSON.stringify({
                                                    plan_id: selectedPlan.id,
                                                    discount_code: discountCode,
                                                })
                                            })
                                            .then(response => response.json())
                                            .then(order => order.id);
                                        }}
                                        onApprove={(data, actions) => {
                                            const token = getAuthToken();
                                            return fetch('/api/payments/complete', {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': `Bearer ${token}`,
                                                },
                                                body: JSON.stringify({ orderID: data.orderID })
                                            })
                                            .then(response => response.json())
                                            .then(orderData => {
                                                if (orderData.status === 'success') {
                                                    setPaymentStatus('success');
                                                } else {
                                                    setPaymentStatus('error');
                                                    console.error('Error del backend al completar el pago:', orderData.error);
                                                    alert('Error al completar el pago. Intenta de nuevo.');
                                                }
                                            });
                                        }}
                                    />
                                </PayPalScriptProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default PaymentPage;