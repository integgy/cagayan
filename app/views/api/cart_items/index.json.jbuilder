@cart_items.each do |item|
  json.set! item.id do
    total_price = (item.product.price * item.quantity).round(2)
    json.extract! item, :id, :product_id, :quantity
    json.totalPrice  total_price
  end
end
