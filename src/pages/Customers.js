import { useState, useEffect} from 'react'
import axios from 'axios'
import CustomerCard from '../components/CustomerCard'

const Customers = () => {
  const [customers, setCustomers] = useState([])

  console.log(customers)

  useEffect(() =>{
    axios.get('https://reqres.in/api/users')
      .then(response => {
        const { data } = response.data

        setCustomers(data)
      })
  }, [])

  return (
    <>
      <h1>Customers</h1>
      {
        customers.map(item => (
          <CustomerCard
            first_name={item.first_name}
            last_name={item.last_name}
            email={item.email}
            avatar={item.avatar}
          />
        ))
      }
    </>
  )
}

export default Customers