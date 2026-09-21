import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { INITIAL_ORDERS } from './data/initialOrders';
import { Product, CartItem, ActiveTab, ViewMode, Order, UserProfile } from './types';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { RitualCallout } from './components/RitualCallout';
import { CatalogSection } from './components/CatalogSection';
import { MinimalistPackagingDesign } from './components/MinimalistPackagingDesign';
import { BrandPhilosophy } from './components/BrandPhilosophy';
import { BottomNav } from './components/BottomNav';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { RitualModal } from './components/RitualModal';
import { CheckoutSuccessModal } from './components/CheckoutSuccessModal';
import { AccountDrawer } from './components/AccountDrawer';
import { CustomerSupportModal } from './components/CustomerSupportModal';
import { SupportFloatingButton } from './components/SupportFloatingButton';
import { CheckoutModal } from './components/CheckoutModal';
import { PoliciesModal, PolicyTabType } from './components/PoliciesModal';
import { Footer } from './components/Footer';
import { Smartphone, Monitor, Sparkles, Check } from 'lucide-react';

export default function App() {
  // Device view mode: 'desktop' | 'mobile' | 'responsive'
  const [viewMode, setViewMode] = useState<ViewMode>('responsive');

  // Navigation tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Cart State (initialize with 2 items to match the '2' badge in user screenshot Image 1)
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[2], // Alps Radiance Glow Serum
      quantity: 1,
    },
    {
      product: PRODUCTS[3], // Alps Regenerating Face Cream
      quantity: 1,
    },
  ]);

  // Wishlist State (initialize with serum and face cream saved)
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(
    new Set(['serum-radiance', 'cream-regenerating'])
  );

  // Dynamic User Profile State (Logged In / Logged Out)
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('alps_user_profile');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      name: 'Phương Anh',
      email: 'vophuonganh054@gmail.com',
      phone: '0908 123 489',
      address: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh',
      tier: 'Hội Viên Alps Pure Privileges',
      points: 1250,
      avatarInitials: 'PA',
      isLoggedIn: true,
    };
  });

  // Dynamic Order History State (Danh mục đã mua)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('alps_purchased_orders');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ORDERS;
  });

  // Persist User and Orders
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('alps_user_profile', JSON.stringify(user));
      } else {
        localStorage.removeItem('alps_user_profile');
      }
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('alps_purchased_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  // Modals and Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isRitualModalOpen, setIsRitualModalOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [accountInitialTab, setAccountInitialTab] = useState<'orders' | 'profile'>('orders');
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);
  const [policiesInitialTab, setPoliciesInitialTab] = useState<PolicyTabType>('returns');
  const [isCheckoutSuccessOpen, setIsCheckoutSuccessOpen] = useState(false);
  const [latestOrderNumber, setLatestOrderNumber] = useState('ALPS-89421');
  const [latestRecipient, setLatestRecipient] = useState<{
    name: string;
    phone: string;
    address: string;
  }>({
    name: 'Phương Anh',
    phone: '0908 123 489',
    address: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh',
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toast notification helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // User Actions: Login, Logout, Update Profile
  const handleLogin = (name: string, email: string) => {
    const initials = name
      .trim()
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(-2)
      .toUpperCase() || 'GA';

    const updatedUser: UserProfile = {
      name,
      email,
      phone: '0908 123 489',
      address: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh',
      tier: 'Hội Viên Alps Pure Privileges',
      points: 1250,
      avatarInitials: initials,
      isLoggedIn: true,
    };
    setUser(updatedUser);
    setLatestRecipient({
      name,
      phone: '0908 123 489',
      address: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh',
    });
    showToast(`Đăng nhập thành công! Chào mừng ${name}`);
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Đã đăng xuất tài khoản thành công');
  };

  const handleUpdateProfile = (updated: { name: string; phone: string; address: string }) => {
    setUser((prev) => {
      const initials = updated.name
        .trim()
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .join('')
        .slice(-2)
        .toUpperCase() || (prev ? prev.avatarInitials : 'PA');

      return {
        ...(prev || {
          email: 'vophuonganh054@gmail.com',
          tier: 'Hội Viên Alps Pure Privileges',
          points: 1250,
          isLoggedIn: true,
        }),
        name: updated.name,
        phone: updated.phone,
        address: updated.address,
        avatarInitials: initials,
      };
    });
    setLatestRecipient({
      name: updated.name,
      phone: updated.phone,
      address: updated.address,
    });
    showToast('Đã lưu thông tin người nhận và địa chỉ giao hàng!');
  };

  const handleUpdateOrderAddress = (orderId: string, newAddress: string, newPhone?: string, newName?: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            shippingAddress: newAddress,
            ...(newPhone ? { phone: newPhone } : {}),
            ...(newName ? { buyerName: newName } : {}),
          };
        }
        return order;
      })
    );
    showToast('Đã cập nhật thông tin giao hàng cho đơn hàng thành công!');
  };

  // Cart Actions
  const handleAddToCart = (product: Product, quantity = 1, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Đã thêm ${product.name} vào giỏ hàng`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleAddFullSetToCart = () => {
    PRODUCTS.forEach((product) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { product, quantity: 1 }];
      });
    });
    setIsCartOpen(true);
    showToast('Đã thêm trọn bộ Nghi thức 5 bước vào giỏ hàng!');
  };

  // Re-order past purchased order
  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      handleAddToCart(item.product, item.quantity);
    });
    setIsAccountOpen(false);
    setIsCartOpen(true);
    showToast(`Đã thêm ${order.items.length} sản phẩm từ đơn #${order.orderNumber} vào giỏ hàng`);
  };

  // BUY NOW Action: Immediately launches checkout modal with this product
  const handleBuyNow = (product: Product, quantity = 1, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCheckoutItems([{ product, quantity }]);
    setIsCheckoutOpen(true);
    showToast(`Chuyển đến thanh toán: ${product.name}`);
  };

  // Open checkout from cart
  const handleOpenCheckoutFromCart = () => {
    if (cart.length === 0) {
      showToast('Giỏ hàng của bạn đang trống.');
      return;
    }
    setCheckoutItems(cart);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Open Policies Modal
  const handleOpenPolicies = (tab: PolicyTabType = 'returns') => {
    setPoliciesInitialTab(tab);
    setIsPoliciesOpen(true);
  };

  // Checkout and place order dynamically from CheckoutModal
  const handleCompleteOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setLatestOrderNumber(order.orderNumber);
    setLatestRecipient({
      name: order.buyerName || user?.name || 'Phương Anh',
      phone: order.phone || user?.phone || '0908 123 489',
      address: order.shippingAddress || user?.address || 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh',
    });

    // If order was placed from entire cart, clear the cart
    const isFromCart =
      cart.length > 0 &&
      checkoutItems.length === cart.length &&
      checkoutItems.every((item, idx) => item.product.id === cart[idx]?.product.id);

    if (isFromCart) {
      setCart([]);
    }

    setIsCheckoutOpen(false);
    setIsCheckoutSuccessOpen(true);
    showToast(`Đặt hàng #${order.orderNumber} thành công!`);
  };

  // Checkout and place order dynamically (fallback from drawer)
  const handleCheckoutSuccess = (recipientInfo?: { buyerName: string; phone: string; address: string }) => {
    if (cart.length === 0) return;

    const buyerName = recipientInfo?.buyerName || user?.name || 'Phương Anh';
    const phone = recipientInfo?.phone || user?.phone || '0908 123 489';
    const shippingAddress =
      recipientInfo?.address ||
      user?.address ||
      'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh';

    setLatestRecipient({
      name: buyerName,
      phone,
      address: shippingAddress,
    });

    const newOrderNum = `ALPS-${Math.floor(100000 + Math.random() * 900000)}`;
    const subtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const finalAmount = subtotal >= 500000 ? subtotal : subtotal + 30000;

    const now = new Date();
    const formattedDate = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')} • ${now.getDate().toString().padStart(2, '0')}/${(
      now.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${now.getFullYear()}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNum,
      createdAt: formattedDate,
      status: 'processing',
      statusLabel: 'Đang chuẩn bị hàng',
      totalAmount: finalAmount,
      buyerName,
      phone,
      shippingAddress,
      paymentMethod: 'Thanh toán khi nhận hàng (COD)',
      items: cart.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        unitPrice: item.product.price,
      })),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrderNumber(newOrderNum);
    setCart([]);
    setIsCartOpen(false);
    setIsCheckoutSuccessOpen(true);
  };

  // Wishlist Actions
  const handleToggleWishlist = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast(`Đã xóa ${product.name} khỏi yêu thích`);
      } else {
        next.add(product.id);
        showToast(`Đã lưu ${product.name} vào yêu thích`);
      }
      return next;
    });
  };

  // Tab switcher
  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab === 'cart') {
      setIsCartOpen(true);
    } else if (tab === 'wishlist') {
      setIsWishlistOpen(true);
    } else if (tab === 'account') {
      setAccountInitialTab('orders');
      setIsAccountOpen(true);
    } else if (tab === 'routine') {
      setIsRitualModalOpen(true);
    }
  };

  const handleOpenPurchasedCategory = () => {
    setAccountInitialTab('orders');
    setIsAccountOpen(true);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.has(p.id));

  // Determine if we should wrap in simulated phone frame
  const isMobileSimulation = viewMode === 'mobile';

  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col font-sans">
      {/* Top Device Mode Toolbar for testing desktop vs phone views */}
      <div className="bg-[#1c1c19] text-[#fcf9f4] text-xs py-2 px-4 border-b border-[#31302d] flex items-center justify-between shadow-xs sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <span className="text-[#fed8c9]">✦</span>
          <span className="font-medium tracking-wide">
            Alps Skincare • Đa Màn Hình
          </span>
        </div>

        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <span className="text-[#77767b] text-[11px] hidden sm:inline mr-1">Chuyển chế độ xem:</span>
          <button
            id="view-mode-responsive-btn"
            onClick={() => setViewMode('responsive')}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
              viewMode === 'responsive'
                ? 'bg-[#ffffff] text-[#1c1c19] shadow-xs'
                : 'text-[#c7c6ca] hover:text-white bg-[#31302d]/60'
            }`}
          >
            Tự Động (Responsive)
          </button>
          <button
            id="view-mode-desktop-btn"
            onClick={() => setViewMode('desktop')}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all flex items-center space-x-1 ${
              viewMode === 'desktop'
                ? 'bg-[#ffffff] text-[#1c1c19] shadow-xs'
                : 'text-[#c7c6ca] hover:text-white bg-[#31302d]/60'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Máy Tính</span>
          </button>
          <button
            id="view-mode-mobile-btn"
            onClick={() => setViewMode('mobile')}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all flex items-center space-x-1 ${
              viewMode === 'mobile'
                ? 'bg-[#ffffff] text-[#1c1c19] shadow-xs'
                : 'text-[#c7c6ca] hover:text-white bg-[#31302d]/60'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Màn Hình Điện Thoại</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {isMobileSimulation ? (
        /* Mobile Simulator Container matching Image 1 exactly */
        <div className="flex-grow py-6 px-3 flex items-center justify-center bg-[#f0ede9]">
          <div className="w-full max-w-[420px] bg-[#fcf9f4] rounded-[2.5rem] shadow-2xl border-[10px] border-[#1c1c19] overflow-hidden flex flex-col relative min-h-[840px] max-h-[920px]">
            {/* Phone Speaker & Camera Notch */}
            <div className="bg-[#1c1c19] pt-2 pb-1 flex justify-center items-center z-50">
              <div className="w-20 h-4 bg-black rounded-full flex items-center justify-end px-3">
                <div className="w-2 h-2 rounded-full bg-[#31302d]" />
              </div>
            </div>

            {/* Simulated Phone Content Scroll Area */}
            <div className="overflow-y-auto flex-grow relative pb-20 scrollbar-none">
              <Header
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                cartCount={totalCartCount}
                wishlistCount={wishlistIds.size}
                onOpenCart={() => setIsCartOpen(true)}
                onOpenWishlist={() => setIsWishlistOpen(true)}
                activeTab={activeTab}
                onSelectTab={handleSelectTab}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                isMobileFrame={true}
                user={user}
                onOpenAccount={handleOpenPurchasedCategory}
                onOpenSupport={() => setIsSupportOpen(true)}
                onOpenPolicies={handleOpenPolicies}
              />

              <HeroBanner
                onExploreClick={() => {
                  const el = document.getElementById('catalog-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                isMobileFrame={true}
              />

              <RitualCallout
                onOpenRitual={() => setIsRitualModalOpen(true)}
                isMobileFrame={true}
              />

              <div id="catalog-section">
                <CatalogSection
                  products={PRODUCTS}
                  onSelectProduct={setSelectedProduct}
                  onAddToCart={(p, e) => handleAddToCart(p, 1, e)}
                  onBuyNow={(p, e) => handleBuyNow(p, 1, e)}
                  onToggleWishlist={handleToggleWishlist}
                  wishlistIds={wishlistIds}
                  searchQuery={searchQuery}
                  isMobileFrame={true}
                />
              </div>

              <MinimalistPackagingDesign
                onOpenCollection={() => {
                  const el = document.getElementById('catalog-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                isMobileFrame={true}
              />

              <BrandPhilosophy isMobileFrame={true} />

              <Footer
                isMobileFrame={true}
                onOpenSupport={() => setIsSupportOpen(true)}
                onOpenPolicies={handleOpenPolicies}
              />
            </div>

            {/* Floating CSKH button inside simulated mobile frame */}
            <SupportFloatingButton
              onOpenSupport={() => setIsSupportOpen(true)}
              isMobileFrame={true}
            />

            {/* Bottom Nav inside Phone Frame */}
            <div className="absolute bottom-0 left-0 right-0 z-40">
              <BottomNav
                activeTab={activeTab}
                onSelectTab={handleSelectTab}
                cartCount={totalCartCount}
                wishlistCount={wishlistIds.size}
                onOpenCart={() => setIsCartOpen(true)}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Full Layout (Desktop & Fluid Responsive Mode) */
        <div className="flex-grow flex flex-col">
          <Header
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            cartCount={totalCartCount}
            wishlistCount={wishlistIds.size}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenWishlist={() => setIsWishlistOpen(true)}
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isMobileFrame={false}
            user={user}
            onOpenAccount={handleOpenPurchasedCategory}
            onOpenSupport={() => setIsSupportOpen(true)}
            onOpenPolicies={handleOpenPolicies}
          />

          <main className="flex-grow pb-16 sm:pb-0">
            <HeroBanner
              onExploreClick={() => {
                const el = document.getElementById('desktop-catalog');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              isMobileFrame={false}
            />

            <RitualCallout
              onOpenRitual={() => setIsRitualModalOpen(true)}
              isMobileFrame={false}
            />

            <div id="desktop-catalog">
              <CatalogSection
                products={PRODUCTS}
                onSelectProduct={setSelectedProduct}
                onAddToCart={(p, e) => handleAddToCart(p, 1, e)}
                onBuyNow={(p, e) => handleBuyNow(p, 1, e)}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
                searchQuery={searchQuery}
                isMobileFrame={false}
              />
            </div>

            <MinimalistPackagingDesign
              onOpenCollection={() => {
                const el = document.getElementById('desktop-catalog');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              isMobileFrame={false}
            />

            <BrandPhilosophy isMobileFrame={false} />
          </main>

          <Footer
            isMobileFrame={false}
            onOpenSupport={() => setIsSupportOpen(true)}
            onOpenPolicies={handleOpenPolicies}
          />

          {/* Floating CSKH 24/7 button on desktop / tablet / mobile web */}
          <SupportFloatingButton
            onOpenSupport={() => setIsSupportOpen(true)}
            isMobileFrame={false}
          />

          {/* Bottom Nav appears on small screens when in responsive mode */}
          <div className="block sm:hidden">
            <BottomNav
              activeTab={activeTab}
              onSelectTab={handleSelectTab}
              cartCount={totalCartCount}
              wishlistCount={wishlistIds.size}
              onOpenCart={() => setIsCartOpen(true)}
            />
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
        onBuyNow={(p, qty) => handleBuyNow(p, qty)}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.has(selectedProduct.id) : false}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        user={user}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckoutSuccess={handleCheckoutSuccess}
        onOpenCheckout={handleOpenCheckoutFromCart}
        onUpdateProfile={handleUpdateProfile}
        onOpenSupport={() => setIsSupportOpen(true)}
      />

      {/* Full Checkout & Payment Modal (COD, VietQR, Bank Transfer) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={checkoutItems}
        user={user}
        onCompleteOrder={handleCompleteOrder}
        onShowToast={showToast}
        onOpenPolicies={handleOpenPolicies}
      />

      {/* Policies Modal (Đổi trả, Bảo mật, Vận chuyển) */}
      <PoliciesModal
        isOpen={isPoliciesOpen}
        onClose={() => setIsPoliciesOpen(false)}
        initialTab={policiesInitialTab}
        onOpenSupport={() => setIsSupportOpen(true)}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        onSelectProduct={setSelectedProduct}
      />

      {/* Ritual 4-Step Modal */}
      <RitualModal
        isOpen={isRitualModalOpen}
        onClose={() => setIsRitualModalOpen(false)}
        onSelectProduct={setSelectedProduct}
        onAddFullSetToCart={handleAddFullSetToCart}
      />

      {/* Account Profile Drawer with Dynamic Login/Logout & Purchased Orders */}
      <AccountDrawer
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        user={user}
        orders={orders}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onUpdateProfile={handleUpdateProfile}
        onUpdateOrderAddress={handleUpdateOrderAddress}
        onSelectProduct={setSelectedProduct}
        onReorder={handleReorder}
        onOpenSupport={() => setIsSupportOpen(true)}
        initialTab={accountInitialTab}
      />

      {/* Order Confirmation Modal */}
      <CheckoutSuccessModal
        isOpen={isCheckoutSuccessOpen}
        onClose={() => setIsCheckoutSuccessOpen(false)}
        orderNumber={latestOrderNumber}
        recipientName={latestRecipient.name}
        phone={latestRecipient.phone}
        shippingAddress={latestRecipient.address}
        onViewOrders={handleOpenPurchasedCategory}
        onOpenSupport={() => setIsSupportOpen(true)}
      />

      {/* Customer Support Center Modal (CSKH 24/7) */}
      <CustomerSupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        user={user}
        onShowToast={showToast}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#202022] text-white text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center space-x-2 animate-fade-in border border-[#46464a]">
          <Sparkles className="w-3.5 h-3.5 text-[#fed8c9]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
