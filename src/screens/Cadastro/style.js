import styled from 'styled-components/native';

export const SafeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const HeaderBackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #f3f4f6;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  margin-bottom: 10px;
`;

export const LogoContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const LogoPlaceholderText = styled.Text`
  color: #9ca3af;
  font-size: 14px;
  font-weight: 600;
`;

export const TitleContainer = styled.View`
  margin-bottom: 24px;
`;

export const Title = styled.Text`
  font-size: 26px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 6px;
`;

export const Subtitle = styled.Text`
  font-size: 15px;
  color: #6b7280;
`;

export const FormContainer = styled.View`
  width: 100%;
`;

export const InputGroup = styled.View`
  margin-bottom: 16px;
`;

export const InputLabel = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding-horizontal: 14px;
  height: 52px;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #1f2937;
`;

export const EyeButton = styled.TouchableOpacity`
  padding: 4px;
`;

export const RegisterButton = styled.TouchableOpacity`
  background-color: #87ceeb;
  border-radius: 10px;
  height: 52px;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  box-shadow: 0px 4px 8px rgba(135, 206, 235, 0.3);
`;

export const RegisterButtonText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
`;

export const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 24px;
`;

export const FooterText = styled.Text`
  font-size: 14px;
  color: #6b7280;
`;

export const FooterLink = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: #87ceeb;
`;