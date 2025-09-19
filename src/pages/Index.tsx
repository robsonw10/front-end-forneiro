import { useState } from "react";
import Header from "@/components/Header";
import CategorySection from "@/components/CategorySection";
import MobileMenuAccordion from "@/components/MobileMenuAccordion";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import Cart from "@/components/Cart";
import HalfPizzaModal from "@/components/HalfPizzaModal";
import PizzaCustomizationModal from "@/components/PizzaCustomizationModal";
import FloatingCartButton from "@/components/FloatingCartButton";
import CheckoutModal from "@/components/CheckoutModal";
import { useCart } from "@/hooks/useCart";
import { getProductsByCategory, products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Import das imagens geradas
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

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHalfPizzaModalOpen, setIsHalfPizzaModalOpen] = useState(false);
  const [isPizzaCustomizationOpen, setIsPizzaCustomizationOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [preSelectedPizzaForHalf, setPreSelectedPizzaForHalf] = useState(null);
  const [preSelectedPizzaForCustomization, setPreSelectedPizzaForCustomization] = useState(null);
  const [activeCategory, setActiveCategory] = useState('pizzas-promocionais');
  const [isComboContext, setIsComboContext] = useState(false); // Para rastrear se é contexto de combo
  const { items, addToCart, updateQuantity, removeItem, getTotalItems, getTotalPrice } = useCart();

  // Atualiza as imagens dos produtos
  const updateProductImages = (products: any[]) => {
    return products.map(product => {
      switch (product.id) {
        case 'pizza-margherita':
          return { ...product, image: pizzaMargherita };
        case 'pizza-portuguesa':
          return { ...product, image: pizzaPortuguesa };
        case 'pizza-pepperoni':
          return { ...product, image: pizzaPepperoni };
        case 'pizza-calabresa':
          return { ...product, image: pizzaCalabresa };
        case 'pizza-quatro-queijos':
          return { ...product, image: pizzaQuatroQueijos };
        case 'pizza-frango-catupiry':
          return { ...product, image: pizzaFrangoCatupiry };
        case 'pizza-vegetariana':
          return { ...product, image: pizzaVegetariana };
        case 'pizza-chocolate':
          return { ...product, image: pizzaChocolate };
        case 'coca-cola-2l':
          return { ...product, image: cocaCola };
        case 'guarana-2l':
          return { ...product, image: guarana2l };
        case 'pudim':
          return { ...product, image: pudimImage };
        case 'brigadeiro':
          return { ...product, image: brigadeiro };
        case 'bacon-extra':
          return { ...product, image: baconExtra };
        case 'queijo-extra':
          return { ...product, image: queijoExtra };
        case 'borda-catupiry':
          return { ...product, image: bordaCatupiry };
        case 'borda-cheddar':
          return { ...product, image: bordaCheddar };
        default:
          return product;
      }
    });
  };

  const handlePizzaClick = (pizzaId: string, preSelectedPizza?: string) => {
    const pizza = products.find(p => p.id === pizzaId);
    
    // Se for um combo, usar configuração especial para pizzas promocionais
    if (pizza && pizza.category === 'combos') {
      // Para combos, criar uma "pizza fictícia" para abrir o modal de customização
      const comboConfig = {
        ...pizza,
        category: 'pizzas-promocionais' // Simula ser uma pizza para abrir o modal
      };
      setSelectedPizza(comboConfig);
      setPreSelectedPizzaForCustomization(preSelectedPizza || null);
      setIsComboContext(true);
      setIsPizzaCustomizationOpen(true);
    } else if (pizza && pizza.category.includes('pizzas')) {
      setSelectedPizza(pizza);
      setPreSelectedPizzaForCustomization(preSelectedPizza || null);
      setIsComboContext(false);
      setIsPizzaCustomizationOpen(true);
    }
  };

  const handleHalfPizzaClick = (pizzaId: string) => {
    const pizza = products.find(p => p.id === pizzaId);
    
    // Se for um combo, filtrar apenas pizzas promocionais
    if (pizza && pizza.category === 'combos') {
      setPreSelectedPizzaForHalf(null); // Sem pré-seleção para combos
      setIsComboContext(true);
      setIsHalfPizzaModalOpen(true);
    } else if (pizza && pizza.category.includes('pizzas')) {
      setPreSelectedPizzaForHalf(pizza);
      setIsComboContext(false);
      setIsHalfPizzaModalOpen(true);
    }
  };

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-accent">
      <Header 
        cartItemsCount={getTotalItems()} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Forneiro Pizzaria
          </h2>
          <p className="text-xl mb-6 opacity-90">
            A pizza mais recheada da cidade 🇮🇹
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              🚀 Entrega em 30-45min
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              🔥 Forno a lenha
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              ⭐ Avaliação 4.8/5
            </Badge>
          </div>
        </div>
      </section>

      {/* Menu Navigation */}
      <section className="sticky top-20 z-40 bg-surface/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex space-x-4 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "ghost"}
                className="whitespace-nowrap text-foreground hover:text-brand-orange"
                onClick={() => scrollToCategory(category.id)}
              >
                {category.icon} {category.name}
              </Button>
            ))}
          </nav>
        </div>
      </section>

      {/* Menu Content */}
      <main className="container mx-auto px-4 py-8">

        {/* Mobile Accordion Menu */}
        <MobileMenuAccordion 
          onAddToCart={addToCart}
          onPizzaClick={handlePizzaClick}
          onHalfPizzaClick={handleHalfPizzaClick}
          updateProductImages={updateProductImages}
        />

        {/* Desktop Menu (hidden on mobile) */}
        <div className="hidden md:block">
          {categories.map((category) => {
            const categoryProducts = updateProductImages(getProductsByCategory(category.id as any));
            if (categoryProducts.length === 0) return null;
            
            return (
              <div key={category.id} id={category.id}>
                <CategorySection
                  title={category.name}
                  products={categoryProducts}
                  onAddToCart={addToCart}
                  onPizzaClick={handlePizzaClick}
                  onHalfPizzaClick={handleHalfPizzaClick}
                />
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-primary text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">🍕 Forneiro Pizzaria</h3>
          <p className="mb-4">A pizza mais recheada da cidade 🇮🇹</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div>📞 (15) 3232-1234</div>
            <div>📍 Rua Hércules Franceschini, 35 - Éden, Sorocaba - SP</div>
            <div>🕐 Seg-Dom: 18h às 23h</div>
          </div>
        </div>
      </footer>

      {/* Floating Cart Button */}
      <FloatingCartButton 
        itemCount={getTotalItems()} 
        onClick={() => setIsCartOpen(true)} 
      />

      {/* Cart */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={items}
        subtotal={getTotalPrice()}
        onOrderComplete={() => {
          // Clear cart and close modals
          items.forEach(item => removeItem(item.id));
          setIsCheckoutOpen(false);
        }}
      />

      {/* Half Pizza Modal */}
      <HalfPizzaModal
        isOpen={isHalfPizzaModalOpen}
        onClose={() => {
          setIsHalfPizzaModalOpen(false);
          setPreSelectedPizzaForHalf(null);
          setIsComboContext(false);
        }}
        pizzas={isComboContext 
          ? products.filter(p => p.category === 'pizzas-promocionais')
          : products.filter(p => p.category.includes('pizzas'))
        }
        onAddToCart={addToCart}
        preSelectedFlavor={preSelectedPizzaForHalf}
      />

      {/* Pizza Customization Modal */}
      <PizzaCustomizationModal
        isOpen={isPizzaCustomizationOpen}
        onClose={() => {
          setIsPizzaCustomizationOpen(false);
          setPreSelectedPizzaForCustomization(null);
          setIsComboContext(false);
        }}
        pizza={selectedPizza}
        onAddToCart={addToCart}
        preSelectedPizza={preSelectedPizzaForCustomization}
        allowedPizzaCategories={isComboContext 
          ? ['pizzas-promocionais'] 
          : undefined
        }
      />

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;