import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ProductCard from "./ProductCard";
import { getProductsByCategory, categories } from "@/data/products";

interface Product {
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
}

interface MobileMenuAccordionProps {
  onAddToCart: (productId: string, quantity: number) => void;
  onPizzaClick?: (pizzaId: string) => void;
  onHalfPizzaClick?: (pizzaId: string) => void;
  updateProductImages: (products: Product[]) => Product[];
}

const MobileMenuAccordion = ({ 
  onAddToCart, 
  onPizzaClick, 
  onHalfPizzaClick, 
  updateProductImages 
}: MobileMenuAccordionProps) => {
  const [openCategories, setOpenCategories] = useState<string[]>(['pizzas-promocionais']);

  return (
    <div className="md:hidden">
      <Accordion type="multiple" value={openCategories} onValueChange={setOpenCategories}>
        {categories.map((category) => {
          const categoryProducts = updateProductImages(getProductsByCategory(category.id as any));
          if (categoryProducts.length === 0) return null;
          
          return (
            <AccordionItem key={category.id} value={category.id} className="border-none">
              <AccordionTrigger className="bg-white/50 backdrop-blur-sm rounded-lg px-4 py-3 mb-2 hover:bg-white/70 transition-all">
                <div className="flex items-center gap-3 text-left">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h3 className="font-semibold text-foreground">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{categoryProducts.length} itens</p>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="pb-6">
                <div className="grid grid-cols-1 gap-4 px-2">
                  {categoryProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      {...product}
                      onAddToCart={onAddToCart}
                      onPizzaClick={onPizzaClick}
                      onHalfPizzaClick={onHalfPizzaClick}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default MobileMenuAccordion;