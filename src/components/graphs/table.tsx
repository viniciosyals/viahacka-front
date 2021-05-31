interface Props {
  data: any;
}

const Table = ({ data }: Props) => (
  <>
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="overflow-hidden border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Número do Pedido
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    iD da Compra/Entrega
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Score
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Classificação
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((order: any) => (
                  <tr key={order.idCompra}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium mr-4 text-gray-900">{order.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.idCompra}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.score}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lef text-sm font-medium">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-900 uppercase">
                        {order.classificacao}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </>
)

export default Table;
