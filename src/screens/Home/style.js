import styled from 'styled-components/native';

export const SafeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

export const MainScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 40,
  },
  showsVerticalScrollIndicator: false,
})``;

export const Section = styled.View`
  margin-top: 24px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 20px;
  margin-bottom: 14px;
`;

export const BadgeTitle = styled.View`
  background-color: #87ceeb;
  padding-vertical: 5px;
  padding-horizontal: 12px;
  border-radius: 6px;
  align-self: flex-start;
`;

export const BadgeTitleText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
`;

export const ArrowButton = styled.TouchableOpacity`
  width: 34px;
  height: 34px;
  border-radius: 17px;
  background-color: #e5e7eb;
  align-items: center;
  justify-content: center;
`;

export const HorizontalProductScroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    gap: 14,
    paddingHorizontal: 20,
  },
})``;

export const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-horizontal: 20px;
  row-gap: 16px;
`;

