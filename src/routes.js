import { CoinTable } from "./components/coinTable/coinTable";
import { Currency } from "./components/currency/currency";

export const routes = [
  {path: '/', element: <CoinTable />},
  {path: '/:id', element: <Currency/>}
]