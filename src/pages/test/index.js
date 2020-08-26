import React from 'react'

// Components
import ShopItemRow from '../../components/shopItemRow'

const DummyData = [
  {
    name: 'Electric Wheelchair – KD Smart – Heavy Duty',
    category: [
      {
        name: 'Mobility',
        categoryId: 'asdasd'
      },
    ],
    price: 4000,
    itemId: 'asdasdasd',
    imgUrl: 'asdasdasd'
  },
  {
    name: 'Electric Wheelchair – KD Smart – Heavy Duty',
    category: [
      {
        name: 'Mobility',
        categoryId: 'asdasd'
      },
    ],
    price: 4000,
    itemId: 'asdasdasd',
    imgUrl: 'asdasdasd'
  },
  {
    name: 'Electric Wheelchair – KD Smart – Heavy Duty',
    category: [
      {
        name: 'Mobility',
        categoryId: 'asdasd'
      },
    ],
    price: 4000,
    itemId: 'asdasdasd',
    imgUrl: 'asdasdasd'
  },
  {
    name: 'Electric Wheelchair – KD Smart – Heavy Duty',
    category: [
      {
        name: 'Mobility',
        categoryId: 'asdasd'
      },
    ],
    price: 4000,
    itemId: 'asdasdasd',
    imgUrl: 'asdasdasd'
  },
]

const TestPage = () => {
  return (
    <div>
      <ShopItemRow
        products={DummyData}
        title='Our Feature Products'
      />
    </div>
  )
}

export default TestPage
