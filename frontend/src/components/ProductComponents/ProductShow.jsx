import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchProduct, selectProduct } from "../../store/productReducer"
import ReviewIndex from "../ReviewComponents/ReviewIndex"
import { addCartItem } from "../../store/cartItem.Reducer"
import { fetchReviews, selectReviewsArray } from "../../store/reviewReducer"
import { rating } from "../../utils/dateUtil"
import "./ProductShow.css"




const ProductShow = () => {
    const dispatch = useDispatch()
    const {productId} = useParams()
    const reviews = useSelector(selectReviewsArray)
    const product = useSelector(selectProduct(productId))

    

    const currentUser = useSelector(state => {
        const id = state.session.currentUserId;
        return state.users[id]
    })

    useEffect(()=>{
        dispatch(fetchProduct(productId)).then(
            dispatch(fetchReviews(productId))
        )
    },[dispatch, productId])
    
    const handleClick = () => {
        const payload = {
            product_id: productId,
            user_id: currentUser.id,
            quantity: 1
        }

        dispatch(addCartItem(payload))
    }
    
    if (product){
        return (
            <div className="show-container">
                <div className="show-ad-container">
                
                </div>
                <div className="show-details-container">
                    <div className="show-details-left">
                        <div className="show-img-container">
                            <div className="show-img-main"><img src={product.imgUrls[0]} alt="" /> </div>
                            <div className="show-img-sub-container">
                                <div className="show-img-sub">
                                    <img src={product.imgUrls[0]} alt="" />
                                </div>
                                <div className="show-img-sub">
                                    <img src={product.imgUrls[1]} alt="" />
                                </div>
                                <div className="show-img-sub">
                                    <img src={product.imgUrls[2]} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="show-details-middle">
                            <div className="show-product-details">
                                <div className="show-details-title">{product.name}</div>
                                <div className="show-details-price">
                                    <h5>${product.price}</h5>
                                    <div>{rating(product.rating)}</div>
                                </div>
                                <div className="show-details-description">
                                    <h3>About this item</h3>
                                    <p>{product?.description}</p>
                                </div>
                            </div>
                    </div>
                    <div className="show-details-right">
                        <div className="show-buy-container">
                            <div className="show-buy-menu-main">
                                <p>${product?.price}</p>
                                <div className="show-buy-buttons">
                                    <button 
                                    className="show-buy-cart"
                                    onClick={handleClick}
                                    >Add to Cart</button>
                                    <button className="show-buy-now">Buy Now</button>
                                </div>
                            </div>
                            <div className="show-buy-menu-sub"></div>
                        </div>
                    </div>
                </div>
                <div className="show-reviews-container">
                    <ReviewIndex
                    productId={productId}
                    reviews={reviews}
                    />
                </div>
            </div>
        )
    }
}

export default ProductShow