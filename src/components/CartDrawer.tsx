import React, { useState, useEffect } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Check, Tag, MapPin, Edit3, Phone, User, Headphones } from 'lucide-react';
import { CartItem, UserProfile } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  user: UserProfile | null;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckoutSuccess: (recipientInfo?: { buyerName: string; phone: string; address: string }) => void;
  onOpenCheckout?: () => void;
  onUpdateProfile?: (updated: { name: string; phone: string; address: string }) => void;
  onOpenSupport?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  user,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutSuccess,
  onOpenCheckout,
  onUpdateProfile,
  onOpenSupport,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Recipient and delivery address state
  const [buyerName, setBuyerName] = useState(user?.name || 'Phương Anh');
  const [phone, setPhone] = useState(user?.phone || '0908 123 489');
  const [address, setAddress] = useState(
    user?.address ||
      'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh'
  );
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {
    if (user) {
      setBuyerName(user.name || 'Phương Anh');
      setPhone(user.phone || '0908 123 489');
      setAddress(
        user.address ||
          'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh'
      );
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 500000;
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 30000;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const amountNeededForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShipPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'ALPS2025' || code === 'ALPS10') {
      setDiscountPercent(10);
      setPromoMessage({ text: `Áp dụng thành công mã ${code} (-10%)`, isError: false });
    } else {
      setPromoMessage({ text: 'Mã giảm giá không hợp lệ. Thử: ALPS2025', isError: true });
    }
  };

  const handleCheckout = () => {
    const finalBuyer = buyerName.trim() || user?.name || 'Phương Anh';
    const finalPhone = phone.trim() || user?.phone || '0908 123 489';
    const finalAddress =
      address.trim() ||
      user?.address ||
      'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh';

    // Also sync to profile if user is logged in
    if (onUpdateProfile && (finalBuyer !== user?.name || finalPhone !== user?.phone || finalAddress !== user?.address)) {
      onUpdateProfile({
        name: finalBuyer,
        phone: finalPhone,
        address: finalAddress,
      });
    }

    if (onOpenCheckout) {
      onClose();
      onOpenCheckout();
    } else {
      onCheckoutSuccess({
        buyerName: finalBuyer,
        phone: finalPhone,
        address: finalAddress,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#fcf9f4] shadow-2xl h-full flex flex-col z-10">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#202022]/10 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#1c1c19]" />
            <h3 className="font-serif text-lg font-normal text-[#1c1c19]">
              Giỏ Hàng ({items.reduce((sum, item) => sum + item.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#77767b] hover:text-[#1c1c19] rounded-full hover:bg-[#f0ede9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-[#f0ede9] px-4 py-2.5 border-b border-[#202022]/6">
          <div className="flex justify-between text-[11px] text-[#46464a] mb-1.5">
            <span>
              {amountNeededForFreeShip === 0 ? (
                <span className="text-[#8a9a86] font-medium flex items-center">
                  <Check className="w-3.5 h-3.5 mr-1" /> Bạn được MIỄN PHÍ vận chuyển
                </span>
              ) : (
                <span>
                  Mua thêm{' '}
                  <strong className="text-[#1c1c19]">
                    {amountNeededForFreeShip.toLocaleString('vi-VN')}₫
                  </strong>{' '}
                  để được Free Ship
                </span>
              )}
            </span>
            <span className="font-medium">{freeShipPercent}%</span>
          </div>
          <div className="w-full bg-white rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#74584d] h-full transition-all duration-300"
              style={{ width: `${freeShipPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-5 space-y-3.5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#f0ede9] flex items-center justify-center text-[#77767b]">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <p className="font-serif text-base font-normal text-[#1c1c19]">
                Giỏ hàng của bạn đang trống
              </p>
              <p className="text-xs text-[#77767b] max-w-xs leading-relaxed">
                Hãy lựa chọn các tinh chất thuần chay Thụy Sĩ để bắt đầu chu trình chăm sóc da.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 bg-[#202022] text-white text-xs font-semibold rounded-full hover:bg-[#08080a] transition-colors"
              >
                KHÁM PHÁ SẢN PHẨM
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center space-x-3.5 bg-white p-3.5 rounded-2xl border border-[#202022]/6 shadow-2xs"
              >
                <div className="w-16 h-16 rounded-xl bg-[#f6f3ee] overflow-hidden shrink-0 border border-[#202022]/6">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = item.product.fallbackImage;
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-grow min-w-0 space-y-1">
                  <div className="flex items-start justify-between">
                    <h4 className="font-serif text-xs font-normal text-[#1c1c19] truncate pr-2">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-[#77767b] hover:text-[#ba1a1a] p-1 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[10px] text-[#77767b]">{item.product.capacity}</p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-semibold text-[#1c1c19]">
                      {(item.product.price * item.quantity).toLocaleString('vi-VN')}₫
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-2 bg-[#f6f3ee] rounded-full px-2 py-0.5 border border-[#ebe8e3]">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="text-xs text-[#46464a] px-1 hover:text-[#1c1c19]"
                      >
                        -
                      </button>
                      <span className="text-xs font-medium text-[#1c1c19] w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="text-xs text-[#46464a] px-1 hover:text-[#1c1c19]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#202022]/10 space-y-3">
            {/* Promo code */}
            <form onSubmit={applyPromo} className="flex space-x-2">
              <div className="relative flex-grow">
                <Tag className="w-3.5 h-3.5 text-[#77767b] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Mã ưu đãi (thử ALPS2025)"
                  className="w-full text-xs pl-8 pr-3 py-2 bg-[#f6f3ee] rounded-xl border border-[#ebe8e3] uppercase focus:outline-none focus:ring-1 focus:ring-[#74584d]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#202022] hover:bg-[#08080a] text-white text-xs px-3.5 py-2 rounded-xl font-medium tracking-wider"
              >
                Áp dụng
              </button>
            </form>

            {promoMessage && (
              <p
                className={`text-[11px] ${
                  promoMessage.isError ? 'text-[#ba1a1a]' : 'text-[#8a9a86]'
                }`}
              >
                {promoMessage.text}
              </p>
            )}

            {/* Recipient & Delivery Address Card */}
            <div className="bg-[#fcf9f4] rounded-2xl p-3 border border-[#ebe8e3] text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-[#1c1c19] font-medium text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-[#74584d]" />
                  <span>Địa chỉ nhận hàng:</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="text-[#74584d] hover:underline font-semibold text-[11px] flex items-center space-x-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>{isEditingAddress ? 'Thu gọn' : 'Đổi thông tin'}</span>
                </button>
              </div>

              {!isEditingAddress ? (
                <div className="text-[11px] text-[#46464a] space-y-0.5 pl-5">
                  <div className="font-medium text-[#1c1c19]">
                    {buyerName} • {phone}
                  </div>
                  <div className="text-[#77767b] leading-relaxed line-clamp-2">
                    {address}
                  </div>
                </div>
              ) : (
                <div className="space-y-2 pt-1 border-t border-[#ebe8e3] animate-fadeIn">
                  <div>
                    <label className="text-[10px] font-medium text-[#77767b] block mb-0.5">
                      Tên người mua / nhận hàng
                    </label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="Họ và tên người nhận"
                      className="w-full text-xs px-2.5 py-1.5 bg-white rounded-lg border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-medium text-[#77767b] block mb-0.5">
                      Số điện thoại nhận hàng
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0908 123 489"
                      className="w-full text-xs px-2.5 py-1.5 bg-white rounded-lg border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-medium text-[#77767b] block mb-0.5">
                      Địa chỉ nhận hàng chi tiết
                    </label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Số nhà, tên đường, phường, quận, thành phố"
                      className="w-full text-xs px-2.5 py-1.5 bg-white rounded-lg border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19]"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setAddress(
                          'Tòa nhà Landmark 81, 720A Điện Biên Phủ, P. 22, Bình Thạnh, TP. Hồ Chí Minh'
                        );
                      }}
                      className="text-[10px] text-[#74584d] hover:underline"
                    >
                      Đặt lại mặc định
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (onUpdateProfile) {
                          onUpdateProfile({ name: buyerName, phone, address });
                        }
                        setIsEditingAddress(false);
                      }}
                      className="px-3 py-1 bg-[#202022] text-white rounded-full text-[10px] font-semibold tracking-wider hover:bg-black"
                    >
                      Xác nhận đổi
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#46464a] pt-1 border-t border-[#f0ede9]">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span className="font-medium text-[#1c1c19]">{subtotal.toLocaleString('vi-VN')}₫</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#74584d]">
                  <span>Ưu đãi (10%)</span>
                  <span>-{discountAmount.toLocaleString('vi-VN')}₫</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Vận chuyển</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-[#8a9a86] font-medium">Miễn phí</span>
                  ) : (
                    `${shippingFee.toLocaleString('vi-VN')}₫`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-serif font-semibold text-[#1c1c19] pt-1.5 border-t border-[#f0ede9]">
                <span>Tổng thanh toán</span>
                <span>{total.toLocaleString('vi-VN')}₫</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="cart-checkout-btn"
              onClick={handleCheckout}
              className="w-full py-3 bg-[#202022] hover:bg-[#08080a] text-white rounded-full text-xs font-semibold tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md active:scale-98"
            >
              <span>TIẾN HÀNH ĐẶT HÀNG</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Customer Care Hotline Hint */}
            <div className="pt-1 text-center">
              {onOpenSupport ? (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenSupport();
                  }}
                  className="inline-flex items-center space-x-1 text-[11px] text-[#77767b] hover:text-[#74584d] transition-colors"
                >
                  <Headphones className="w-3 h-3 text-[#74584d]" />
                  <span>Cần tư vấn da liễu trước khi mua? Liên hệ CSKH 24/7</span>
                </button>
              ) : (
                <span className="text-[11px] text-[#77767b]">
                  Hotline CSKH: <strong className="text-[#1c1c19]">1900 8899</strong> (Miễn phí)
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
