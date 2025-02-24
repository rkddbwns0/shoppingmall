const QuantityButton = ({ className, quantity, setQuantity, stock }) => {
    return (
        <div className={className}>
            <button
                onClick={() => setQuantity((prev) => quantity - 1)}
                disabled={quantity <= 1}
                style={{
                    flex: 1,
                    height: '100%',
                    border: 'none',
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: '10px',
                    backgroundColor: 'white',
                    borderRight: '1.5px solid rgb(194, 192, 192)',
                }}
            >
                -
            </button>
            <p style={{ margin: '0 15px', lineHeight: '35px' }}>{quantity}</p>
            <button
                onClick={() => setQuantity((prev) => quantity + 1)}
                disabled={quantity === stock}
                style={{
                    flex: 1,
                    height: '100%',
                    border: 'none',
                    borderTopRightRadius: '10px',
                    borderBottomRightRadius: '10px',
                    backgroundColor: 'white',
                    borderLeft: '1.5px solid rgb(194, 192, 192)',
                }}
            >
                +
            </button>
        </div>
    );
};

export default QuantityButton;
