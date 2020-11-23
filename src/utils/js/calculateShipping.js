const ShippingOptions = {
  courierGuy: 'courier_guy',
  store: 'in_store_collection'
}

function CourierGuy(weight) {
  const costPerKilo = 7

  const eco1 = (weight >= 0 && weight < 16)
  const eco2 = (weight >= 16 && weight <= 25)

  switch(true) {
    case eco1: { return 130 }
    case eco2: { return 190 }
    default: {
      // Note: always round up (Ceil)
      const remaining = Math.ceil(weight - 25)

      const remainingAccumalation = remaining * costPerKilo

      return 190 + remainingAccumalation
    }
  }
}

function InStoreCollection() {
  return 0
}

const Shipping = {
  courierGuy: CourierGuy,
  inStoreCollection: InStoreCollection
}

export {
  Shipping,
  ShippingOptions
}