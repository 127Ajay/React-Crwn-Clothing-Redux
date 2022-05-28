import {
    CheckoutitemContainer,
    ImageContainer,
    Name,
    Price,
    Quantity,
    RemoveButton,
} from "./checkout-item.styles";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const CheckOutItem = ({ cartItem }) => {
    const { clearItemFromCart, addItemToCart, removeItemFromCart } =
        useContext(CartContext);
    const { name, quantity, price, imageUrl } = cartItem;

    const clearItemHandler = () => clearItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);

    return (
        <CheckoutitemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <div className="arrow" onClick={removeItemHandler}>
                    &#10094;
                </div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={addItemHandler}>
                    &#10095;
                </div>
            </Quantity>
            <Price>{price}</Price>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutitemContainer>
    );
};

export default CheckOutItem;
