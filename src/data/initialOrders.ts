import { Order } from '../types';
import { PRODUCTS } from './products';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-178970001',
    orderNumber: 'ALPS-889214',
    createdAt: '16/09/2026 • 14:32',
    status: 'delivered',
    statusLabel: 'Đã giao thành công',
    totalAmount: 670000,
    buyerName: 'Phương Anh',
    phone: '0908 123 489',
    shippingAddress: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, P. 22, Bình Thạnh, TP. Hồ Chí Minh',
    paymentMethod: 'Thanh toán trực tuyến (Thẻ Visa)',
    items: [
      {
        product: PRODUCTS.find((p) => p.id === 'serum-radiance') || PRODUCTS[2],
        quantity: 1,
        unitPrice: 390000,
      },
      {
        product: PRODUCTS.find((p) => p.id === 'cleanser-gentle-purifying') || PRODUCTS[0],
        quantity: 1,
        unitPrice: 280000,
      },
    ],
  },
  {
    id: 'ord-178960002',
    orderNumber: 'ALPS-764109',
    createdAt: '02/09/2026 • 09:15',
    status: 'delivered',
    statusLabel: 'Đã giao thành công',
    totalAmount: 395000,
    buyerName: 'Phương Anh',
    phone: '0908 123 489',
    shippingAddress: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, P. 22, Bình Thạnh, TP. Hồ Chí Minh',
    paymentMethod: 'Thanh toán khi nhận hàng (COD)',
    items: [
      {
        product: PRODUCTS.find((p) => p.id === 'cream-regenerating') || PRODUCTS[3],
        quantity: 1,
        unitPrice: 395000,
      },
    ],
  },
];
