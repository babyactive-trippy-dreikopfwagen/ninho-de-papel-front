import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SymbolView } from 'expo-symbols';
import { BrandLogo } from '../../components/brand-logo';
import { colors } from '../Home/style';
import { styles } from './style';

export function Contact({ onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = 'Informe seu nome.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Informe um e-mail válido.';
    }
    if (!message.trim()) nextErrors.message = 'Escreva sua mensagem.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    Alert.alert(
      'Mensagem pronta',
      'O formulário ainda não está conectado ao serviço de atendimento.'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor={colors.deepBlue} />
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Voltar para a página inicial"
          onPress={onBack}
          style={styles.backButton}>
          <Symbol
            name={{ ios: 'arrow.left', android: 'arrow_back', web: 'arrow_back' }}
            size={23}
            tintColor={colors.cream}
          />
        </TouchableOpacity>
        <View style={styles.brand}>
          <BrandLogo width={155} height={36} />
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.intro}>
            <Text style={styles.eyebrow}>ESTAMOS AQUI PARA AJUDAR</Text>
            <Text style={styles.title}>
              Vamos conversar{'\n'}
              <Text style={styles.titleHighlight}>?</Text>
            </Text>
            <Text style={styles.description}>
              Tem alguma dúvida ou sugestão? Envie uma mensagem para a gente.
            </Text>
          </View>

          <View style={styles.illustration}>
            <View style={styles.envelopeBack}>
              <Symbol
                name={{ ios: 'envelope', android: 'mail', web: 'mail' }}
                size={58}
                tintColor={colors.gold}
              />
            </View>
            <View style={styles.illustrationSparkleOne}>
              <Symbol
                name={{ ios: 'sparkle', android: 'auto_awesome', web: 'auto_awesome' }}
                size={22}
                tintColor={colors.gold}
              />
            </View>
            <View style={styles.illustrationSparkleTwo}>
              <Symbol
                name={{ ios: 'sparkle', android: 'auto_awesome', web: 'auto_awesome' }}
                size={15}
                tintColor={colors.midBlue}
              />
            </View>
          </View>

          <View style={styles.formCard}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Seu nome</Text>
              <TextInput
                accessibilityLabel="Seu nome"
                autoCapitalize="words"
                onChangeText={setName}
                placeholder="Como podemos te chamar?"
                placeholderTextColor={colors.muted}
                returnKeyType="next"
                style={styles.input}
                value={name}
              />
              {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                accessibilityLabel="E-mail"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder="seuemail@exemplo.com"
                placeholderTextColor={colors.muted}
                returnKeyType="next"
                style={styles.input}
                value={email}
              />
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Mensagem</Text>
              <TextInput
                accessibilityLabel="Mensagem"
                multiline
                onChangeText={setMessage}
                placeholder="Conte para nós como podemos ajudar..."
                placeholderTextColor={colors.muted}
                textAlignVertical="top"
                style={[styles.input, styles.messageInput]}
                value={message}
              />
              {errors.message ? <Text style={styles.errorText}>{errors.message}</Text> : null}
            </View>

            <TouchableOpacity
              accessibilityRole="button"
              onPress={handleSubmit}
              style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Enviar mensagem</Text>
              <Symbol
                name={{ ios: 'paperplane.fill', android: 'send', web: 'send' }}
                size={18}
                tintColor={colors.cream}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.footerNote}>
            <Symbol
              name={{ ios: 'heart.fill', android: 'favorite', web: 'favorite' }}
              size={16}
              tintColor={colors.gold}
            />
            <Text style={styles.footerText}>Será um prazer falar com você!</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
