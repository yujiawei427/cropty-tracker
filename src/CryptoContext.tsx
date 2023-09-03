import React, { createContext, useState, useContext } from 'react';
import { createVoidZero } from 'typescript';
import { ICryptoContext } from './components/interfaces/cryptoContext.interface'

const Crypto = createContext<ICryptoContext>({ currency: 'USD', setCurrency: () => {} });

export const CryptoContext = ({ children }: {children: React.ReactNode}) =>  {
  const [currency, setCurrency] = useState<string>('USD');
  return (
    <Crypto.Provider value={{ currency, setCurrency }}>
      {children}
    </Crypto.Provider>
  )
}
export default CryptoContext;

export const useCrypto = () => useContext(Crypto);
