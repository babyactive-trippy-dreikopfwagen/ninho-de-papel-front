import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import {
  SafeContainer,
  ScrollContainer,
  HeaderBackButton,
  LogoContainer,
  LogoPlaceholderText,
  TitleContainer,
  Title,
  Subtitle,
  FormContainer,
  InputGroup,
  InputLabel,
  InputWrapper,
  Input,
  EyeButton,
  RegisterButton,
  RegisterButtonText,
  FooterContainer,
  FooterText,
  FooterLink,
} from './style';

export const Cadastro = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Sucesso!', 'Conta criada com sucesso no Ninho de Papel!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    }, 1500);
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

          {/* Espaço reservado para a Logo */}
          <LogoContainer>
            <Image source={require('../../assets/logo.png')} 
            style={{ width: 300, height: 135 }} 
            resizeMode="contain" />
          </LogoContainer>

          <TitleContainer>
            <Title>Crie sua conta</Title>
            <Subtitle>Junte-se ao Ninho de Papel e aproveite nossas novidades!</Subtitle>
          </TitleContainer>

          <FormContainer>
            {/* Nome */}
            <InputGroup>
              <InputLabel>Nome Completo</InputLabel>
              <InputWrapper>
                <Feather name="user" size={20} color="#9CA3AF" style={{ marginRight: 10 }} />
                <Input
                  placeholder="Seu nome completo"
                  placeholderTextColor="#9CA3AF"
                  value={name}
                  onChangeText={setName}
                />
              </InputWrapper>
            </InputGroup>

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

            {/* Confirmar Senha */}
            <InputGroup>
              <InputLabel>Confirmar Senha</InputLabel>
              <InputWrapper>
                <Feather name="lock" size={20} color="#9CA3AF" style={{ marginRight: 10 }} />
                <Input
                  placeholder="Repita sua senha"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <EyeButton onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Feather name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="#9CA3AF" />
                </EyeButton>
              </InputWrapper>
            </InputGroup>

            {/* Botão de Cadastro */}
            <RegisterButton onPress={handleRegister} activeOpacity={0.8} disabled={loading}>
              <RegisterButtonText>
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </RegisterButtonText>
            </RegisterButton>

            {/* Rodapé - Link para Login */}
            <FooterContainer>
              <FooterText>Já tem uma conta? </FooterText>
              <FooterLink onPress={() => navigation.goBack()}>
                Faça login
              </FooterLink>
            </FooterContainer>
          </FormContainer>
        </ScrollContainer>
      </KeyboardAvoidingView>
    </SafeContainer>
  );
};