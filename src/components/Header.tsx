import { ShoppingCart, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-primary shadow-elevated">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-white">
              <h1 className="text-2xl font-bold">🍕 Forneiro Pizzaria</h1>
              <p className="text-sm opacity-90">A pizza mais recheada da cidade 🇮🇹</p>
            </div>
            <div className="hidden md:flex items-center space-x-4 text-white/80 text-sm">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>30-45 min</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-current text-brand-gold" />
                <span>4.8 (1.2k)</span>
              </div>
            </div>
          </div>
          
          <Button
            onClick={onCartClick}
            size="lg"
            className="relative bg-gradient-dark hover:opacity-90 text-white border border-brand-orange hover:border-brand-gold transition-all duration-300"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Carrinho
            {cartItemsCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-brand-gold text-white min-w-[1.5rem] h-6 rounded-full p-0 flex items-center justify-center">
                {cartItemsCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;