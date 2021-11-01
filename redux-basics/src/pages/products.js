import { Link, useHistory, useLocation } from "react-router-dom"

const productList = [
    { id: 1, name: 'books' },
    { id: 2, name: 'pens' }
]
const Products = () => {
    const history = useHistory()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const isAsc = queryParams.get('sort') === 'asc'
    const sortHandler = () => {
        // history.push('/products?sort=' + (isAsc ? 'desc' : 'asc'))
        // history.push(`${location.pathname}?sort=${isAsc ? 'desc' : 'asc'}`)
        //another way
        history.push({
            pathname:location.pathname,
            search:`?sort=${isAsc ? 'desc' : 'asc'}`
        })
    }
    return (
        <div>
            <button onClick={sortHandler}>Sort by {isAsc? 'Descending':'Ascending'}</button>
            <ul>
                {productList.map(product => <li key={product.id}>
                    <Link to={`products/${product.id}`}>
                        {product.name}
                    </Link>
                </li>)}

            </ul>
        </div>
    )
}

export default Products