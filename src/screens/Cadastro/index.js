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
  RegisterButton,
  ButtonText,
  TextFooter,
  TextLogin,
} from "./styles";

export const Cadastro = () => {
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
            Crie sua conta e comece a{" "}
            <TitleHighlight>sonhar e planejar</TitleHighlight>
          </Title>
        </Header>

        <FormCard>
          <InputGroup>
            <Label>Nome Completo</Label>
            <Input 
              placeholder="Digite seu nome" 
              placeholderTextColor="#7998A3" 
            />
          </InputGroup>

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
              placeholder="Crie uma senha" 
              placeholderTextColor="#7998A3"
              secureTextEntry 
            />
          </InputGroup>

          <InputGroup>
            <Label>Confirmar Senha</Label>
            <Input 
              placeholder="Repita a senha" 
              placeholderTextColor="#7998A3"
              secureTextEntry 
            />
          </InputGroup>

          <RegisterButton activeOpacity={0.85}>
            <ButtonText>Criar conta</ButtonText>
          </RegisterButton>
        </FormCard>

        <TextFooter>
          Já possui cadastro? <TextLogin>Fazer login</TextLogin>
        </TextFooter>
      </ScrollContainer>
    </Container>
  );
};