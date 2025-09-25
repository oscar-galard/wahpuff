import React, { useState, useEffect } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from 'sweetalert2';

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
    const [finalPrice, setFinalPrice] = useState(selectedPlan?.price || 0);

    useEffect(() => {
        setFinalPrice(selectedPlan?.price || 0);
    }, [selectedPlan]);

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
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            value: finalPrice.toString(),
                                                        },
                                                    },
                                                ],
                                            });
                                        }}
                                        onApprove={(data, actions) => {
                                            return actions.order.capture().then(() => {
                                                Swal.fire({
                                                    title: '¡Pago completado con éxito!',
                                                    text: 'Tu suscripción ha sido activada. Serás redirigido a tu dashboard.',
                                                    icon: 'success',
                                                    confirmButtonColor: '#3085d6',
                                                    confirmButtonText: 'Aceptar'
                                                }).then(() => {
                                                    router.visit(route('dashboard'));
                                                });
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
