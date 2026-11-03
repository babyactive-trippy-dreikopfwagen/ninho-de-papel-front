import React from "react";
import { TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { BrandLogo } from "../../components/brand-logo";
import {
  Container,
  ScrollContainer,
  Header,
  LogoContainer,
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

export const Cadastro = ({ onNavigate }) => {
  return (
    <Container>
      <StatusBar style="light" backgroundColor="#0C3C4A" />
      <ScrollContainer showsVerticalScrollIndicator={false}>
        <Header>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Voltar para a tela inicial"
            onPress={() => onNavigate("welcome")}>
            <LogoContainer>
              <BrandLogo width={220} height={42} />
            </LogoContainer>
          </TouchableOpacity>

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
          Já possui cadastro?           <TextLogin onPress={() => onNavigate("login")}>
            Fazer login
          </TextLogin>
        </TextFooter>
      </ScrollContainer>
    </Container>
  );
};