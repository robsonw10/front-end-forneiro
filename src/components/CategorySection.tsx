import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  description: string;
  price: { broto: number; grande: number };
  category: 'combos' | 'pizzas-promocionais' | 'pizzas-premium' | 'pizzas-tradicionais' | 'pizzas-especiais' | 'pizzas-doces' | 'bebidas' | 'adicionais' | 'bordas';
  isPopular?: boolean;
  ingredients?: string[];
  portions?: string;
}

interface CategorySectionProps {
  title: string;
  products: Product[];
  onAddToCart: (productId: string, quantity: number) => void;
  onPizzaClick?: (pizzaId: string) => void;
  onHalfPizzaClick?: (pizzaId: string) => void; // Nova prop
}

const CategorySection = ({ title, products, onAddToCart, onPizzaClick, onHalfPizzaClick }: CategorySectionProps) => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-foreground mb-6">
        {title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={onAddToCart}
            onPizzaClick={onPizzaClick}
            onHalfPizzaClick={onHalfPizzaClick}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;