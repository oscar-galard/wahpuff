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
    const [discountCode, setDiscountCode] = useState('');
    const [discountApplied, setDiscountApplied] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [originalPrice, setOriginalPrice] = useState(selectedPlan?.price || 0);

    useEffect(() => {
        // Update final price when selected plan changes
        setOriginalPrice(selectedPlan?.price || 0);
        if (!discountApplied) {
            setFinalPrice(selectedPlan?.price || 0);
        }
    }, [selectedPlan]);

    const applyDiscount = async () => {
        if (!discountCode.trim()) {
            Swal.fire({
                title: 'Código inválido',
                text: 'Por favor ingresa un código de descuento',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        try {
            const response = await fetch(route('discount-code.validate'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
                body: JSON.stringify({
                    code: discountCode,
                    plan_id: selectedPlan.id,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setFinalPrice(parseFloat(data.discounted_price));
                setDiscountAmount(parseFloat(data.discount_amount));
                setDiscountApplied(true);
                
                Swal.fire({
                    title: '¡Descuento aplicado!',
                    text: `Has obtenido un descuento de ${data.discount_amount} MXN`,
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Aceptar'
                });
            } else {
                Swal.fire({
                    title: 'Código inválido',
                    text: data.message || 'El código de descuento no es válido',
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Aceptar'
                });
            }
        } catch (error) {
            console.error('Error applying discount:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al aplicar el descuento. Por favor intenta de nuevo.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const removeDiscount = () => {
        setFinalPrice(originalPrice);
        setDiscountAmount(0);
        setDiscountApplied(false);
        setDiscountCode('');
    };

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
                                        onClick={() => {
                                            if (!discountApplied) {
                                                setSelectedPlan(plan);
                                            } else {
                                                // If discount is applied, we need to re-apply it with the new plan
                                                setSelectedPlan(plan);
                                                setOriginalPrice(plan.price);
                                                setDiscountApplied(false);
                                                setDiscountCode('');
                                                setFinalPrice(plan.price);
                                            }
                                        }}
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
                        
                        {/* Discount code section */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h3 className="font-semibold mb-2">Código de Descuento</h3>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={discountCode}
                                    onChange={(e) => setDiscountCode(e.target.value)}
                                    placeholder="Ingresa tu código"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    disabled={discountApplied}
                                />
                                {discountApplied ? (
                                    <button
                                        type="button"
                                        onClick={removeDiscount}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        Quitar
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={applyDiscount}
                                        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                                    >
                                        Aplicar
                                    </button>
                                )}
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
                            
                            {/* Show original price if discount is applied */}
                            {discountApplied && (
                                <div className="flex justify-between items-center pb-2 border-b text-gray-500">
                                    <p className="text-sm">Precio original</p>
                                    <p className="line-through">${originalPrice}</p>
                                </div>
                            )}
                            
                            {/* Show discount amount if applied */}
                            {discountApplied && (
                                <div className="flex justify-between items-center pb-2 border-b text-green-600">
                                    <p className="font-semibold">Descuento aplicado</p>
                                    <p className="font-semibold">-${discountAmount}</p>
                                </div>
                            )}
                            
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
                                                        description: `Pago por plan ${selectedPlan.name}`,
                                                        amount: {
                                                            currency_code: "MXN",
                                                            value: finalPrice.toString(),
                                                            breakdown: discountApplied ? {
                                                                item_total: {
                                                                    currency_code: "MXN",
                                                                    value: finalPrice.toString()
                                                                }
                                                            } : undefined
                                                        },
                                                    },
                                                ],
                                            });
                                        }}
                                        onApprove={(data, actions) => {
                                            return actions.order.capture().then(() => {
                                                // Mark the discount code as used if applicable
                                                if (discountApplied && discountCode) {
                                                    fetch(route('discount-code.use'), {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                                                        },
                                                        body: JSON.stringify({
                                                            code: discountCode,
                                                        }),
                                                    }).catch(error => {
                                                        console.error('Error marking discount as used:', error);
                                                    });
                                                }
                                                
                                                Swal.fire({
                                                    title: '¡Pago completado con éxito!',
                                                    text: 'Tu suscripción ha sido activada. Serás redirigido a tus cursos.',
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
