import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: { broto: number; grande: number };
  category: 'combos' | 'pizzas-promocionais' | 'pizzas-premium' | 'pizzas-tradicionais' | 'pizzas-especiais' | 'pizzas-doces' | 'bebidas' | 'adicionais' | 'bordas';
  isPopular?: boolean;
  ingredients?: string[];
  portions?: string;
  drinkOptions?: string[];
  pizzaCount?: number;
  onAddToCart: (productId: string, quantity: number) => void;
  onPizzaClick?: (pizzaId: string, preSelectedPizza?: string) => void;
  onHalfPizzaClick?: (pizzaId: string) => void;
}

const ProductCard = ({
  id,
  name,
  description,
  price,
  category,
  isPopular,
  ingredients,
  portions,
  drinkOptions,
  pizzaCount,
  onAddToCart,
  onPizzaClick,
  onHalfPizzaClick
}: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    if ((category.includes('pizzas') || category === 'combos') && onPizzaClick) {
      onPizzaClick(id, id); // Passa o ID da pizza como pré-selecionada
    } else {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onAddToCart(id, newQuantity);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onAddToCart(id, newQuantity);
    }
  };

  return (
    <Card className="group hover:shadow-elevated transition-all duration-300 bg-card border-0 overflow-hidden">
      <CardContent className="p-4">
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg text-foreground">{name}</h3>
            {isPopular && (
              <Badge className="bg-brand-gold text-white">
                🔥 Popular
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground text-sm mb-2">{description}</p>
          {portions && (
            <p className="text-xs text-brand-orange font-medium mt-1">{portions}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {category === 'bebidas' || category === 'bordas' || category === 'adicionais' || category === 'combos' ? (
              <span className="text-lg font-bold text-brand-red">
                R$ {price.grande.toFixed(2).replace('.', ',')}
              </span>
            ) : (
              <>
                <span className="text-lg font-bold text-brand-red">
                  Grande: R$ {price.grande.toFixed(2).replace('.', ',')}
                </span>
              </>
            )}
          </div>
          
          {quantity === 0 ? (
            <div className="flex flex-col gap-2">
              <Button
                onClick={handleAddToCart}
                size="sm"
                className="bg-gradient-primary hover:scale-105 transition-transform"
              >
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
              
              {(category.includes('pizzas') || category === 'combos') && onHalfPizzaClick && (
                <Button
                  onClick={() => onHalfPizzaClick(id)}
                  size="sm"
                  variant="outline"
                  className="text-xs border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                >
                  🍕 Meia a Meia
                </Button>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleDecrement}
                size="sm"
                variant="outline"
                className="w-8 h-8 p-0"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="font-medium w-6 text-center">{quantity}</span>
              <Button
                onClick={handleAddToCart}
                size="sm"
                className="w-8 h-8 p-0 bg-gradient-primary"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;