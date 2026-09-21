import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Award,
  Package,
  Clock,
  ShieldCheck,
  LogOut,
  ChevronRight,
  ShoppingBag,
  CheckCircle2,
  Truck,
  RotateCcw,
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  Phone,
  MapPin,
  Edit3,
  Check,
  Building,
  Headphones,
} from 'lucide-react';
import { UserProfile, Order, Product } from '../types';

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  orders: Order[];
  onLogin: (name: string, email: string) => void;
  onLogout: () => void;
  onUpdateProfile?: (updated: { name: string; phone: string; address: string }) => void;
  onUpdateOrderAddress?: (orderId: string, newAddress: string, newPhone?: string, newName?: string) => void;
  onSelectProduct: (product: Product) => void;
  onReorder: (order: Order) => void;
  onOpenSupport?: () => void;
  initialTab?: 'orders' | 'profile';
}

export const AccountDrawer: React.FC<AccountDrawerProps> = ({
  isOpen,
  onClose,
  user,
  orders,
  onLogin,
  onLogout,
  onUpdateProfile,
  onUpdateOrderAddress,
  onSelectProduct,
  onReorder,
  onOpenSupport,
  initialTab = 'orders',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'profile'>(initialTab);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'processing' | 'shipping' | 'delivered'>('all');
  const [authError, setAuthError] = useState('');

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Order Address Edit State (for pending/processing orders)
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [orderNewAddress, setOrderNewAddress] = useState('');
  const [orderNewPhone, setOrderNewPhone] = useState('');
  const [orderNewName, setOrderNewName] = useState('');

  // Sync state whenever user changes or modal opens
  useEffect(() => {
    if (user) {
      setEditName(user.name || '');
      setEditPhone(user.phone || '0908 123 489');
      setEditAddress(
        user.address ||
          'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh'
      );
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleLoginFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setAuthError('Vui lòng nhập địa chỉ email');
      return;
    }
    const namePart = loginEmail.split('@')[0];
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    onLogin(formattedName, loginEmail.trim());
    setAuthError('');
  };

  const handleRegisterFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName.trim()) {
      setAuthError('Vui lòng nhập họ và tên');
      return;
    }
    if (!registerEmail.trim()) {
      setAuthError('Vui lòng nhập địa chỉ email');
      return;
    }
    onLogin(registerName.trim(), registerEmail.trim());
    setAuthError('');
  };

  const handleQuickLogin = () => {
    onLogin('Phương Anh', 'vophuonganh054@gmail.com');
    setAuthError('');
  };

  const handleSaveProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      alert('Vui lòng nhập họ tên người mua');
      return;
    }
    if (!editPhone.trim()) {
      alert('Vui lòng nhập số điện thoại');
      return;
    }
    if (!editAddress.trim()) {
      alert('Vui lòng nhập địa chỉ giao hàng');
      return;
    }

    if (onUpdateProfile) {
      onUpdateProfile({
        name: editName.trim(),
        phone: editPhone.trim(),
        address: editAddress.trim(),
      });
    }

    setIsEditingProfile(false);
    setSaveSuccessMsg('Đã cập nhật thông tin người mua và địa chỉ giao hàng thành công!');
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

  const handleSaveOrderAddress = (orderId: string) => {
    if (!orderNewAddress.trim()) {
      alert('Vui lòng nhập địa chỉ giao hàng mới');
      return;
    }
    if (onUpdateOrderAddress) {
      onUpdateOrderAddress(
        orderId,
        orderNewAddress.trim(),
        orderNewPhone.trim() || undefined,
        orderNewName.trim() || undefined
      );
    }
    setEditingOrderId(null);
  };

  const filteredOrders = orders.filter((order) => {
    if (orderStatusFilter === 'all') return true;
    return order.status === orderStatusFilter;
  });

  const ADDRESS_PRESETS = [
    'Tòa nhà Landmark 81, 720A Điện Biên Phủ, P. 22, Bình Thạnh, TP. Hồ Chí Minh',
    'Keangnam Landmark 72, Phạm Hùng, Mễ Trì, Nam Từ Liêm, Hà Nội',
    'Saigon Centre, 65 Lê Lợi, Bến Nghé, Quận 1, TP. Hồ Chí Minh',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#fcf9f4] shadow-2xl h-full flex flex-col z-10">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#202022]/10 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-[#74584d]">✦</span>
            <h3 className="font-serif text-lg font-normal text-[#1c1c19]">
              {user ? 'Tài Khoản Thành Viên ALPS' : 'Đăng Nhập / Đăng Ký'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#77767b] hover:text-[#1c1c19] rounded-full hover:bg-[#f0ede9] transition-colors"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation when logged in or viewing orders */}
        {user ? (
          <div className="bg-white px-4 pt-2 border-b border-[#202022]/8 flex space-x-6">
            <button
              onClick={() => {
                setActiveSubTab('orders');
                setIsEditingProfile(false);
              }}
              className={`pb-3 text-xs font-medium tracking-wider uppercase transition-all relative ${
                activeSubTab === 'orders'
                  ? 'text-[#1c1c19] font-semibold'
                  : 'text-[#77767b] hover:text-[#1c1c19]'
              }`}
            >
              <span>Danh Mục Đã Mua</span>
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-[#f0ede9] text-[#1c1c19]">
                {orders.length}
              </span>
              {activeSubTab === 'orders' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#74584d]" />
              )}
            </button>

            <button
              onClick={() => setActiveSubTab('profile')}
              className={`pb-3 text-xs font-medium tracking-wider uppercase transition-all relative ${
                activeSubTab === 'profile'
                  ? 'text-[#1c1c19] font-semibold'
                  : 'text-[#77767b] hover:text-[#1c1c19]'
              }`}
            >
              <span>Hồ Sơ & Địa Chỉ Giao Hàng</span>
              {activeSubTab === 'profile' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#74584d]" />
              )}
            </button>
          </div>
        ) : null}

        {/* Body Container */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-5 space-y-4">
          {saveSuccessMsg && (
            <div className="bg-[#8a9a86]/20 border border-[#8a9a86]/40 text-[#2f4a2b] px-4 py-2.5 rounded-2xl text-xs flex items-center space-x-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#3d5a39]" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}

          {!user ? (
            /* --- LOGGED OUT STATE: LOGIN & REGISTRATION --- */
            <div className="space-y-4">
              <div className="bg-white rounded-3xl p-5 border border-[#202022]/6 shadow-xs text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#f6f3ee] text-[#74584d] flex items-center justify-center mx-auto mb-2 border border-[#ebe8e3]">
                  <User className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h4 className="font-serif text-lg font-normal text-[#1c1c19]">
                  Alps Pure Privileges
                </h4>
                <p className="text-xs text-[#77767b] max-w-xs mx-auto">
                  Đăng nhập để theo dõi danh mục đã mua, lưu địa chỉ giao hàng và đổi thông tin nhận hàng nhanh chóng.
                </p>

                {/* Auth Mode Switcher */}
                <div className="flex bg-[#f6f3ee] rounded-full p-1 border border-[#ebe8e3] mt-3">
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setAuthError('');
                    }}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all ${
                      authMode === 'login'
                        ? 'bg-white text-[#1c1c19] shadow-xs'
                        : 'text-[#77767b] hover:text-[#1c1c19]'
                    }`}
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode('register');
                      setAuthError('');
                    }}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all ${
                      authMode === 'register'
                        ? 'bg-white text-[#1c1c19] shadow-xs'
                        : 'text-[#77767b] hover:text-[#1c1c19]'
                    }`}
                  >
                    Tạo tài khoản
                  </button>
                </div>
              </div>

              {/* Login Form */}
              {authMode === 'login' ? (
                <form
                  onSubmit={handleLoginFormSubmit}
                  className="bg-white rounded-3xl p-5 border border-[#202022]/6 shadow-xs space-y-3.5"
                >
                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      Email hoặc Số điện thoại
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type="text"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="vophuonganh054@gmail.com"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19]"
                      />
                    </div>
                  </div>

                  {authError && (
                    <p className="text-[11px] text-[#ba1a1a]">{authError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#202022] hover:bg-black text-white text-xs font-semibold tracking-wider rounded-full shadow-md transition-all active:scale-98 mt-2"
                  >
                    ĐĂNG NHẬP NGAY
                  </button>

                  {/* 1-click Quick Login Button */}
                  <div className="pt-2 border-t border-[#f0ede9]">
                    <button
                      type="button"
                      onClick={handleQuickLogin}
                      className="w-full py-2.5 bg-[#f6f3ee] hover:bg-[#f0ede9] text-[#74584d] text-xs font-medium rounded-full transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Đăng nhập nhanh (Tài khoản mẫu Phương Anh)</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Register Form */
                <form
                  onSubmit={handleRegisterFormSubmit}
                  className="bg-white rounded-3xl p-5 border border-[#202022]/6 shadow-xs space-y-3.5"
                >
                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      Họ và tên người mua
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type="text"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        placeholder="Nguyễn Phương Anh"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      Địa chỉ Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type="email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        placeholder="phuonganh@example.com"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19]"
                      />
                    </div>
                  </div>

                  {authError && (
                    <p className="text-[11px] text-[#ba1a1a]">{authError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#202022] hover:bg-black text-white text-xs font-semibold tracking-wider rounded-full shadow-md transition-all active:scale-98 mt-2"
                  >
                    TẠO TÀI KHOẢN MỚI
                  </button>
                </form>
              )}

              {orders.length > 0 && (
                <div className="bg-[#f0ede9] rounded-2xl p-4 text-xs space-y-2 border border-[#ebe8e3]">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#1c1c19]">
                      Đơn hàng đã đặt ({orders.length} đơn)
                    </span>
                    <button
                      onClick={handleQuickLogin}
                      className="text-[#74584d] font-semibold hover:underline"
                    >
                      Đăng nhập để lưu
                    </button>
                  </div>
                  <p className="text-[#77767b] text-[11px]">
                    Bạn vừa thực hiện đơn hàng. Hãy đăng nhập để lưu trữ lịch sử và quản lý địa chỉ giao hàng.
                  </p>
                </div>
              )}
            </div>
          ) : activeSubTab === 'orders' ? (
            /* --- TAB 1: DANH MỤC ĐÃ MUA (ORDER HISTORY) --- */
            <div className="space-y-3.5">
              {/* Filter Pills */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                {[
                  { id: 'all', label: 'TẤT CẢ' },
                  { id: 'processing', label: 'ĐANG XỬ LÝ' },
                  { id: 'shipping', label: 'ĐANG GIAO' },
                  { id: 'delivered', label: 'ĐÃ GIAO' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setOrderStatusFilter(tab.id as any)}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium tracking-wider whitespace-nowrap transition-all ${
                      orderStatusFilter === tab.id
                        ? 'bg-[#202022] text-white shadow-xs'
                        : 'bg-white text-[#46464a] border border-[#202022]/6 hover:bg-[#f6f3ee]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Order List */}
              {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 border border-[#202022]/6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#f6f3ee] text-[#77767b] flex items-center justify-center mx-auto">
                    <Package className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h4 className="font-serif text-base font-normal text-[#1c1c19]">
                    Chưa có đơn hàng nào
                  </h4>
                  <p className="text-xs text-[#77767b] max-w-xs mx-auto">
                    Khám phá ngay bộ sưu tập chăm sóc da thuần chay chuẩn Thụy Sĩ của ALPS.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-5 py-2 bg-[#202022] text-white text-xs font-semibold rounded-full hover:bg-black transition-colors"
                  >
                    Xem sản phẩm
                  </button>
                </div>
              ) : (
                filteredOrders.map((order) => {
                  const isDelivered = order.status === 'delivered' || order.status === 'completed';
                  const isShipping = order.status === 'shipping';
                  const isProcessing = order.status === 'processing';
                  const isEditingThisOrder = editingOrderId === order.id;

                  const currentRecipientName = order.buyerName || user?.name || 'Phương Anh';
                  const currentPhone = order.phone || user?.phone || '0908 123 489';
                  const currentAddress =
                    order.shippingAddress ||
                    user?.address ||
                    'Tòa nhà Landmark 81, 720A Điện Biên Phủ, P. 22, Bình Thạnh, TP. Hồ Chí Minh';

                  return (
                    <div
                      key={order.id}
                      className="bg-white rounded-3xl p-4 sm:p-5 border border-[#202022]/6 shadow-xs space-y-3 hover:shadow-md transition-shadow"
                    >
                      {/* Order Header */}
                      <div className="flex items-center justify-between border-b border-[#f0ede9] pb-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-serif text-sm font-semibold text-[#1c1c19]">
                              #{order.orderNumber}
                            </span>
                            <span className="text-[10px] text-[#77767b]">
                              • {order.createdAt}
                            </span>
                          </div>
                        </div>

                        {/* Status badge */}
                        <div
                          className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wider ${
                            isDelivered
                              ? 'bg-[#8a9a86]/15 text-[#3d5a39]'
                              : isShipping
                              ? 'bg-[#4a6b82]/15 text-[#2c4a60]'
                              : 'bg-[#d4974f]/15 text-[#855418]'
                          }`}
                        >
                          {isDelivered ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : isShipping ? (
                            <Truck className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          <span>{order.statusLabel}</span>
                        </div>
                      </div>

                      {/* Items in this order */}
                      <div className="space-y-2.5">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => {
                              onSelectProduct(item.product);
                              onClose();
                            }}
                            className="flex items-center space-x-3 cursor-pointer group hover:bg-[#fcf9f4] p-1.5 rounded-xl transition-colors"
                          >
                            <div className="w-12 h-12 rounded-xl bg-[#f6f3ee] overflow-hidden shrink-0 border border-[#202022]/8">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = item.product.fallbackImage;
                                }}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div className="min-w-0 flex-grow">
                              <h5 className="font-serif text-xs font-normal text-[#1c1c19] truncate group-hover:text-[#74584d] transition-colors">
                                {item.product.name}
                              </h5>
                              <div className="text-[10px] text-[#77767b] flex items-center space-x-2 mt-0.5">
                                <span>{item.product.capacity}</span>
                                <span>• SL: x{item.quantity}</span>
                              </div>
                            </div>
                            <div className="text-xs font-medium text-[#1c1c19] shrink-0 text-right">
                              {(item.unitPrice * item.quantity).toLocaleString('vi-VN')}₫
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Shipping & Recipient Details on each order */}
                      <div className="bg-[#fcf9f4] rounded-2xl p-3 border border-[#ebe8e3] text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1.5 text-[#1c1c19] font-medium text-[11px]">
                            <MapPin className="w-3.5 h-3.5 text-[#74584d]" />
                            <span>
                              {currentRecipientName} • {currentPhone}
                            </span>
                          </div>

                          {/* Allow changing delivery info for processing orders */}
                          {isProcessing && onUpdateOrderAddress && (
                            <button
                              onClick={() => {
                                if (isEditingThisOrder) {
                                  setEditingOrderId(null);
                                } else {
                                  setEditingOrderId(order.id);
                                  setOrderNewName(currentRecipientName);
                                  setOrderNewPhone(currentPhone);
                                  setOrderNewAddress(currentAddress);
                                }
                              }}
                              className="text-[10px] text-[#74584d] font-semibold hover:underline flex items-center space-x-1"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>{isEditingThisOrder ? 'Đóng' : 'Đổi địa chỉ'}</span>
                            </button>
                          )}
                        </div>

                        {!isEditingThisOrder ? (
                          <p className="text-[11px] text-[#77767b] pl-5 leading-relaxed">
                            {currentAddress}
                          </p>
                        ) : (
                          /* Inline Edit for Pending Order Delivery Info */
                          <div className="pt-2 border-t border-[#ebe8e3] space-y-2 mt-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div>
                                <label className="text-[10px] font-medium text-[#77767b] block mb-0.5">
                                  Tên người nhận
                                </label>
                                <input
                                  type="text"
                                  value={orderNewName}
                                  onChange={(e) => setOrderNewName(e.target.value)}
                                  className="w-full text-xs px-2.5 py-1.5 bg-white rounded-lg border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d]"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-medium text-[#77767b] block mb-0.5">
                                  Số điện thoại
                                </label>
                                <input
                                  type="text"
                                  value={orderNewPhone}
                                  onChange={(e) => setOrderNewPhone(e.target.value)}
                                  className="w-full text-xs px-2.5 py-1.5 bg-white rounded-lg border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d]"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-[#77767b] block mb-0.5">
                                Địa chỉ giao hàng mới
                              </label>
                              <textarea
                                rows={2}
                                value={orderNewAddress}
                                onChange={(e) => setOrderNewAddress(e.target.value)}
                                className="w-full text-xs px-2.5 py-1.5 bg-white rounded-lg border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d]"
                              />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => setEditingOrderId(null)}
                                className="px-3 py-1 bg-white text-[#77767b] border border-[#ebe8e3] rounded-full text-[11px]"
                              >
                                Hủy
                              </button>
                              <button
                                onClick={() => handleSaveOrderAddress(order.id)}
                                className="px-3 py-1 bg-[#202022] text-white rounded-full text-[11px] font-medium hover:bg-black"
                              >
                                Lưu địa chỉ đơn này
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Order Footer & Action */}
                      <div className="pt-3 border-t border-[#f0ede9] flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[11px] text-[#77767b] block">Tổng thanh toán</span>
                          <span className="font-serif text-base font-semibold text-[#1c1c19]">
                            {order.totalAmount.toLocaleString('vi-VN')}₫
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onReorder(order)}
                            className="inline-flex items-center space-x-1.5 bg-[#f6f3ee] hover:bg-[#f0ede9] text-[#1c1c19] px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors"
                            title="Thêm lại các sản phẩm này vào giỏ hàng"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-[#74584d]" />
                            <span>Mua lại</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              {/* Customer Care Banner in Orders Tab */}
              {onOpenSupport && (
                <div className="bg-[#fcf9f4] rounded-2xl p-4 border border-[#ebe8e3] text-xs space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 font-semibold text-[#74584d]">
                      <Headphones className="w-4 h-4" />
                      <span>Cần hỗ trợ tra cứu hoặc đổi thông tin đơn hàng?</span>
                    </div>
                    <span className="text-[10px] text-[#8a9a86] font-medium">1900 8899</span>
                  </div>
                  <p className="text-[11px] text-[#77767b] leading-relaxed">
                    Bạn có thể liên hệ trực tiếp với bộ phận Chăm Sóc Khách Hàng 24/7 để được hỗ trợ điều hướng vận chuyển, đổi địa chỉ hoặc tư vấn phác đồ sử dụng.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenSupport();
                    }}
                    className="w-full py-2 bg-white hover:bg-[#f6f3ee] text-[#1c1c19] text-xs font-semibold rounded-full border border-[#ebe8e3] transition-colors flex items-center justify-center space-x-1.5 shadow-2xs"
                  >
                    <Headphones className="w-3.5 h-3.5 text-[#74584d]" />
                    <span>LIÊN HỆ CHĂM SÓC KHÁCH HÀNG</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* --- TAB 2: HỒ SƠ & ĐẶC QUYỀN (PROFILE & EDIT FORM) --- */
            <div className="space-y-4">
              {/* User Profile Card */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#202022]/6 flex items-center justify-between shadow-xs">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#74584d] font-serif text-lg border border-[#ebe8e3] shrink-0">
                    {user.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif text-base font-normal text-[#1c1c19] truncate">
                      {user.name}
                    </h4>
                    <p className="text-xs text-[#77767b] truncate">{user.email}</p>
                    <div className="inline-flex items-center space-x-1 mt-1 text-[10px] text-[#74584d] bg-[#fed8c9]/40 px-2 py-0.5 rounded-full font-medium">
                      <Award className="w-3 h-3" />
                      <span>{user.tier}</span>
                    </div>
                  </div>
                </div>

                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="p-2 text-[#74584d] hover:bg-[#f6f3ee] rounded-full transition-colors shrink-0"
                    title="Chỉnh sửa thông tin"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Edit Mode vs Display Mode for Buyer Info & Shipping Address */}
              {isEditingProfile ? (
                <form
                  onSubmit={handleSaveProfileSubmit}
                  className="bg-white rounded-3xl p-5 border-2 border-[#74584d]/30 shadow-md space-y-4 animate-fadeIn"
                >
                  <div className="flex items-center justify-between border-b border-[#f0ede9] pb-3">
                    <div className="flex items-center space-x-2">
                      <Edit3 className="w-4 h-4 text-[#74584d]" />
                      <h5 className="font-serif text-sm font-semibold text-[#1c1c19]">
                        Thay Đổi Thông Tin Giao Hàng & Người Mua
                      </h5>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="text-xs text-[#77767b] hover:text-[#1c1c19]"
                    >
                      Hủy
                    </button>
                  </div>

                  {/* Buyer Name Input */}
                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      Họ và tên người mua / nhận hàng <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Ví dụ: Nguyễn Phương Anh"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19] font-medium"
                      />
                    </div>
                  </div>

                  {/* Phone Number Input */}
                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      Số điện thoại nhận hàng <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#77767b] absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        placeholder="Ví dụ: 0908 123 489"
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19] font-medium"
                      />
                    </div>
                  </div>

                  {/* Shipping Address Textarea */}
                  <div>
                    <label className="text-xs font-medium text-[#1c1c19] block mb-1">
                      Địa chỉ nhận hàng chi tiết <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        rows={3}
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                        className="w-full text-xs p-3 bg-[#fcf9f4] rounded-xl border border-[#ebe8e3] focus:outline-none focus:ring-1 focus:ring-[#74584d] text-[#1c1c19] leading-relaxed font-medium"
                      />
                    </div>
                  </div>

                  {/* Fast address presets */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-[#77767b] font-medium uppercase tracking-wider block">
                      Gợi ý địa chỉ nhanh:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {ADDRESS_PRESETS.map((preset, idx) => (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => setEditAddress(preset)}
                          className="text-[10px] px-2.5 py-1 bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#46464a] rounded-full transition-colors border border-[#ebe8e3] text-left"
                        >
                          + {preset.split(',')[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="flex-1 py-2.5 bg-[#f6f3ee] text-[#1c1c19] rounded-full text-xs font-medium hover:bg-[#ebe8e3] transition-colors"
                    >
                      HỦY BỎ
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-[#202022] hover:bg-black text-white rounded-full text-xs font-semibold tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center space-x-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>LƯU THÔNG TIN</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Saved Shipping Info Display Card with Edit Button */
                <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#202022]/6 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#f0ede9]">
                    <div className="flex items-center space-x-2 text-[#1c1c19] font-medium text-xs">
                      <MapPin className="w-4 h-4 text-[#74584d]" />
                      <span>Thông Tin Người Nhận & Địa Chỉ Mặc Định</span>
                    </div>
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="inline-flex items-center space-x-1 text-xs text-[#74584d] font-semibold hover:underline bg-[#fed8c9]/25 px-2.5 py-1 rounded-full"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Thay đổi</span>
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start justify-between">
                      <span className="text-[#77767b] text-[11px] w-24 shrink-0">Họ và tên:</span>
                      <span className="text-[#1c1c19] font-semibold text-right">{user.name}</span>
                    </div>

                    <div className="flex items-start justify-between">
                      <span className="text-[#77767b] text-[11px] w-24 shrink-0">Số điện thoại:</span>
                      <span className="text-[#1c1c19] font-medium text-right">
                        {user.phone || '0908 123 489'}
                      </span>
                    </div>

                    <div className="flex items-start justify-between">
                      <span className="text-[#77767b] text-[11px] w-24 shrink-0">Địa chỉ giao:</span>
                      <span className="text-[#46464a] text-right max-w-xs leading-relaxed">
                        {user.address ||
                          'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-2xl p-3 border border-[#202022]/6 text-center">
                  <span className="text-[10px] text-[#77767b] uppercase tracking-wider block">
                    ĐIỂM TÍCH LŨY
                  </span>
                  <span className="font-serif text-xl text-[#1c1c19] font-medium mt-0.5 block">
                    {user.points.toLocaleString('vi-VN')}
                  </span>
                  <span className="text-[10px] text-[#8a9a86]">
                    Đổi {(user.points * 100).toLocaleString('vi-VN')}₫ ưu đãi
                  </span>
                </div>
                <div className="bg-white rounded-2xl p-3 border border-[#202022]/6 text-center">
                  <span className="text-[10px] text-[#77767b] uppercase tracking-wider block">
                    ĐƠN ĐÃ HOÀN TẤT
                  </span>
                  <span className="font-serif text-xl text-[#74584d] font-medium mt-0.5 block">
                    {orders.length} đơn
                  </span>
                  <span className="text-[10px] text-[#77767b]">Thành viên VIP</span>
                </div>
              </div>

              {/* Quality Guarantee note */}
              <div className="bg-[#f0ede9] rounded-2xl p-4 text-xs text-[#46464a] leading-relaxed border border-[#ebe8e3]">
                <p className="font-serif font-medium text-[#1c1c19] mb-1">
                  Cam kết giao hàng & bảo chứng Thụy Sĩ:
                </p>
                Đơn hàng sẽ được chuyển tới đúng địa chỉ của bạn trong 24-48 giờ với quy chuẩn vận chuyển bảo mật, miễn phí đổi trả trong 30 ngày nếu phát hiện bất kỳ kích ứng nào.
              </div>

              {/* Customer Care Banner */}
              {onOpenSupport && (
                <div className="bg-white rounded-2xl p-4 border border-[#202022]/8 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 font-semibold text-[#74584d] text-xs">
                      <Headphones className="w-4 h-4" />
                      <span>Hỗ Trợ & Tư Vấn Da Liễu 24/7</span>
                    </div>
                    <span className="text-[10px] text-[#8a9a86] font-medium">1900 8899</span>
                  </div>
                  <p className="text-[11px] text-[#77767b] leading-relaxed">
                    Đội ngũ bác sĩ và chuyên viên da liễu Thụy Sĩ luôn sẵn sàng tư vấn phác đồ sử dụng hoặc hỗ trợ đổi trả hàng 30 ngày.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenSupport();
                    }}
                    className="w-full py-2 bg-[#f6f3ee] hover:bg-[#ebe8e3] text-[#1c1c19] text-xs font-semibold rounded-full border border-[#ebe8e3] transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <Headphones className="w-3.5 h-3.5 text-[#74584d]" />
                    <span>MỞ TRUNG TÂM CHĂM SÓC KHÁCH HÀNG</span>
                  </button>
                </div>
              )}

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="w-full py-3 bg-white hover:bg-[#fff5f5] text-[#ba1a1a] border border-[#ba1a1a]/20 rounded-full text-xs font-semibold tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-2xs"
              >
                <LogOut className="w-4 h-4" />
                <span>ĐĂNG XUẤT TÀI KHOẢN</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
