import { useParams } from "react-router-dom"

const ProductDetail = () => {
    const params = useParams()
    return <p>{params.productId}</p>
}
export default ProductDetail