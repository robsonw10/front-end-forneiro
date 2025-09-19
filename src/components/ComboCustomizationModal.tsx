import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Product, products } from "@/data/products";

interface ComboCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  combo: Product | null;
  onAddToCart: (productId: string, quantity: number, productData: any) => void;
}

const ComboCustomizationModal = ({ isOpen, onClose, combo, onAddToCart }: ComboCustomizationModalProps) => {
  const [selectedDrink, setSelectedDrink] = useState<string>('');
  const [selectedPizza1, setSelectedPizza1] = useState<string>('');
  const [selectedPizza2, setSelectedPizza2] = useState<string>('');

  useEffect(() => {
    if (isOpen && combo?.drinkOptions && combo.drinkOptions.length > 0) {
      setSelectedDrink(combo.drinkOptions[0]);
    }
  }, [isOpen, combo]);

  if (!combo) return null;

  const isComboFamilia = combo.pizzaCount === 2;
  
  // Pizzas disponíveis para combos (sabores 1 ao 10 - promocionais)
  const pizzaOptions = products.filter(p => 
    p.category === 'pizzas-promocionais'
  );

  // Opções de bebida
  const drinkOptions = combo.drinkOptions?.map(drinkId => {
    const drink = products.find(p => p.id === drinkId);
    return drink ? { id: drink.id, name: drink.name } : null;
  }).filter(Boolean) || [];

  const handleAddToCart = () => {
    if (!selectedDrink) {
      toast({
        title: "Selecione a bebida",
        description: "Por favor, escolha a bebida do combo.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedPizza1) {
      toast({
        title: "Selecione a pizza",
        description: "Por favor, escolha o sabor da pizza.",
        variant: "destructive",
      });
      return;
    }

    if (isComboFamilia && !selectedPizza2) {
      toast({
        title: "Selecione a segunda pizza",
        description: "Por favor, escolha o sabor da segunda pizza.",
        variant: "destructive",
      });
      return;
    }

    const selectedDrinkData = products.find(p => p.id === selectedDrink);
    const selectedPizza1Data = pizzaOptions.find(p => p.id === selectedPizza1);
    const selectedPizza2Data = isComboFamilia ? pizzaOptions.find(p => p.id === selectedPizza2) : null;

    let productName = `${combo.name}`;
    if (isComboFamilia) {
      productName += ` - ${selectedPizza1Data?.name} + ${selectedPizza2Data?.name}`;
    } else {
      productName += ` - ${selectedPizza1Data?.name}`;
    }
    productName += ` + ${selectedDrinkData?.name}`;

    const productData = {
      name: productName,
      price: combo.price.grande,
      customization: {
        drink: selectedDrinkData?.name,
        pizza1: selectedPizza1Data?.name,
        pizza2: selectedPizza2Data?.name
      }
    };

    onAddToCart(`${combo.id}-${Date.now()}`, 1, productData);
    
    toast({
      title: "Combo adicionado!",
      description: `${productName} foi adicionado ao carrinho.`,
    });

    // Reset form
    setSelectedDrink(combo.drinkOptions?.[0] || '');
    setSelectedPizza1('');
    setSelectedPizza2('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Personalizar {combo.name}
          </DialogTitle>
          <p className="text-muted-foreground">
            {combo.description}
          </p>
        </DialogHeader>

        {/* Seleção de Bebida */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Escolha a Bebida (Grátis)</h3>
          <RadioGroup value={selectedDrink} onValueChange={setSelectedDrink}>
            {drinkOptions.map((drink) => (
              <div key={drink.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value={drink.id} id={drink.id} />
                <Label htmlFor={drink.id} className="flex-1 cursor-pointer">
                  <div className="font-medium">{drink.name}</div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        {/* Seleção da Primeira Pizza */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {isComboFamilia ? 'Primeira Pizza' : 'Escolha o Sabor da Pizza'}
          </h3>
          <Select value={selectedPizza1} onValueChange={setSelectedPizza1}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o sabor da pizza" />
            </SelectTrigger>
            <SelectContent>
              {pizzaOptions.map((pizza) => (
                <SelectItem key={pizza.id} value={pizza.id}>
                  <div className="flex justify-between items-center w-full">
                    <span>{pizza.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Seleção da Segunda Pizza (apenas para Combo Família) */}
        {isComboFamilia && (
          <>
            <Separator />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Segunda Pizza</h3>
              <Select value={selectedPizza2} onValueChange={setSelectedPizza2}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o sabor da segunda pizza" />
                </SelectTrigger>
                <SelectContent>
                  {pizzaOptions.map((pizza) => (
                    <SelectItem key={pizza.id} value={pizza.id}>
                      <div className="flex justify-between items-center w-full">
                        <span>{pizza.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <Separator />

        {/* Resumo */}
        <div className="bg-gradient-accent p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold">Total do Combo</h4>
              <p className="text-sm text-muted-foreground">
                {isComboFamilia ? '2 Pizzas' : '1 Pizza'} + Borda Requeijão + Refrigerante 2L
              </p>
            </div>
            <div className="text-2xl font-bold text-brand-red">
              R$ {combo.price.grande.toFixed(2).replace('.', ',')}
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button 
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-primary"
          >
            Adicionar ao Carrinho - R$ {combo.price.grande.toFixed(2).replace('.', ',')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComboCustomizationModal;