import React, { useEffect, useState } from 'react';
import { Navbar, Card, Linear, Speedometer, BubbleCh, Table } from './components';
import './App.css';

const App = () => {
  const [sellers, setSellers] = useState<any[]>([]);
  const [seller, setSeller] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [velocimetro, setVelocimetro] = useState(0);
  const [ultimasAvaliacoes, setUltimasAvaliacoes] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [pedidos, setPedidos] = useState<any[]>([]);

  const handlerSeller = (sellerObj: any) => {
    setSeller(sellerObj.seller);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      // const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${30}`);
      // const data = await response.json();
      // etSellers(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      // const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${30}`);
      // const data = await response.json();
      /*
      setVelocimetro(data.velocimetro);
      setUltimasAvaliacoes(data.ultimasAvaliacoes);
      setCategorias(data.categorias);
      setPedidos(data.pedidos);*
      */
      setLoading(false);
    })();
  }, [seller]);

  return (
    <>
      <Navbar sellers={sellers} onChange={handlerSeller} />
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
                <Speedometer data={44}>
                  <div className="max-w-2xl text-xl text-gray-500 lg:mx-auto">
                    Classificação: Boa
                </div>
                  <div className="mt-3 text-base text-gray-500">
                    Nos próximos 7 dias, cerca de 8% dos seus pedidos estão com alta probabilidade de dar algum tipo de problema.
                </div>
                </Speedometer>
              </Card.Body>
            </Card>
            <Card col="span-3">
              <Card.Title>
                Média de avaliações nos últimos sete dias
            </Card.Title>
              <Card.Body loading={loading}>
                <Linear data={[
                  {
                    label: '00/00/0000',
                    number: 12
                  }, {
                    label: '00/00/0000',
                    number: 19
                  }, {
                    label: '00/00/0000',
                    number: 3
                  }, {
                    label: '00/00/0000',
                    number: 5
                  }, {
                    label: '00/00/0000',
                    number: 2
                  }, {
                    label: '00/00/0000',
                    number: 3
                  }, {
                    label: '00/00/0000',
                    number: 20
                  }]}>
                  <div className="mt-4 text-base text-gray-500"> Aumento de 9% nos últimos sete dias</div>
                </Linear>
              </Card.Body>
            </Card>
            <Card col="span-2">
              <Card.Title>
                Principais motivos de cancelamento
            </Card.Title>
              <Card.Body loading={loading}>
                <BubbleCh data={[
                  {
                    label: "Produto não enviado",
                    x: 20,
                    y: 3,
                    r: 15
                  }, {
                    label: "Produto não recebido",
                    x: 4,
                    y: 7,
                    r: 4
                  },
                ]}>
                  <div className="mt-4 text-base text-gray-500">Dicas:
                  <ul className="mt-4 list-disc ml-6">
                      <li>Seu cliente está esperando pelo seu produto, envie-o ou cancele o pedido.</li>
                      <li>Proteja seu produto ao embalá-lo;</li>
                      <li>Procure sempre responder as dúvidas.</li>
                    </ul>
                  </div>
                </BubbleCh>
              </Card.Body>
            </Card>
            <Card col="span-2">
              <Card.Title>
                Principais categorias de pedidos com problemas
            </Card.Title>
              <Card.Body loading={loading}>
                <BubbleCh data={[
                  {
                    label: "Produto não enviado",
                    x: 20,
                    y: 3,
                    r: 15
                  }, {
                    label: "Produto não recebido",
                    x: 4,
                    y: 7,
                    r: 4
                  },
                ]}>
                  <div className="mt-4 text-base text-gray-500">Essas são suas categorias com maior índice de atritos.</div>
                </BubbleCh>
              </Card.Body>
            </Card>
            <Card col="span-4">
              <Card.Title>
                Pedidos críticos
            </Card.Title>
              <Card.Body loading={loading} full>
                <Table data={ultimasAvaliacoes} />
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
