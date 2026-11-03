import styled from 'styled-components/native';

export const SafeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

export const TopBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 16px;
  padding-vertical: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #f3f4f6;
`;

export const BackButton = styled.TouchableOpacity`
  padding: 6px;
  border-radius: 8px;
  background-color: #f3f4f6;
`;

export const ScreenTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
`;

export const ClearButton = styled.TouchableOpacity`
  padding: 6px;
`;

export const ClearText = styled.Text`
  font-size: 13px;
  color: #ef4444;
  font-weight: 600;
`;

export const ListContainer = styled.FlatList.attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const SummaryCard = styled.View`
  background-color: #f9fafb;
  border-top-width: 1px;
  border-top-color: #e5e7eb;
  padding: 20px;
  gap: 12px;
`;

export const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SummaryLabel = styled.Text`
  font-size: 14px;
  color: #6b7280;
`;

export const SummaryValue = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #374151;
`;

export const TotalLabel = styled.Text`
  font-size: 17px;
  font-weight: 700;
  color: #1f2937;
`;

export const TotalValue = styled.Text`
  font-size: 20px;
  font-weight: 800;
  color: #f8b4c8;
`;

export const CheckoutButton = styled.TouchableOpacity`
  background-color: #87ceeb;
  padding-vertical: 16px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
  shadow-color: #87ceeb;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  elevation: 3;
`;

export const CheckoutButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
`;

export const ContinueShoppingButton = styled.TouchableOpacity`
  padding-vertical: 10px;
  align-items: center;
  justify-content: center;
`;

export const ContinueShoppingText = styled.Text`
  color: #6b7280;
  font-size: 14px;
  font-weight: 600;
`;

export const EmptyWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 30px;
  gap: 16px;
`;

export const EmptyTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #374151;
`;

export const EmptySubtitle = styled.Text`
  font-size: 14px;
  color: #9ca3af;
  text-align: center;
  line-height: 20px;
`;

export const ShopNowButton = styled.TouchableOpacity`
  background-color: #87ceeb;
  padding-vertical: 12px;
  padding-horizontal: 24px;
  border-radius: 10px;
  margin-top: 10px;
`;

export const ShopNowButtonText = styled.Text`
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
`;

