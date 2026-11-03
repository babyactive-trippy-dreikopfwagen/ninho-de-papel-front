import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #0C3C4A;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 24,
    justifyContent: "center",
    flexGrow: 1,
  },
})`
  flex: 1;
`;

/* --- CABEÇALHO E LOGÓTIPO APROXIMADO --- */
export const Header = styled.View`
  margin-top: 10px;
  margin-bottom: 28px;
`;

export const LogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
`;

export const Title = styled.Text`
  font-size: 30px;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 38px;
`;

export const TitleHighlight = styled.Text`
  color: #E5A853;
`;

/* --- CARD DO FORMULÁRIO --- */
export const FormCard = styled.View`
  background-color: #124B5C;
  padding: 24px 20px;
  border-radius: 24px;
  gap: 18px;
  border: 1px solid #1C5A6C;
  shadow-color: #000;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.15;
  shadow-radius: 12px;
  elevation: 4;
`;

export const InputGroup = styled.View`
  gap: 6px;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #E0EBF0;
`;

export const Input = styled.TextInput`
  background-color: #08303C;
  border: 1px solid #1F6073;
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 16px;
  color: #FFFFFF;
`;

export const RegisterButton = styled.TouchableOpacity`
  background-color: #C98533;
  border-radius: 12px;
  padding: 16px 0;
  align-items: center;
  margin-top: 8px;
  shadow-color: #C98533;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  elevation: 3;
`;

export const ButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 700;
`;

export const TextFooter = styled.Text`
  font-size: 15px;
  color: #D1E0E5;
  text-align: center;
  margin-top: 28px;
`;

export const TextLogin = styled.Text`
  color: #E5A853;
  font-weight: 700;
  text-decoration-line: underline;
`;