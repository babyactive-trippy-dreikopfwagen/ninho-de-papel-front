import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f9fafb;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 12px;
  gap: 12px;
`;

export const ItemImage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 10px;
`;

export const ItemInfo = styled.View`
  flex: 1;
  gap: 4px;
`;

export const ItemName = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`;

export const ItemPrice = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #f8b4c8;
`;

export const QuantityRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const QuantityButton = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: #e5e7eb;
  align-items: center;
  justify-content: center;
`;

export const QuantityText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #374151;
  min-width: 20px;
  text-align: center;
`;

export const RemoveButton = styled.TouchableOpacity`
  padding: 8px;
`;

