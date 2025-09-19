import { useState, useEffect } from "react";
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Product, products } from "@/data/products";

interface PizzaCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  pizza: Product | null;
  onAddToCart: (productId: string, quantity: number, productData: any) => void;
  preSelectedPizza?: string; // ID da pizza pré-selecionada
  allowedPizzaCategories?: string[]; // Categorias permitidas (opcional)
}

const PizzaCustomizationModal = ({ isOpen, onClose, pizza, onAddToCart, preSelectedPizza, allowedPizzaCategories }: PizzaCustomizationModalProps) => {
  const [pizzaType, setPizzaType] = useState<'inteira' | 'meia-meia'>('inteira');
  const [size, setSize] = useState<'broto' | 'grande'>('broto');
  const [borda, setBorda] = useState<string>('sem-borda');
  const [adicionais, setAdicionais] = useState<string[]>([]);
  const [observacoes, setObservacoes] = useState('');
  const [sabor1, setSabor1] = useState<string>('');
  const [sabor2, setSabor2] = useState<string>('');

  // Effect para pré-selecionar pizza quando abrir o modal
  React.useEffect(() => {
    if (isOpen && preSelectedPizza) {
      if (pizzaType === 'meia-meia') {
        setSabor1(preSelectedPizza);
      }
    }
  }, [isOpen, preSelectedPizza, pizzaType]);

  if (!pizza) return null;

  // Filtra apenas pizzas para os selects de sabores, considerando categorias permitidas
  const pizzaOptions = products.filter(p => {
    const isPizza = p.category.includes('pizzas');
    if (!isPizza) return false;
    
    // Se não há restrição de categorias, mostra todas as pizzas
    if (!allowedPizzaCategories || allowedPizzaCategories.length === 0) {
      return true;
    }
    
    // Se há restrição, mostra apenas as categorias permitidas
    return allowedPizzaCategories.includes(p.category);
  });

  const sizeOptions = [
    { id: 'broto', name: 'Broto', description: '4 fatias', price: pizza.price.broto },
    { id: 'grande', name: 'Grande', description: '8 fatias', price: pizza.price.grande }
  ];

  // Filtra bordas do cardápio 
  const bordaProducts = products.filter(p => p.category === 'bordas');
  const bordaOptions = [
    { id: 'sem-borda', name: 'Sem borda', price: 0 },
    ...bordaProducts.map(bordaProduct => {
      const isCombo = allowedPizzaCategories?.includes('pizzas-promocionais');
      const isRequeijao = bordaProduct.id === 'borda-requeijao';
      
      return {
        id: bordaProduct.id,
        name: bordaProduct.name,
        price: (isCombo && isRequeijao) ? 0 : bordaProduct.price.grande
      };
    })
  ];

  // Filtra adicionais do cardápio 
  const adicionaisProducts = products.filter(p => p.category === 'adicionais');
  const adicionaisOptions = adicionaisProducts.map(adicional => ({
    id: adicional.id,
    name: adicional.name,
    price: adicional.price.grande
  }));

  const calculateTotal = () => {
    let basePrice = pizza.price[size];
    
    // Se for pizza inteira em combo, usar preço do sabor selecionado
    if (pizzaType === 'inteira' && sabor1 && allowedPizzaCategories?.includes('pizzas-promocionais')) {
      const selectedPizza = pizzaOptions.find(p => p.id === sabor1);
      if (selectedPizza) {
        basePrice = selectedPizza.price[size];
      }
    }
    
    // Se for meia a meia, calcular pelo sabor mais caro
    if (pizzaType === 'meia-meia' && sabor1 && sabor2) {
      const pizza1 = pizzaOptions.find(p => p.id === sabor1);
      const pizza2 = pizzaOptions.find(p => p.id === sabor2);
      
      if (pizza1 && pizza2) {
        basePrice = Math.max(pizza1.price[size], pizza2.price[size]);
      }
    }
    
    let total = basePrice;
    
    // Adicionar preço da borda (requeijão é grátis nos combos)
    const bordaOption = bordaOptions.find(b => b.id === borda);
    if (bordaOption) {
      const isCombo = allowedPizzaCategories?.includes('pizzas-promocionais');
      const isRequeijao = borda === 'borda-requeijao';
      
      if (!(isCombo && isRequeijao)) {
        total += bordaOption.price;
      }
    }
    
    // Adicionar preço dos adicionais
    adicionais.forEach(adicional => {
      const adicionalOption = adicionaisOptions.find(a => a.id === adicional);
      if (adicionalOption) {
        total += adicionalOption.price;
      }
    });
    
    return total;
  };

  const getExpensiveFlavor = () => {
    if (pizzaType === 'meia-meia' && sabor1 && sabor2) {
      const pizza1 = pizzaOptions.find(p => p.id === sabor1);
      const pizza2 = pizzaOptions.find(p => p.id === sabor2);
      
      if (pizza1 && pizza2) {
        const price1 = pizza1.price[size];
        const price2 = pizza2.price[size];
        return price1 >= price2 ? pizza1 : pizza2;
      }
    }
    return null;
  };

  const handleAdicionalChange = (adicionalId: string, checked: boolean) => {
    if (checked) {
      setAdicionais([...adicionais, adicionalId]);
    } else {
      setAdicionais(adicionais.filter(id => id !== adicionalId));
    }
  };

    const handleAddToCart = () => {
    if (pizzaType === 'meia-meia' && (!sabor1 || !sabor2)) {
      toast({
        title: "Selecione os sabores",
        description: "Por favor, escolha 2 sabores para sua pizza meio a meio.",
        variant: "destructive",
      });
      return;
    }

    if (pizzaType === 'inteira' && allowedPizzaCategories?.includes('pizzas-promocionais') && !sabor1) {
      toast({
        title: "Selecione o sabor",
        description: "Por favor, escolha o sabor da sua pizza.",
        variant: "destructive",
      });
      return;
    }

    const total = calculateTotal();
    const bordaOption = bordaOptions.find(b => b.id === borda);
    const selectedAdicionais = adicionais.map(id => 
      adicionaisOptions.find(a => a.id === id)
    ).filter(Boolean);

    let productName = '';
    if (pizzaType === 'meia-meia' && sabor1 && sabor2) {
      const pizza1 = pizzaOptions.find(p => p.id === sabor1);
      const pizza2 = pizzaOptions.find(p => p.id === sabor2);
      productName = `Pizza Meia a Meia: ${pizza1?.name} + ${pizza2?.name} (${sizeOptions.find(s => s.id === size)?.name})`;
    } else if (pizzaType === 'inteira' && sabor1 && allowedPizzaCategories?.includes('pizzas-promocionais')) {
      const selectedPizza = pizzaOptions.find(p => p.id === sabor1);
      productName = `${selectedPizza?.name} (${sizeOptions.find(s => s.id === size)?.name})`;
    } else {
      productName = `${pizza.name} (${sizeOptions.find(s => s.id === size)?.name})`;
    }

    const productData = {
      name: productName,
      price: total,
      customization: {
        type: pizzaType,
        size: sizeOptions.find(s => s.id === size)?.name,
        sabor1: pizzaType === 'meia-meia' ? pizzaOptions.find(p => p.id === sabor1)?.name : undefined,
        sabor2: pizzaType === 'meia-meia' ? pizzaOptions.find(p => p.id === sabor2)?.name : undefined,
        borda: bordaOption?.name,
        adicionais: selectedAdicionais.map(a => a?.name),
        observacoes
      }
    };

    onAddToCart(`${pizza.id}-${size}-${Date.now()}`, 1, productData);
    
    toast({
      title: "Pizza adicionada!",
      description: `${productName} foi adicionada ao carrinho.`,
    });

    // Reset form
    setPizzaType('inteira');
    setSize('broto');
    setBorda('sem-borda');
    setAdicionais([]);
    setObservacoes('');
    setSabor1('');
    setSabor2('');
    onClose();
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="pizza-description">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Personalizar {pizza.name}
          </DialogTitle>
          <p id="pizza-description" className="text-muted-foreground">
            {pizza.description}
          </p>
        </DialogHeader>

        {/* Tipo de Pizza */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Escolha o Tipo</h3>
          <RadioGroup 
            value={pizzaType} 
            onValueChange={(value: 'inteira' | 'meia-meia') => {
              setPizzaType(value);
              // Reset sabores quando trocar de tipo
              if (value === 'inteira') {
                setSabor1('');
                setSabor2('');
              }
              // Se mudou para meia-meia e tem pizza pré-selecionada, definir como sabor1
              if (value === 'meia-meia' && preSelectedPizza) {
                setSabor1(preSelectedPizza);
              }
            }}
          >
            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem value="inteira" id="inteira" />
              <Label htmlFor="inteira" className="flex-1 cursor-pointer">
                <div className="font-medium">Pizza Inteira</div>
                <div className="text-sm text-muted-foreground">Um sabor para toda a pizza</div>
              </Label>
            </div>
            {/* Só mostra opção meia-meia se não for broto */}
            {size !== 'broto' && (
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="meia-meia" id="meia-meia" />
                <Label htmlFor="meia-meia" className="flex-1 cursor-pointer">
                  <div className="font-medium">Meia a Meia</div>
                  <div className="text-sm text-muted-foreground">Dois sabores na mesma pizza</div>
                  <div className="text-xs text-brand-red">Preço do sabor mais caro</div>
                </Label>
              </div>
            )}
          </RadioGroup>
        </div>

        {/* Seleção de Sabor para Pizza Inteira nos Combos */}
        {pizzaType === 'inteira' && allowedPizzaCategories && allowedPizzaCategories.includes('pizzas-promocionais') && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Escolha o Sabor</h3>
            <Select value={sabor1} onValueChange={setSabor1}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o sabor da pizza" />
              </SelectTrigger>
              <SelectContent>
                {pizzaOptions.map((pizzaOption) => (
                  <SelectItem key={pizzaOption.id} value={pizzaOption.id}>
                    <div className="flex justify-between items-center w-full">
                      <span>{pizzaOption.name}</span>
                      <span className="ml-2 text-brand-red font-medium">
                        R$ {pizzaOption.price[size].toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Seleção de Sabores para Meia a Meia */}
        {pizzaType === 'meia-meia' && size !== 'broto' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Escolha os Sabores</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sabor1" className="text-sm font-medium">Sabor 1</Label>
                <Select value={sabor1} onValueChange={setSabor1}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o primeiro sabor" />
                  </SelectTrigger>
                  <SelectContent>
                    {pizzaOptions.map((pizzaOption) => (
                      <SelectItem key={pizzaOption.id} value={pizzaOption.id}>
                        <div className="flex justify-between items-center w-full">
                          <span>{pizzaOption.name}</span>
                          <span className="ml-2 text-brand-red font-medium">
                            R$ {pizzaOption.price[size].toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sabor2" className="text-sm font-medium">Sabor 2</Label>
                <Select value={sabor2} onValueChange={setSabor2}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o segundo sabor" />
                  </SelectTrigger>
                  <SelectContent>
                    {pizzaOptions.map((pizzaOption) => (
                      <SelectItem key={pizzaOption.id} value={pizzaOption.id}>
                        <div className="flex justify-between items-center w-full">
                          <span>{pizzaOption.name}</span>
                          <span className="ml-2 text-brand-red font-medium">
                            R$ {pizzaOption.price[size].toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {sabor1 && sabor2 && (
              <div className="bg-gradient-accent p-4 rounded-lg">
                <div className="flex items-center text-brand-red">
                  <span className="text-lg">💰</span>
                  <span className="ml-2 font-medium">
                    Preço aplicado: R$ {Math.max(
                      pizzaOptions.find(p => p.id === sabor1)?.price[size] || 0,
                      pizzaOptions.find(p => p.id === sabor2)?.price[size] || 0
                    ).toFixed(2).replace('.', ',')} (sabor mais caro)
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        <Separator />

        {/* Tamanho */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Escolha o Tamanho</h3>
          <RadioGroup value={size} onValueChange={(value: 'broto' | 'grande') => {
            const previousSize = size;
            setSize(value);
            // Se mudou para broto e estava em meia-meia, volta para inteira
            if (value === 'broto' && pizzaType === 'meia-meia') {
              setPizzaType('inteira');
              setSabor1('');
              setSabor2('');
            }
            // Reset bordas e adicionais para recalcular preços
            if (previousSize !== value) {
              setBorda('sem-borda');
              setAdicionais([]);
            }
          }}>
            {sizeOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{option.name}</div>
                      <div className="text-sm text-muted-foreground">{option.description}</div>
                    </div>
                    <div className="font-bold text-brand-red">
                      R$ {option.price.toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        {/* Borda */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Borda (Opcional)</h3>
          <RadioGroup value={borda} onValueChange={setBorda}>
            {bordaOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value={option.id} id={`borda-${option.id}`} />
                <Label htmlFor={`borda-${option.id}`} className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{option.name}</div>
                    <div className="font-bold text-brand-red">
                      {option.price === 0 ? 'Grátis' : `+ R$ ${option.price.toFixed(2).replace('.', ',')}`}
                    </div>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        {/* Adicionais */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Adicionais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {adicionaisOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                <Checkbox
                  id={`adicional-${option.id}`}
                  checked={adicionais.includes(option.id)}
                  onCheckedChange={(checked) => handleAdicionalChange(option.id, checked as boolean)}
                />
                <Label htmlFor={`adicional-${option.id}`} className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-sm">{option.name}</div>
                    <div className="font-bold text-brand-red text-sm">
                      + R$ {option.price.toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Observações */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Observações (Opcional)</h3>
          <Textarea
            placeholder="Ex: bem passada, sem cebola, etc..."
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <Separator />

        {/* Total */}
        <div className="bg-gradient-accent p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl font-bold text-brand-red">
              R$ {calculateTotal().toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button 
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-primary"
          >
            Adicionar ao Carrinho
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PizzaCustomizationModal;