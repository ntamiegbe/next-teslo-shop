"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';

import { useCartStore } from "@/store";
import { currencyFormat } from '@/utils';

export const OrderComponent = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    specialInstructions: ''
  });

  const { itemsInCart, subTotal, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );
  const cart = useCartStore(state => state.cart);
  const clearCart = useCartStore(state => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleInputChange = (e:any) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const sendWhatsAppMessage = (orderDetails: any) => {
    const phoneNumber = '+2348087081503'; // Replace with the shop owner's number
    const message = encodeURIComponent(orderDetails);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const onPlaceOrder = async (e: any) => {
    e.preventDefault();
    setIsPlacingOrder(true);

    const productsToOrder = cart.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      title: product.title,
      price: product.price
    }));

    const orderDetails = `
New Order:

Customer Information:
Name: ${customerInfo.name}
Email: ${customerInfo.email}
Phone: ${customerInfo.phone}
Address: ${customerInfo.address}
Special Instructions: ${customerInfo.specialInstructions}

Order Summary:
${productsToOrder.map(product => `- ${product.title} (x${product.quantity}) - ₦${product.price * product.quantity}`).join('\n')}

Total Items: ${itemsInCart}
Subtotal: ₦${subTotal}
Total: ₦${total}
    `;

    sendWhatsAppMessage(orderDetails);
    clearCart();
    setShowForm(false);
    setIsPlacingOrder(false);
    // You might want to redirect the user or show a success message here
  };

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2">Order Summary</h2>

      {cart.map((product) => (
        <div key={`${product.slug}`} className="flex mb-5">
          <Image
            src={`${product.image}`}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div>
            <span>
              {product.title} ({product.quantity})
            </span>
            <p className="font-bold">₦{product.price * product.quantity}</p>
          </div>
        </div>
      ))}

      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <div className="grid grid-cols-2">
        <span>No. of products</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 item" : `${itemsInCart} items`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">₦{subTotal}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">
          ₦{total}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="text-red-500">{errorMessage}</p>

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            Place Order
          </button>
        ) : (
          <form onSubmit={onPlaceOrder}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={customerInfo.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={customerInfo.email}
              onChange={handleInputChange}
              required
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={customerInfo.phone}
              onChange={handleInputChange}
              required
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={customerInfo.address}
              onChange={handleInputChange}
              required
              className="w-full p-2 mb-2 border rounded"
            />
            <textarea
              name="specialInstructions"
              placeholder="Special Delivery Instructions"
              value={customerInfo.specialInstructions}
              onChange={handleInputChange}
              className="w-full p-2 mb-2 border rounded"
            ></textarea>
            <button
              type="submit"
              className={
                clsx({
                  'btn-primary': !isPlacingOrder,
                  'btn-disabled': isPlacingOrder
                })
              }
            >
              {isPlacingOrder ? 'Placing Order...' : 'Confirm Order'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};