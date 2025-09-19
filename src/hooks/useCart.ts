import { useState, useCallback } from 'react';

// Importar as imagens
import pizzaMargherita from "@/assets/pizza-margherita.jpg";
import pizzaPortuguesa from "@/assets/pizza-portuguesa.jpg";
import pizzaPepperoni from "@/assets/pizza-pepperoni.jpg";
import pizzaCalabresa from "@/assets/pizza-calabresa.jpg";
import pizzaQuatroQueijos from "@/assets/pizza-quatro-queijos.jpg";
import pizzaFrangoCatupiry from "@/assets/pizza-frango-catupiry.jpg";
import pizzaVegetariana from "@/assets/pizza-vegetariana.jpg";
import pizzaChocolate from "@/assets/pizza-chocolate.jpg";
import cocaCola from "@/assets/coca-cola.jpg";
import guarana2l from "@/assets/guarana-2l.jpg";
import pudimImage from "@/assets/pudim.jpg";
import brigadeiro from "@/assets/brigadeiro.jpg";
import baconExtra from "@/assets/bacon-extra.jpg";
import queijoExtra from "@/assets/queijo-extra.jpg";
import bordaCatupiry from "@/assets/borda-catupiry.jpg";
import bordaCheddar from "@/assets/borda-cheddar.jpg";
import pizzaMeiaMeia from "@/assets/pizza-meia-meia.jpg";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isHalfPizza?: boolean;
  halfFlavor1?: string;
  halfFlavor2?: string;
}

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((productId: string, quantity: number, productData?: any) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: quantity }
            : item
        );
      } else if (quantity > 0) {
        // Dados mock dos produtos - em uma aplicação real viriam de uma API
        const mockProducts: Record<string, any> = {
          'pizza-margherita': { name: 'Margherita', price: { pequena: 32.90, media: 45.90, grande: 58.90, familia: 72.90 }, image: pizzaMargherita },
          'pizza-portuguesa': { name: 'Portuguesa', price: { pequena: 38.90, media: 51.90, grande: 64.90, familia: 78.90 }, image: pizzaPortuguesa },
          'pizza-calabresa': { name: 'Calabresa', price: { pequena: 35.90, media: 48.90, grande: 61.90, familia: 75.90 }, image: pizzaCalabresa },
          'pizza-frango-catupiry': { name: 'Frango c/ Catupiry', price: { pequena: 40.90, media: 53.90, grande: 66.90, familia: 80.90 }, image: pizzaFrangoCatupiry },
          'pizza-quatro-queijos': { name: 'Quatro Queijos', price: { pequena: 42.90, media: 55.90, grande: 68.90, familia: 82.90 }, image: pizzaQuatroQueijos },
          'pizza-pepperoni': { name: 'Pepperoni', price: { pequena: 44.90, media: 57.90, grande: 70.90, familia: 84.90 }, image: pizzaPepperoni },
          'pizza-vegetariana': { name: 'Vegetariana', price: { pequena: 39.90, media: 52.90, grande: 65.90, familia: 79.90 }, image: pizzaVegetariana },
          'pizza-chocolate': { name: 'Chocolate', price: { pequena: 29.90, media: 42.90, grande: 55.90, familia: 68.90 }, image: pizzaChocolate },
          'coca-cola-2l': { name: 'Coca-Cola 2L', price: { pequena: 8.90, media: 8.90, grande: 8.90, familia: 8.90 }, image: cocaCola },
          'guarana-2l': { name: 'Guaraná 2L', price: { pequena: 7.90, media: 7.90, grande: 7.90, familia: 7.90 }, image: guarana2l },
          'agua-500ml': { name: 'Água 500ml', price: { pequena: 3.50, media: 3.50, grande: 3.50, familia: 3.50 }, image: '/placeholder.svg' },
          'suco-laranja': { name: 'Suco Natural de Laranja', price: { pequena: 6.90, media: 6.90, grande: 6.90, familia: 6.90 }, image: '/placeholder.svg' },
          'pudim': { name: 'Pudim de Leite', price: { pequena: 12.90, media: 12.90, grande: 12.90, familia: 12.90 }, image: pudimImage },
          'brigadeiro': { name: 'Brigadeiro Gourmet', price: { pequena: 4.50, media: 4.50, grande: 4.50, familia: 4.50 }, image: brigadeiro },
          'bacon-extra': { name: 'Bacon Extra', price: { pequena: 5.50, media: 5.50, grande: 5.50, familia: 5.50 }, image: baconExtra },
          'queijo-extra': { name: 'Queijo Extra', price: { pequena: 4.90, media: 4.90, grande: 4.90, familia: 4.90 }, image: queijoExtra },
          'borda-catupiry': { name: 'Borda de Catupiry', price: { pequena: 8.50, media: 8.50, grande: 8.50, familia: 8.50 }, image: bordaCatupiry },
          'borda-cheddar': { name: 'Borda de Cheddar', price: { pequena: 9.90, media: 9.90, grande: 9.90, familia: 9.90 }, image: bordaCheddar },
          'petit-gateau': { name: 'Petit Gateau', price: { pequena: 18.90, media: 18.90, grande: 18.90, familia: 18.90 }, image: '/placeholder.svg' },
        };

        const product = mockProducts[productId] || productData;
        if (product) {
          const finalPrice = typeof product.price === 'object' ? product.price.media : product.price;
          const finalImage = productData?.isHalfPizza ? pizzaMeiaMeia : product.image;
          return [...prevItems, {
            id: productId,
            name: product.name,
            price: finalPrice,
            quantity,
            image: finalImage,
            ...productData
          }];
        }
      }
      
      return prevItems.filter(item => item.quantity > 0);
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
    } else {
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [items]);

  return {
    items,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalItems,
    getTotalPrice
  };
};