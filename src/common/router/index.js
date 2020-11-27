import CustomersView from '../components/customersView'
import CustomerInfo from '../components/customerInfo';
export const routes=[
    {
        path:"/",
        component:CustomersView,
        exact:true
    },
    {
        path:"/:customerId",
        component:CustomerInfo,
        exact:false
    }
]