import React, { useEffect, useState } from 'react';
import { Navbar, Card, Linear, Speedometer, Table, Bar } from './components';
import './App.css';

const App = () => {
  const [sellers, setSellers] = useState<any[]>([]);
  const [seller, setSeller] = useState(0);
  const [loading, setLoading] = useState(false);
  const [velocimetro, setVelocimetro] = useState(0);
  const [ultimasAvaliacoes, setUltimasAvaliacoes] = useState<any[]>([]);
  const [motivosAtritos, setMotivosAtritos] = useState<any[]>([]);
  const [canaisVenda, setCanaisVenda] = useState<any[]>([]);
  const [pedidos, setPedidos] = useState<any[]>([]);

  const handlerSeller = (sellerObj: any) => {
    setLoading(true);
    setSeller(sellerObj.seller);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(`http://ec2-54-91-136-29.compute-1.amazonaws.com:8521/api/v1/aspirador/sellers/idlojistas`);
      const data = await response.json();
      setSellers(data);
      setSeller(data[3]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (seller > 0) {
        const response = await fetch(`http://ec2-54-91-136-29.compute-1.amazonaws.com:8521/api/v1/aspirador/sellers/${seller}`);
        const data = await response.json();
        setVelocimetro(data.velocimetro);
        setMotivosAtritos(data.motivosAtritos);
        setUltimasAvaliacoes(data.ultimasAvaliacoes);
        setCanaisVenda(data.canaisVenda);
        setPedidos(data.pedidos);
        setLoading(false);
      }
    })();
  }, [seller]);

  return (
    <>
      <Navbar sellers={sellers} sellerSelected={seller} onChange={handlerSeller} />
      <div className="p-4">
        <div className="container mx-auto mb-8">
          <div className="mt-4">
            <div className="text-lg">Olá, <span className="font-semibold">Vendedor!</span></div>
            <div className="mt-2 text-base text-gray-500">Fizemos uma análise nos seus pedidos! Veja os seus resultados:</div>
          </div>
          <div className="grid grid-cols-4 gap-8 mt-4">
            <Card col="span-1">
              <Card.Title>
                Visão geral dos pedidos
              </Card.Title>
              <Card.Body loading={loading}>
                <Speedometer data={velocimetro}>
                  <div className="max-w-2xl text-xl lg:mx-auto">
                    Classificação: 
                    {velocimetro < 33.33 ? <span className="font-medium transparent-error"> Ruim</span> : ''}
                    {velocimetro >= 33.33 && velocimetro < 66.66 ? <span className="font-medium transparent-warning"> Bom</span> : ''}
                    {velocimetro >= 66.66 ? <span className="font-medium transparent-success"> Excelente</span> : ''}
                  </div>
                  <div className="mt-3">
                    Nos próximos 7 dias, cerca de <span className="font-medium">{(100 - velocimetro).toFixed(2)}%</span> dos seus pedidos estão com alta probabilidade de dar algum tipo de problema.
                  </div>
                </Speedometer>
              </Card.Body>
            </Card>
            <Card col="span-3">
              <Card.Title>
                Média das últimas avaliações
              </Card.Title>
              <Card.Body loading={loading}>
                <Linear data={ultimasAvaliacoes}>
                  <></>
                </Linear>
              </Card.Body>
            </Card>
            <Card col="span-2">
              <Card.Title>
                Principais motivos de cancelamento
              </Card.Title>
              <Card.Body loading={loading}>
                <Bar data={motivosAtritos} title="Motivos de cancelamento">
                  Dicas:
                  <ul className="mt-4 list-disc ml-6">
                    <li>Seu cliente está esperando pelo seu produto, envie-o ou cancele o pedido.</li>
                    <li>Proteja seu produto ao embalá-lo;</li>
                    <li>Procure sempre responder as dúvidas.</li>
                  </ul>
                </Bar>
              </Card.Body>
            </Card>
            <Card col="span-2">
              <Card.Title>
                Principais canais de vendas com problemas
              </Card.Title>
              <Card.Body loading={loading}>
                <Bar data={canaisVenda} title="Canais de vendas com problemas">
                  <></>
                </Bar>
              </Card.Body>
            </Card>
            <Card col="span-4">
              <Card.Title>
                Pedidos críticos
              </Card.Title>
              <Card.Body loading={loading} full>
                <Table data={pedidos} />
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
