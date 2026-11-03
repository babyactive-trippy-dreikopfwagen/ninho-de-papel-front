import styled from 'styled-components/native';

export const SafeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

export const HeaderContainer = styled.View`
  align-items: center;
  padding-top: 16px;
  padding-bottom: 12px;
  padding-horizontal: 20px;
`;

export const TopBarActions = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const ActionButton = styled.TouchableOpacity`
  padding: 8px;
  border-radius: 8px;
  background-color: #f3f4f6;
`;

export const HeaderLogo = styled.Image`
  width: 160px;
  height: 50px;
  resize-mode: contain;
`;

export const DividerLine = styled.View`
  width: 90%;
  height: 1.5px;
  background-color: #9ca3af;
  margin-top: 8px;
  margin-bottom: 16px;
  align-self: center;
`;

export const ContentScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  showsVerticalScrollIndicator: false,
})``;

export const TwoColumnSection = styled.View`
  flex-direction: row;
  gap: 16px;
  margin-bottom: 24px;
`;

export const ImageWrapper = styled.View`
  flex: 1;
  border-width: 1px;
  border-color: #9ca3af;
  border-radius: 8px;
  padding: 8px;
  background-color: #fafafa;
  align-items: center;
  justify-content: center;
`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 220px;
  resize-mode: contain;
`;

export const InfoColumn = styled.View`
  flex: 1;
  justify-content: space-between;
  gap: 8px;
`;

export const CategoryTag = styled.Text`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #87ceeb;
  letter-spacing: 0.5px;
`;

export const TitleText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  line-height: 22px;
`;

export const PriceText = styled.Text`
  font-size: 22px;
  font-weight: 800;
  color: #f8b4c8;
`;

export const SpecLine = styled.View`
  background-color: #e5e7eb;
  height: 10px;
  border-radius: 5px;
  margin-vertical: 3px;
`;

export const DescriptionBox = styled.View`
  background-color: #f9fafb;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  border-width: 1px;
  border-color: #f3f4f6;
`;

export const DescriptionTitle = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: #374151;
  margin-bottom: 8px;
`;

export const DescriptionText = styled.Text`
  font-size: 14px;
  color: #6b7280;
  line-height: 22px;
`;

export const QuantitySection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: #f9fafb;
  padding: 12px 16px;
  border-radius: 12px;
`;

export const QuantityLabel = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #374151;
`;

export const QuantityControls = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const QuantityBtn = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: #87ceeb;
  align-items: center;
  justify-content: center;
`;

export const QuantityVal = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  min-width: 24px;
  text-align: center;
`;

export const AddToCartBtn = styled.TouchableOpacity`
  background-color: #f8b4c8;
  padding-vertical: 14px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 14px;
  shadow-color: #f8b4c8;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  elevation: 3;
`;

export const AddToCartText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
`;

export const GoHomeBtn = styled.TouchableOpacity`
  background-color: #e5e7eb;
  padding-vertical: 14px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const GoHomeText = styled.Text`
  color: #374151;
  font-size: 15px;
  font-weight: 600;
`;

