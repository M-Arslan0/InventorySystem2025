import { Route, Routes } from 'react-router-dom';

//Components
import Dashboard from '../Dashboard/Dashboard'
import CustomerList from '../CustomerList/CustomerList'
import SalePage from '../SaleForm/SaleForm'
import PurchaseForm from '../PurchaseForm/PurchaseForm'
import SupplierList from '../SupplierList/SupplierList';
import AccountsManagement from '../AccountsManagement/AccountsManagement';
import InventoryList from '../InventoryList/InventoryList';
import Settings from '../Settings/Settings';

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
        <Route path="/SupplierList" element={<SupplierList />} />
        <Route path="/AccountsManagement" element={<AccountsManagement />} />
        <Route path="/Settings" element={<Settings />} />

        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>

    </div>
  )
}
