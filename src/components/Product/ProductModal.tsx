import React, { useState } from 'react';
import { Modal, Button, InputNumber, Badge, Divider } from 'antd';
import { ShoppingCartOutlined, MinusOutlined, PlusOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { z } from 'zod';
import type { Product } from '../../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (product: Product, quantity: number) => void;
}

const quantitySchema = z.number().min(1, 'Minimum quantity is 1');

export const ProductModal: React.FC<ProductModalProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  onConfirm 
}) => {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);

  if (!product) return null;

  const handleQuantityChange = (value: number | null) => {
    if (value === null) return;
    
    const result = quantitySchema.safeParse(value);
    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      setError(null);
      setQuantity(value);
    }
  };

  const handleConfirm = () => {
    const result = quantitySchema.safeParse(quantity);
    if (result.success) {
      onConfirm(product, quantity);
      setQuantity(1);
      onClose();
    }
  };

  const increment = () => handleQuantityChange(quantity + 1);
  const decrement = () => handleQuantityChange(Math.max(1, quantity - 1));

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
      className="[&_.ant-modal-content]:rounded-2xl [&_.ant-modal-content]:overflow-hidden"
      centered
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Image Section */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <Badge 
            className="absolute top-3 left-3"
            count={product.category}
            style={{ 
              backgroundColor: '#00D4AA', 
              color: '#003459',
              fontWeight: 600,
              fontSize: '11px',
              textTransform: 'uppercase'
            }}
          />
        </div>

        {/* Info Section */}
        <div className="flex flex-col">
          <h2 className="text-[#003459] font-bold text-2xl mb-2 leading-tight">
            {product.name}
          </h2>
          
          <div className="flex items-center gap-2 mb-4">
            <CheckCircleOutlined className="text-[#00D4AA]" />
            <span className="text-sm text-gray-500">In Stock: {product.stock} units</span>
          </div>

          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            {product.description}
          </p>

          <Divider className="my-4" />

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity ({product.unit})
            </label>
            <div className="flex items-center gap-3">
              <Button
                icon={<MinusOutlined />}
                onClick={decrement}
                disabled={quantity <= 1}
                className="w-10 h-10 flex items-center justify-center border-gray-200 hover:border-[#00A8E8] hover:text-[#00A8E8]"
              />
              <InputNumber
                min={1}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-24 [&_.ant-input-number-input]:text-center [&_.ant-input-number-input]:font-semibold"
              />
              <Button
                icon={<PlusOutlined />}
                onClick={increment}
                className="w-10 h-10 flex items-center justify-center border-gray-200 hover:border-[#00A8E8] hover:text-[#00A8E8]"
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            <p className="text-xs text-gray-400 mt-2">
              Minimum order: {product.minOrderQuantity} {product.unit}
            </p>
          </div>

          {/* Price and Action */}
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Total Price</p>
                <p className="text-[#00A8E8] font-bold text-3xl">${totalPrice}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Unit Price</p>
                <p className="text-[#003459] font-semibold">${product.price.toFixed(2)}</p>
              </div>
            </div>

            <Button
              type="primary"
              size="large"
              block
              icon={<ShoppingCartOutlined />}
              onClick={handleConfirm}
              className="bg-[#00A8E8] hover:bg-[#0096D1] h-12 text-base font-semibold rounded-xl shadow-lg shadow-[#00A8E8]/30 hover:shadow-[#00A8E8]/50 transition-all"
            >
              Confirm Order
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};