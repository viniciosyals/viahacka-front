import React, { useEffect, useState } from 'react';

interface Props {
  sellers: any;
  sellerSelected: number;
  onChange?: any;
}

const Navbar = ({ sellers, sellerSelected, onChange }: Props) => {
  const [data, setData] = useState({ seller: '' });
  const handleChange = (event: any) => setData({ ...data, [event.target.name]: event.target.value });

  useEffect(() => {
    onChange(data);
  }, [data]);

  return (
    <nav className="p-4 bg-gray-800">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-xl text-white font-light"><span className="font-medium">Seller</span> Analytics</div>
          <div>
            <label className="text-white text-sm font-semibold mr-2" htmlFor="seller">Selecione um Seller: </label>
            <select id="seller" name="seller" value={sellerSelected} onChange={handleChange} className="text-sm appearance-none rounded w-24 py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline h-10">
              {sellers.length > 0 ? sellers.map((seller: any) => (
              <option key={seller}>{seller}</option>
              )) : <option>Carregando...</option>}
            </select>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
