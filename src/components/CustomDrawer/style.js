import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
  padding: 20px;
`;

export const CloseButton = styled.TouchableOpacity`
  align-self: flex-end;
  padding: 10px;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: #e0e0e0;
  margin-top: 10px;
  margin-bottom: 25px;
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 18px 15px;
  background-color: #f0f0f0;
  border-radius: 6px;
  margin-bottom: 18px;
`;

export const MenuText = styled.Text`
  font-size: 17px;
  font-weight: 500;
  color: #333333;
`;

export const BadgeRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const Badge = styled.View`
  background-color: #f8b4c8;
  border-radius: 12px;
  padding: 2px 8px;
  min-width: 24px;
  align-items: center;
`;

export const BadgeText = styled.Text`
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
`;

