import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: 10px;
  padding-horizontal: 20px;
`;

export const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: 700;
  background-color: #87ceeb;
  padding: 5px 12px;
  border-radius: 6px;
  overflow: hidden;
  color: #ffffff;
`;

export const BannerScroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { gap: 12, paddingRight: 20 },
})``;

export const BannerCard = styled.View`
  width: 340px;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
`;

export const BannerImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const BannerOverlay = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.35);
`;

export const BannerTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
`;

export const BannerSubtitle = styled.Text`
  font-size: 13px;
  color: #f0f0f0;
  margin-top: 2px;
`;

