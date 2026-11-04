import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  SafeContainer,
  ScrollContainer,
  HeaderBackButton,
  LogoContainer,
  TitleContainer,
  Title,
  Subtitle,
  FormContainer,
  InputGroup,
  InputLabel,
  InputWrapper,
  Input,
  EyeButton,
  ForgotPasswordButton,
  ForgotPasswordText,
  LoginButton,
  LoginButtonText,
  FooterContainer,
  FooterText,
  FooterLink,
} from './style';

export const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Atenção', 'Por favor, preencha o e-mail e a senha.');
      return;
    }

    setLoading(true);
    // Simulação de login (substitua pela chamada à API real depois)
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Bem-vindo!', 'Login realizado com sucesso no Ninho de Papel!', [
        { text: 'OK', onPress: () => navigation.navigate('HomeScreen') }
      ]);
    }, 1200);
  };

  return (
    <SafeContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollContainer>
          {/* Botão de voltar */}
          <HeaderBackButton onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Feather name="arrow-left" size={24} color="#374151" />
          </HeaderBackButton>

          {/* Logo da Loja */}
          <LogoContainer>
            <Image 
              source={require('../../assets/logo.png')} 
              style={{ width: 300, height: 135 }}
              resizeMode="contain" 
            /> 
          </LogoContainer>

          <TitleContainer>
            <Title>Bem-vindo de volta!</Title>
            <Subtitle>Acesse sua conta para continuar suas compras</Subtitle>
          </TitleContainer>

          <FormContainer>
            {/* E-mail */}
            <InputGroup>
              <InputLabel>E-mail</InputLabel>
              <InputWrapper>
                <Feather name="mail" size={20} color="#9CA3AF" style={{ marginRight: 10 }} />
                <Input
                  placeholder="seu@email.com"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </InputWrapper>
            </InputGroup>

            {/* Senha */}
            <InputGroup>
              <InputLabel>Senha</InputLabel>
              <InputWrapper>
                <Feather name="lock" size={20} color="#9CA3AF" style={{ marginRight: 10 }} />
                <Input
                  placeholder="Sua senha secreta"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <EyeButton onPress={() => setShowPassword(!showPassword)}>
                  <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#9CA3AF" />
                </EyeButton>
              </InputWrapper>
            </InputGroup>

            {/* Esqueci minha senha */}
            <ForgotPasswordButton onPress={() => Alert.alert('Recuperação', 'Função de recuperação de senha.')}>
              <ForgotPasswordText>Esqueceu a senha?</ForgotPasswordText>
            </ForgotPasswordButton>

            {/* Botão de Entrar */}
            <LoginButton onPress={handleLogin} activeOpacity={0.8} disabled={loading}>
              <LoginButtonText>
                {loading ? 'Entrando...' : 'Entrar'}
              </LoginButtonText>
            </LoginButton>

            {/* Ir para Cadastro */}
            <FooterContainer>
              <FooterText>Ainda não tem uma conta? </FooterText>
              <FooterLink onPress={() => navigation.navigate('Cadastro')}>
                Cadastre-se
              </FooterLink>
            </FooterContainer>
          </FormContainer>
        </ScrollContainer>
      </KeyboardAvoidingView>
    </SafeContainer>
  );
};