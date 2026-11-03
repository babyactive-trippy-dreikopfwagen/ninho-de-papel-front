import styled from 'styled-components/native';

export const SafeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

export const TopBar = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
  padding-horizontal: 16px;
  padding-vertical: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #f3f4f6;
  gap: 12px;
`;

export const BackButton = styled.TouchableOpacity`
  padding: 6px;
  border-radius: 8px;
  background-color: #f3f4f6;
`;

export const TitleContainer = styled.View`
  flex: 1;
`;

export const ScreenTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
`;

export const SubTitle = styled.Text`
  font-size: 12px;
  color: #6b7280;
`;

export const SearchInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f3f4f6;
  border-radius: 10px;
  padding: 8px 14px;
  margin: 12px 16px 8px;
  gap: 8px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 14px;
  color: #1f2937;
`;

export const FilterScroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 10,
  },
})``;

export const FilterChip = styled.TouchableOpacity`
  padding-vertical: 8px;
  padding-horizontal: 14px;
  border-radius: 20px;
  background-color: ${(props) => (props.active ? '#87CEEB' : '#F3F4F6')};
  border-width: 1px;
  border-color: ${(props) => (props.active ? '#87CEEB' : '#E5E7EB')};
`;

export const FilterChipText = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => (props.active ? '#FFFFFF' : '#4B5563')};
`;

export const ListContainer = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    paddingTop: 10,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
})``;

