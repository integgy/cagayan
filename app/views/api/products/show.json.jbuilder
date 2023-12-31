rating = Review.where(product_id: @product.id).average(:rating).round()


json.extract! @product, :id, :name, :price, :description,  :category
json.rating rating


if @product.images.attached?
  json.imgUrls  @product.images.map {|img| url_for(img)}
else
  dir_path = "frontend/public/assets/product-images/#{@product.name}"
  if File.directory?(dir_path)
    files = Dir.entries(dir_path).select { |file| File.file?(File.join(dir_path, file)) }

    file_paths = []

    files.each do |file|
      file_path = File.join(dir_path, file)

      file_paths << file_path.to_s[15..-1]
    end

    json.imgUrls file_paths
  else
    json.imgUrls []
  end
end
