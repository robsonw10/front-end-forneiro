import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

interface PizzaFlavor {
  id: string;
  name: string;
  price: { broto: number; grande: number };
  ingredients?: string[];
}

interface HalfPizzaModalProps {
  isOpen: boolean;
  onClose: () => void;
  pizzas: PizzaFlavor[];
  onAddToCart: (productId: string, quantity: number, productData: any) => void;
  preSelectedFlavor?: PizzaFlavor; // Sabor pré-selecionado
  allowedPizzaCategories?: string[]; // Categorias permitidas (opcional)
  isComboContext?: boolean; // Se está no contexto de combo
}

const HalfPizzaModal = ({ isOpen, onClose, pizzas, onAddToCart, preSelectedFlavor, allowedPizzaCategories, isComboContext = false }: HalfPizzaModalProps) => {
  const [selectedFlavor1, setSelectedFlavor1] = useState<PizzaFlavor | null>(preSelectedFlavor || null);
  const [selectedFlavor2, setSelectedFlavor2] = useState<PizzaFlavor | null>(null);

  // Atualiza sabor 1 quando houver pré-seleção
  useEffect(() => {
    if (preSelectedFlavor) {
      setSelectedFlavor1(preSelectedFlavor);
    }
  }, [preSelectedFlavor]);

  // Calcula o preço baseado no sabor mais caro (usando preço grande como referência)
  const calculatePrice = () => {
    if (!selectedFlavor1 || !selectedFlavor2) return 0;
    // Para combos, não calcula preço aqui, apenas mostra que é grátis
    if (isComboContext) return 0;
    return Math.max(selectedFlavor1.price.grande, selectedFlavor2.price.grande);
  };

  const handleAddToCart = () => {
    if (!selectedFlavor1 || !selectedFlavor2) {
      toast({
        title: "Selecione os sabores",
        description: "Por favor, escolha 2 sabores para sua pizza meio a meio.",
        variant: "destructive",
      });
      return;
    }

    const price = calculatePrice();
    const productData = {
      name: `Pizza Meio a Meio: ${selectedFlavor1.name} + ${selectedFlavor2.name}`,
      price,
      image: '/placeholder.svg',
      isHalfPizza: true,
      halfFlavor1: selectedFlavor1.name,
      halfFlavor2: selectedFlavor2.name,
    };

    onAddToCart(`half-pizza-${selectedFlavor1.id}-${selectedFlavor2.id}`, 1, productData);
    
    toast({
      title: "Pizza adicionada!",
      description: `Pizza meio a meio ${selectedFlavor1.name} + ${selectedFlavor2.name} foi adicionada ao carrinho.`,
    });

    // Reset selections
    setSelectedFlavor1(preSelectedFlavor || null);
    setSelectedFlavor2(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            🍕 Pizza Meio a Meio
          </DialogTitle>
          <p className="text-muted-foreground">
            Escolha 2 sabores diferentes. O preço será calculado pelo sabor mais caro.
          </p>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Primeiro Sabor - Mostra apenas se não foi pré-selecionado */}
          {!preSelectedFlavor && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                🔥 Primeiro Sabor
                {selectedFlavor1 && (
                  <Badge className="ml-2 bg-brand-red">{selectedFlavor1.name}</Badge>
                )}
              </h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {pizzas.map((pizza) => (
                  <Card 
                    key={pizza.id}
                    className={`cursor-pointer transition-all ${
                      selectedFlavor1?.id === pizza.id 
                        ? 'ring-2 ring-brand-red bg-brand-red/5' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedFlavor1(pizza)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">{pizza.name}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {pizza.ingredients?.join(', ')}
                          </p>
                        </div>
                        <div className="text-right ml-4">
                          <span className="font-bold text-brand-red">
                            R$ {pizza.price.grande.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Primeiro Sabor Pré-selecionado - Apenas visualização */}
          {preSelectedFlavor && selectedFlavor1 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                ✅ Primeiro Sabor (Selecionado)
                <Badge className="ml-2 bg-brand-red">{selectedFlavor1.name}</Badge>
              </h3>
              
              <Card className="ring-2 ring-brand-red bg-brand-red/5">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium">{selectedFlavor1.name}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {selectedFlavor1.ingredients?.join(', ')}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <span className="font-bold text-brand-red">
                        R$ {selectedFlavor1.price.grande.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Segundo Sabor */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              🔥 {preSelectedFlavor ? 'Escolha o Segundo Sabor' : 'Segundo Sabor'}
              {selectedFlavor2 && (
                <Badge className="ml-2 bg-brand-orange">{selectedFlavor2.name}</Badge>
              )}
            </h3>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {pizzas
                .filter(pizza => pizza.id !== selectedFlavor1?.id) // Remove o sabor já selecionado
                .map((pizza) => (
                <Card 
                  key={pizza.id}
                  className={`cursor-pointer transition-all ${
                    selectedFlavor2?.id === pizza.id 
                      ? 'ring-2 ring-brand-orange bg-brand-orange/5' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedFlavor2(pizza)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{pizza.name}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {pizza.ingredients?.join(', ')}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <span className="font-bold text-brand-orange">
                          R$ {pizza.price.grande.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Resumo e Checkout */}
        {selectedFlavor1 && selectedFlavor2 && (
          <>
            <Separator />
            <div className="bg-gradient-accent p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-lg">Sua Pizza Meio a Meio</h4>
                  <p className="text-muted-foreground">
                    {selectedFlavor1.name} + {selectedFlavor2.name}
                  </p>
                </div>
                <div className="text-right">
          <div className="text-2xl font-bold text-brand-red">
            {isComboContext ? 'Incluído no Combo' : `R$ ${calculatePrice().toFixed(2).replace('.', ',')}`}
          </div>
          <div className="text-sm text-muted-foreground">
            {isComboContext ? 'Pizza meio a meio incluída' : 'Preço do sabor mais caro'}
          </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-brand-red/10 p-3 rounded">
                  <div className="font-medium text-brand-red">{selectedFlavor1.name}</div>
                  <div className="text-xs text-muted-foreground">
                    R$ {selectedFlavor1.price.grande.toFixed(2).replace('.', ',')}
                  </div>
                </div>
                <div className="bg-brand-orange/10 p-3 rounded">
                  <div className="font-medium text-brand-orange">{selectedFlavor2.name}</div>
                  <div className="text-xs text-muted-foreground">
                    R$ {selectedFlavor2.price.grande.toFixed(2).replace('.', ',')}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button 
            onClick={handleAddToCart}
            disabled={!selectedFlavor1 || !selectedFlavor2}
            className="flex-1 bg-gradient-primary"
          >
            {isComboContext ? 'Confirmar Seleção' : `Adicionar ao Carrinho - R$ ${calculatePrice().toFixed(2).replace('.', ',')}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HalfPizzaModal;