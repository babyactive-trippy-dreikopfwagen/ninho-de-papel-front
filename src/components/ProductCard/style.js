import styled from 'styled-components/native';

export const CardContainer = styled.TouchableOpacity`
  width: 175px;
  background-color: #f9fafb;
  border-radius: 12px;
  overflow: hidden;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 4px;
  elevation: 3;
`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 150px;
`;

export const ProductInfo = styled.View`
  padding: 10px;
  gap: 6px;
`;

export const ProductName = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
`;

export const PriceRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProductPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #f8b4c8;
`;

export const AddButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: #87ceeb;
  align-items: center;
  justify-content: center;
`;

export const FeaturedBadge = styled.View`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: #fde68a;
  padding: 3px 8px;
  border-radius: 10px;
`;

export const FeaturedBadgeText = styled.Text`
  font-size: 10px;
  font-weight: bold;
  color: #92400e;
`;

