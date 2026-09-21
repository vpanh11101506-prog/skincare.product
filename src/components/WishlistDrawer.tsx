import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#fcf9f4] shadow-2xl h-full flex flex-col z-10">
        <div className="p-4 sm:p-5 border-b border-[#202022]/10 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-[#ba1a1a] fill-[#ba1a1a]" />
            <h3 className="font-serif text-lg font-normal text-[#1c1c19]">
              Sản Phẩm Yêu Thích ({wishlist.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#77767b] hover:text-[#1c1c19] rounded-full hover:bg-[#f0ede9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-3">
          {wishlist.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#f0ede9] flex items-center justify-center text-[#77767b] mb-3">
                <Heart className="w-7 h-7 stroke-[1.25]" />
              </div>
              <p className="font-serif text-base text-[#1c1c19]">Chưa có sản phẩm yêu thích</p>
              <p className="text-xs text-[#77767b] mt-1 max-w-xs">
                Nhấn biểu tượng trái tim trên các sản phẩm bạn yêu thích để lưu lại và theo dõi ưu đãi.
              </p>
            </div>
          ) : (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-3 border border-[#202022]/6 flex space-x-3 items-center"
              >
                <div
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="w-16 h-16 rounded-xl bg-[#f6f3ee] overflow-hidden shrink-0 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = product.fallbackImage;
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex-grow min-w-0 cursor-pointer"
                >
                  <h4 className="font-serif text-xs sm:text-sm font-medium text-[#1c1c19] truncate">
                    {product.name}
                  </h4>
                  <div className="text-[10px] text-[#77767b] uppercase tracking-wider">
                    {product.capacity}
                  </div>
                  <div className="text-xs font-semibold text-[#1c1c19] mt-1">
                    {product.price.toLocaleString('vi-VN')}₫
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={() => onRemoveWishlist(product)}
                    className="text-[#77767b] hover:text-[#ba1a1a] p-1"
                    title="Xóa"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      onAddToCart(product);
                    }}
                    className="w-8 h-8 rounded-full bg-[#202022] text-white flex items-center justify-center hover:bg-black transition-colors"
                    title="Thêm vào giỏ"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
