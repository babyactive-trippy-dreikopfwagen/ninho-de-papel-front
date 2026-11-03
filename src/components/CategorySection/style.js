import styled from 'styled-components/native';

export const ContainerCategory = styled.View`
  margin-top: 18px;
  padding-horizontal: 20px;
`;

export const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const TextTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #374151;
`;

export const TitleLine = styled.View`
  flex: 1;
  height: 2px;
  background-color: #374151;
  margin-left: 10px;
`;

export const Scroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { gap: 10, paddingRight: 20 },
})``;

