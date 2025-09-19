const GOOGLE_MAPS_API_KEY = 'AIzaSyD6XVR2gLA-jAfuNLRF7jUOtHWZbpmtFAM';
const RESTAURANT_ADDRESS = 'Rua Hércules Franceschini, 35 - Éden, Sorocaba - SP';

interface DeliveryCalculationResult {
  fee: number;
  distance: string;
  duration: string;
  distanceInKm: number;
}

// Loader da Google Maps JavaScript API para evitar CORS na Distance Matrix HTTP
const loadGoogleMapsApi = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if ((window as any).google?.maps) {
      resolve((window as any).google);
      return;
    }

    const existing = document.getElementById('google-maps-js');
    if (existing) {
      existing.addEventListener('load', () => resolve((window as any).google));
      existing.addEventListener('error', reject);
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-js';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve((window as any).google);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export const calculateDeliveryFee = async (
  address: string,
  neighborhood: string,
  reference?: string
): Promise<DeliveryCalculationResult> => {
  const customerAddress = `${address}, ${neighborhood}, Sorocaba - SP`;

  try {
    // Primeiro, obter coordenadas do endereço do cliente
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(customerAddress)}&key=${GOOGLE_MAPS_API_KEY}`;
    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();

    if (geocodeData.status !== 'OK' || !geocodeData.results.length) {
      throw new Error('Endereço não encontrado. Verifique os dados informados.');
    }

    // Calcular distância usando Google Maps JavaScript API (evita problemas de CORS)
    await loadGoogleMapsApi();
    const gmaps = (window as any).google;
    const service = new gmaps.maps.DistanceMatrixService();

    const dmResult: any = await new Promise((resolve, reject) => {
      service.getDistanceMatrix(
        {
          origins: [RESTAURANT_ADDRESS],
          destinations: [customerAddress],
          travelMode: gmaps.maps.TravelMode.DRIVING,
          unitSystem: gmaps.maps.UnitSystem.METRIC,
        },
        (response: any, status: any) => {
          if (status === 'OK') resolve(response);
          else reject(new Error('Erro ao calcular distância. Tente novamente.'));
        }
      );
    });

    if (!dmResult.rows?.[0]?.elements?.[0]) {
      throw new Error('Erro ao calcular distância. Tente novamente.');
    }

    const element = dmResult.rows[0].elements[0];
    if (element.status !== 'OK') {
      throw new Error('Rota não encontrada para o endereço informado.');
    }

    const distanceInKm = element.distance.value / 1000;
    
    // Bairros próximos em Sorocaba com taxas especiais
    const nearbyNeighborhoods = [
      'campinha', '3 marias', 'três marias', 'vitória régia', 'vitoria regia', 
      'éden', 'eden', 'jardim europa', 'centro', 'vila hortência', 'vila hortencia',
      'jardim novo mundo', 'jardim são paulo', 'jardim sao paulo', 'barcelona',
      'parque vitória', 'parque vitoria', 'vila helena', 'jardim residencial veneza',
      'vila fiori', 'jardim maria helena'
    ];
    
    const customerNeighborhood = neighborhood.toLowerCase();
    const isNearbyNeighborhood = nearbyNeighborhoods.some(n => 
      customerNeighborhood.includes(n) || n.includes(customerNeighborhood)
    );
    
    // Aplicar regras de taxa baseadas na distância e localização
    let fee = 20.00; // Taxa padrão para locais distantes
    
    // Para bairros próximos conhecidos, aplicar taxa reduzida mesmo se a distância calculada for maior
    if (isNearbyNeighborhood && distanceInKm <= 8) {
      if (distanceInKm <= 2) {
        fee = 4.00;
      } else if (distanceInKm <= 3.5) {
        fee = 6.00;
      } else if (distanceInKm <= 5) {
        fee = 8.00;
      } else {
        fee = 10.00;
      }
    } else {
      // Para outros locais, usar cálculo normal de distância
      if (distanceInKm <= 2) {
        fee = 4.00;
      } else if (distanceInKm <= 2.5) {
        fee = 6.00;
      } else if (distanceInKm <= 3) {
        fee = 7.00;
      } else if (distanceInKm <= 4) {
        fee = 10.00;
      } else if (distanceInKm <= 6) {
        fee = 12.00;
      } else if (distanceInKm <= 8) {
        fee = 15.00;
      } else if (distanceInKm <= 12) {
        fee = 18.00;
      }
    }

    return {
      fee,
      distance: element.distance.text,
      duration: element.duration.text,
      distanceInKm
    };

  } catch (error) {
    console.error('Erro ao calcular taxa de entrega:', error);
    throw error;
  }
};

export const validateAddress = async (address: string, neighborhood: string): Promise<boolean> => {
  try {
    const customerAddress = `${address}, ${neighborhood}, Sorocaba - SP`;
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(customerAddress)}&key=${GOOGLE_MAPS_API_KEY}`;
    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();

    return geocodeData.status === 'OK' && geocodeData.results.length > 0;
  } catch (error) {
    console.error('Erro ao validar endereço:', error);
    return false;
  }
};