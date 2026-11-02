import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Container,
  ScrollContainer,
  Header,
  LogoContainer,
  LogoIcon,
  BrandName,
  Title,
  TitleHighlight,
  FormCard,
  InputGroup,
  Label,
  Input,
  ForgotPassword,
  ForgotPasswordText,
  LoginButton,
  ButtonText,
  TextFooter,
  TextRegister,
} from "./styles";

export const Login = () => {
  return (
    <Container>
      <StatusBar style="light" backgroundColor="#0C3C4A" />
      <ScrollContainer showsVerticalScrollIndicator={false}>
        <Header>
          <LogoContainer>
            <LogoIcon>🪹</LogoIcon>
            <BrandName>Ninho de Papel</BrandName>
          </LogoContainer>

          <Title>
            Que bom te ver de volta! Faça seu <TitleHighlight>login</TitleHighlight>
          </Title>
        </Header>

        <FormCard>
          <InputGroup>
            <Label>E-mail</Label>
            <Input 
              placeholder="seuemail@exemplo.com" 
              placeholderTextColor="#7998A3"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </InputGroup>

          <InputGroup>
            <Label>Senha</Label>
            <Input 
              placeholder="Digite sua senha" 
              placeholderTextColor="#7998A3"
              secureTextEntry 
            />
          </InputGroup>

          <ForgotPassword activeOpacity={0.7}>
            <ForgotPasswordText>Esqueceu a senha?</ForgotPasswordText>
          </ForgotPassword>

          <LoginButton activeOpacity={0.85}>
            <ButtonText>Entrar</ButtonText>
          </LoginButton>
        </FormCard>

        <TextFooter>
          Ainda não possui conta? <TextRegister>Cadastre-se</TextRegister>
        </TextFooter>
      </ScrollContainer>
    </Container>
  );
};