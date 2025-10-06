import { Route, Routes } from 'react-router-dom';

//Components
import Dashboard from '../Dashboard/Dashboard'
import CustomerList from '../CustomerList/CustomerList'
import SalePage from '../SaleForm/SaleForm'
import PurchaseForm from '../PurchaseForm/PurchaseForm'
import VendorList from '../VendorList/VendorList';
import AccountsList from '../AccountsList/AccountsList';
import InventoryList from '../InventoryList/InventoryList';

export default function AppRoutes() {
/*     const { user } = useSelector((state) => state.auth); */

  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/CustomerList" element={<CustomerList />} />
        <Route path="/SaleForm" element={<SalePage />} />
        <Route path="/InventoryList" element={<InventoryList />} />
        <Route path="/PurchaseForm" element={<PurchaseForm />} />
        <Route path="/VendorList" element={<VendorList />} />
        <Route path="/AccountList" element={<AccountsList />} />

        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>

    </div>
  )
}
