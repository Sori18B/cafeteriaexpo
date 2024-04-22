import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Menu from './components/lateralmenu';

export default function App() {
  return (
    <SafeAreaProvider>
      <Menu />
    </SafeAreaProvider>
  );
}
