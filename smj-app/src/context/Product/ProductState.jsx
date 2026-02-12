const ProductState = (props) => {
 const initialState = {
        products: [
            {
                id: 1,
                name: 'Product 1',
                description: 'Description of Product 1',
                price: 10.99,
                image: 'https://via.placeholder.com/150'
            },
        ]

}

return (
    <ProductContext.Provider value={{ ...initialState }}>
        {props.children}
    </ProductContext.Provider>
)
}

export default ProductState;
