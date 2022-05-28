import {
    BackgroundImage,
    DirectoryItemBodyContainer,
    DirectoryItemContainer,
} from "./directory-item.styles";

import { useNavigate } from "react-router-dom";

const DirectoryItem = ({ category }) => {
    const { imageUrl, title, route } = category;
    const Navigate = useNavigate();

    const onNavigateHandler = () => Navigate(route);

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl}></BackgroundImage>
            <DirectoryItemBodyContainer>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </DirectoryItemBodyContainer>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;
