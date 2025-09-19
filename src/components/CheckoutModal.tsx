import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Check, MapPin, CreditCard, Clock } from "lucide-react";
import { CartItem } from "@/hooks/useCart";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  onOrderComplete: () => void;
}

type DeliveryType = 'entrega' | 'retirada' | 'local';
type PaymentMethod = 'pix' | 'dinheiro' | 'debito' | 'credito';

const CheckoutModal = ({ isOpen, onClose, items, subtotal, onOrderComplete }: CheckoutModalProps) => {
  const [step, setStep] = useState(1);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('entrega');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [isCalculatingDelivery, setIsCalculatingDelivery] = useState(false);
  
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: '',
    neighborhood: '',
    reference: '',
    changeFor: '',
    observations: ''
  });

  // Load saved customer data from localStorage
  useEffect(() => {
    const savedCustomerData = localStorage.getItem('forneiro-customer-data');
    if (savedCustomerData) {
      try {
        const parsedData = JSON.parse(savedCustomerData);
        setCustomerData(parsedData);
      } catch (error) {
        console.error('Error loading saved customer data:', error);
      }
    }
  }, []);

  // Save customer data to localStorage whenever it changes
  useEffect(() => {
    if (customerData.name || customerData.phone || customerData.address) {
      localStorage.setItem('forneiro-customer-data', JSON.stringify(customerData));
    }
  }, [customerData]);

  const total = subtotal + deliveryFee;

  const calculateDeliveryFee = async (address: string, neighborhood: string, reference: string) => {
    if (deliveryType !== 'entrega') {
      setDeliveryFee(0);
      return;
    }

    setIsCalculatingDelivery(true);
    
    try {
      const { calculateDeliveryFee: calcFee } = await import('@/services/googleMaps');
      const result = await calcFee(address, neighborhood, reference);
      
      setDeliveryFee(result.fee);

      // Mostrar informações da entrega
      toast({
        title: "Taxa calculada com sucesso!",
        description: `Distância: ${result.distance} | Tempo: ${result.duration} | Taxa: R$ ${result.fee.toFixed(2).replace('.', ',')}`,
      });

    } catch (error: any) {
      console.error('Erro ao calcular taxa de entrega:', error);
      setDeliveryFee(8.00); // Taxa padrão em caso de erro
      toast({
        title: "Erro ao calcular entrega",
        description: error.message || "Usando taxa padrão de R$ 8,00. Verifique o endereço.",
        variant: "destructive",
      });
    } finally {
      setIsCalculatingDelivery(false);
    }
  };

  const handleStep1Next = async () => {
    if (!customerData.name || !customerData.phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome e telefone.",
        variant: "destructive",
      });
      return;
    }

    if (deliveryType === 'entrega' && (!customerData.address || !customerData.neighborhood)) {
      toast({
        title: "Endereço obrigatório",
        description: "Preencha o endereço completo para entrega.",
        variant: "destructive",
      });
      return;
    }

    if (deliveryType === 'entrega') {
      await calculateDeliveryFee(customerData.address, customerData.neighborhood, customerData.reference);
    }

    setStep(2);
  };

  const handleOrderSubmit = async () => {
    const orderData = {
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          customization: (item as any).customization || {}
        })),
      customer: customerData,
      delivery: {
        type: deliveryType,
        fee: deliveryFee
      },
      payment: {
        method: paymentMethod,
        changeFor: paymentMethod === 'dinheiro' ? customerData.changeFor : null
      },
      totals: {
        subtotal,
        deliveryFee,
        total
      },
      observations: customerData.observations,
      timestamp: new Date().toISOString()
    };

    try {
      await fetch('https://fe7f17d14aec.ngrok-free.app/webhook/forneiro-eden-pizzaria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      setStep(3);
      
      // Redirecionar para WhatsApp da pizzaria após 3 segundos
      setTimeout(() => {
        const pizzariaNumber = '5515997794656'; // WhatsApp da pizzaria
        const orderItems = items.map(item => `• ${item.name} (${item.quantity}x)`).join('\n');
        const message = `Olá! Acabei de fazer um pedido no Forneiro Éden Pizzaria:\n\n${orderItems}\n\nValor total: R$ ${total.toFixed(2).replace('.', ',')}\nCódigo do pedido: ${Date.now()}\n\nDados para ${deliveryType}:\nNome: ${customerData.name}\nTelefone: ${customerData.phone}${deliveryType === 'entrega' ? `\nEndereço: ${customerData.address}, ${customerData.neighborhood}` : ''}\nPagamento: ${paymentMethod.toUpperCase()}${customerData.observations ? `\nObservações: ${customerData.observations}` : ''}`;
        const whatsappUrl = `https://wa.me/${pizzariaNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        onOrderComplete();
        onClose();
      }, 3000);

    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      toast({
        title: "Erro ao enviar pedido",
        description: "Tente novamente ou entre em contato conosco.",
        variant: "destructive",
      });
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <MapPin className="mx-auto h-12 w-12 text-brand-red mb-4" />
        <h3 className="text-xl font-semibold mb-2">Dados para Entrega</h3>
        <p className="text-muted-foreground">Como você gostaria de receber seu pedido?</p>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Tipo de Entrega</h4>
        <RadioGroup value={deliveryType} onValueChange={(value: DeliveryType) => setDeliveryType(value)}>
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="entrega" id="entrega" />
            <Label htmlFor="entrega" className="flex-1 cursor-pointer">
              <div className="font-medium">🚚 Entrega</div>
              <div className="text-sm text-muted-foreground">Taxa de entrega será calculada</div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="retirada" id="retirada" />
            <Label htmlFor="retirada" className="flex-1 cursor-pointer">
              <div className="font-medium">🏪 Retirada no Local</div>
              <div className="text-sm text-muted-foreground">Sem taxa adicional</div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="local" id="local" />
            <Label htmlFor="local" className="flex-1 cursor-pointer">
              <div className="font-medium">🍽️ Comer no Local</div>
              <div className="text-sm text-muted-foreground">Sem taxa adicional</div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Nome Completo *</Label>
            <Input
              id="name"
              value={customerData.name}
              onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
              placeholder="Seu nome completo"
            />
          </div>
          <div>
            <Label htmlFor="phone">Telefone/WhatsApp *</Label>
            <Input
              id="phone"
              value={customerData.phone}
              onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
              placeholder="(11) 99999-9999"
            />
          </div>
        </div>

        {deliveryType === 'entrega' && (
          <>
            <div>
              <Label htmlFor="address">Endereço Completo *</Label>
              <Input
                id="address"
                value={customerData.address}
                onChange={(e) => setCustomerData({...customerData, address: e.target.value})}
                placeholder="Rua, número, complemento"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="neighborhood">Bairro *</Label>
                <Input
                  id="neighborhood"
                  value={customerData.neighborhood}
                  onChange={(e) => setCustomerData({...customerData, neighborhood: e.target.value})}
                  placeholder="Seu bairro"
                />
              </div>
              <div>
                <Label htmlFor="reference">Ponto de Referência</Label>
                <Input
                  id="reference"
                  value={customerData.reference}
                  onChange={(e) => setCustomerData({...customerData, reference: e.target.value})}
                  placeholder="Próximo ao..."
                />
              </div>
            </div>
          </>
        )}
      </div>

      <Button onClick={handleStep1Next} className="w-full bg-gradient-primary">
        Continuar para Pagamento
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CreditCard className="mx-auto h-12 w-12 text-brand-red mb-4" />
        <h3 className="text-xl font-semibold mb-2">Pagamento</h3>
        <p className="text-muted-foreground">Escolha a forma de pagamento</p>
      </div>

      {/* Resumo do Pedido */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Resumo do Pedido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'itens'})</span>
            <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
          </div>
          {deliveryType === 'entrega' && (
            <div className="flex justify-between text-sm">
              <span>Taxa de entrega</span>
              <span className={isCalculatingDelivery ? 'text-muted-foreground' : ''}>
                {isCalculatingDelivery ? 'Calculando...' : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`}
              </span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-brand-red">R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
        </CardContent>
      </Card>

      {/* Formas de Pagamento */}
      <div className="space-y-4">
        <h4 className="font-medium">Forma de Pagamento</h4>
        <RadioGroup value={paymentMethod} onValueChange={(value: PaymentMethod) => setPaymentMethod(value)}>
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="pix" id="pix" />
            <Label htmlFor="pix" className="flex-1 cursor-pointer">
              <div className="font-medium">🎯 PIX</div>
              <div className="text-sm text-muted-foreground">Pagamento instantâneo</div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="dinheiro" id="dinheiro" />
            <Label htmlFor="dinheiro" className="flex-1 cursor-pointer">
              <div className="font-medium">💵 Dinheiro</div>
              <div className="text-sm text-muted-foreground">Pagamento na entrega</div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="debito" id="debito" />
            <Label htmlFor="debito" className="flex-1 cursor-pointer">
              <div className="font-medium">💳 Cartão de Débito</div>
              <div className="text-sm text-muted-foreground">Máquina na entrega</div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="credito" id="credito" />
            <Label htmlFor="credito" className="flex-1 cursor-pointer">
              <div className="font-medium">💳 Cartão de Crédito</div>
              <div className="text-sm text-muted-foreground">Máquina na entrega</div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {paymentMethod === 'dinheiro' && (
        <div>
          <Label htmlFor="change">Troco para quanto?</Label>
          <Input
            id="change"
            value={customerData.changeFor}
            onChange={(e) => setCustomerData({...customerData, changeFor: e.target.value})}
            placeholder="Ex: R$ 100,00"
          />
        </div>
      )}

      <div>
        <Label htmlFor="observations">Observações do Pedido</Label>
        <Textarea
          id="observations"
          value={customerData.observations}
          onChange={(e) => setCustomerData({...customerData, observations: e.target.value})}
          placeholder="Alguma observação especial?"
          className="min-h-[80px]"
        />
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <Button onClick={handleOrderSubmit} className="flex-1 bg-gradient-primary">
          Finalizar Pedido
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 text-center">
      <div className="text-center">
        <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-semibold text-green-600 mb-2">Pedido Confirmado!</h3>
        <p className="text-muted-foreground mb-6">
          Seu pedido foi recebido com sucesso e já está sendo preparado.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-brand-red">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Tempo estimado: 50-60 minutos</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>Em breve você será redirecionado para o WhatsApp para acompanhar seu pedido.</p>
            </div>

            <div className="bg-gradient-accent p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total do Pedido</span>
                <span className="text-xl font-bold text-brand-red">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Redirecionando para WhatsApp em 3 segundos...
      </p>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Finalizar Pedido</span>
            <div className="flex space-x-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-3 h-3 rounded-full ${
                    s === step ? 'bg-brand-red' : s < step ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </DialogTitle>
        </DialogHeader>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;