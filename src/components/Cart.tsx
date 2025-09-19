import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isHalfPizza?: boolean;
  halfFlavor1?: string;
  halfFlavor2?: string;
  customization?: any;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
}

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Seu Carrinho</span>
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold mb-2">Carrinho vazio</h3>
            <p className="text-muted-foreground mb-6">Adicione deliciosos produtos ao seu carrinho!</p>
            <Button onClick={onClose} className="bg-gradient-primary">
              Explorar Cardápio
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Seu Carrinho</span>
            </div>
            <Badge variant="secondary">{items.length} {items.length === 1 ? 'item' : 'itens'}</Badge>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg bg-surface border">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                {item.isHalfPizza && (
                  <p className="text-xs text-muted-foreground">
                    Meio a meio: {item.halfFlavor1} + {item.halfFlavor2}
                  </p>
                )}
                <p className="text-brand-red font-semibold">R$ {item.price.toFixed(2).replace('.', ',')}</p>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-8 h-8 p-0"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                
                <span className="font-medium w-8 text-center">{item.quantity}</span>
                
                <Button
                  size="sm"
                  className="w-8 h-8 p-0 bg-gradient-primary"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  className="w-8 h-8 p-0 text-destructive hover:text-destructive"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'itens'})</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-brand-red">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Continuar
            </Button>
            <Button 
              onClick={onCheckout}
              className="flex-1 bg-gradient-primary"
            >
              Finalizar Pedido
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;