import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  margin-top: 30px;
  background-color: #ffffff;
`;

export const LogoImage = styled.Image`
  width: 150px;
  height: 50px;
  resize-mode: contain;
`;

export const IconsRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const IconButton = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 8px;
  background-color: #f5f5f5;
`;

export const CartBadge = styled.View`
  position: absolute;
  top: 2px;
  right: 2px;
  background-color: #f8b4c8;
  border-radius: 10px;
  width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
`;

export const CartBadgeText = styled.Text`
  color: #ffffff;
  font-size: 10px;
  font-weight: bold;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 10px 15px;
  margin: 5px 20px 10px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 15px;
  color: #374151;
  margin-left: 10px;
`;

