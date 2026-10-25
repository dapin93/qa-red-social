import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { FeedScreen } from './src/screens/FeedScreen';
import { SearchScreen } from './src/screens/SearchScreen';
import { UploadScreen } from './src/screens/UploadScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { Colors } from './src/theme/colors';

type TabType = 'feed' | 'search' | 'upload' | 'chat' | 'profile';

interface TabItem {
  id: TabType;
  label: string;
  icon: string;
}

const TABS: TabItem[] = [
  { id: 'feed', label: 'Feed', icon: '🏠' },
  { id: 'search', label: 'Buscar', icon: '🔍' },
  { id: 'upload', label: 'Subir', icon: '➕' },
  { id: 'chat', label: 'Chat', icon: '💬' },
  { id: 'profile', label: 'Perfil', icon: '👤' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('feed');
  const { width } = useWindowDimensions();

  // Si la pantalla es más ancha que un móvil, aplicamos contenedor simulador móvil para una experiencia limpia y proporcionada
  const isDesktop = width > 520;

  const renderCurrentScreen = () => {
    switch (activeTab) {
      case 'feed':
        return <FeedScreen />;
      case 'search':
        return <SearchScreen />;
      case 'upload':
        return <UploadScreen />;
      case 'chat':
        return <ChatScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <FeedScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.outerBackground}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* Header Informativo para vista Desktop Web */}
      {isDesktop && (
        <View style={styles.desktopTopBar}>
          <View style={styles.desktopLogoRow}>
            <Text style={styles.desktopAppLogo}>✨</Text>
            <Text style={styles.desktopAppTitle}>SocialApp Mobile</Text>
            <View style={styles.desktopBadge}>
              <Text style={styles.desktopBadgeText}>Web Preview • React Native</Text>
            </View>
          </View>
          <Text style={styles.desktopSubtitle}>
            Diseñado y optimizado para dispositivos móviles con soporte responsivo web.
          </Text>
        </View>
      )}

      {/* Contenedor Mockup Móvil */}
      <View style={[styles.appFrame, isDesktop && styles.appFrameDesktop]}>
        {/* Dynamic Island / Barra superior de móvil simulada en desktop */}
        {isDesktop && (
          <View style={styles.mockupStatusBar}>
            <Text style={styles.mockupTime}>9:41</Text>
            <View style={styles.mockupIsland} />
            <Text style={styles.mockupIcons}>5G 🔋</Text>
          </View>
        )}

        {/* Pantalla Activa */}
        <View style={styles.screenContainer}>
          {renderCurrentScreen()}
        </View>

        {/* Barra de Navegación Inferior (Tabs) */}
        <View style={styles.tabBar}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
                onPress={() => setActiveTab(tab.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>
                  {tab.icon}
                </Text>
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerBackground: {
    flex: 1,
    backgroundColor: '#090D16', // Fondo oscuro profundo para desktop
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Platform.OS === 'web' ? 12 : 0,
  },
  desktopTopBar: {
    alignItems: 'center',
    marginBottom: 10,
  },
  desktopLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  desktopAppLogo: {
    fontSize: 20,
  },
  desktopAppTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  desktopBadge: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  desktopBadgeText: {
    color: '#A5B4FC',
    fontSize: 11,
    fontWeight: '700',
  },
  desktopSubtitle: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 4,
  },
  appFrame: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.background,
  },
  appFrameDesktop: {
    maxWidth: 440,
    maxHeight: 860,
    borderRadius: 36,
    overflow: 'hidden',
    borderWidth: 8,
    borderColor: '#1E293B',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 20,
  },
  mockupStatusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 6,
    backgroundColor: Colors.background,
  },
  mockupTime: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '700',
  },
  mockupIsland: {
    width: 90,
    height: 18,
    backgroundColor: '#000000',
    borderRadius: 10,
  },
  mockupIcons: {
    color: '#F8FAFC',
    fontSize: 11,
  },
  screenContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.tabBar,
    borderTopWidth: 1,
    borderTopColor: Colors.cardBorder,
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'web' ? 12 : 14,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    transform: [{ scale: 1.05 }],
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 3,
    opacity: 0.6,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 11,
    color: Colors.tabBarInactive,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: '800',
  },
});
