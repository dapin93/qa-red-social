import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { CURRENT_USER } from '../data/mockData';
import { Colors } from '../theme/colors';

// El grid usará flexbox responsivo con aspectRatio

export const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState(CURRENT_USER);
  const [isFollowing, setIsFollowing] = useState(false);

  // Toggle simulación de Seguir / Dejar de seguir
  const handleToggleFollow = () => {
    setIsFollowing((prev) => !prev);
    setUser((prev) => ({
      ...prev,
      followersCount: !isFollowing ? prev.followersCount + 1 : prev.followersCount - 1,
    }));
  };

  // Fotos de ejemplo para el grid del perfil
  const gridImages = [
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=300&q=80',
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Barra superior de Perfil */}
      <View style={styles.topBar}>
        <Text style={styles.topUsername}>@{user.username}</Text>
        <TouchableOpacity style={styles.settingsIcon}>
          <Text style={styles.iconText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Cabecera Principal: Avatar y Métricas */}
      <View style={styles.headerSection}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: user.avatarUrl }} style={styles.avatarImage} />
          <View style={styles.onlineBadge} />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{user.postsCount}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{user.followersCount}</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{user.followingCount}</Text>
            <Text style={styles.statLabel}>Siguiendo</Text>
          </View>
        </View>
      </View>

      {/* Nombre y Biografía */}
      <View style={styles.bioSection}>
        <Text style={styles.fullName}>{user.fullName}</Text>
        <Text style={styles.bioText}>{user.bio}</Text>
      </View>

      {/* Botones de Acción (Seguir / Dejar de seguir / Mensaje) */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.followButton,
            isFollowing ? styles.followingButton : styles.notFollowingButton,
          ]}
          onPress={handleToggleFollow}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.followButtonText,
              isFollowing ? styles.followingText : styles.notFollowingText,
            ]}
          >
            {isFollowing ? 'Siguiendo ✓' : 'Seguir +'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.messageButton} activeOpacity={0.8}>
          <Text style={styles.messageButtonText}>Mensaje</Text>
        </TouchableOpacity>
      </View>

      {/* Separador de pestañas de contenido */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tabItem, styles.tabActive]}>
          <Text style={styles.tabIcon}>🖼️ Publicaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIconMuted}>🏷️ Etiquetadas</Text>
        </TouchableOpacity>
      </View>

      {/* Cuadrícula de fotos */}
      <View style={styles.gridContainer}>
        {gridImages.map((uri, idx) => (
          <Image key={idx} source={{ uri }} style={styles.gridImage} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  topUsername: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  settingsIcon: {
    padding: 4,
  },
  iconText: {
    fontSize: 18,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 10,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarImage: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 16,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  bioSection: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  fullName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  bioText: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 6,
    lineHeight: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 18,
    gap: 10,
  },
  followButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFollowingButton: {
    backgroundColor: Colors.primary,
  },
  followingButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  notFollowingText: {
    color: '#FFFFFF',
  },
  followingText: {
    color: Colors.textMuted,
  },
  messageButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageButtonText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  tabBar: {
    flexDirection: 'row',
    marginTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.cardBorder,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabIcon: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  tabIconMuted: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 6,
    gap: 6,
  },
  gridImage: {
    width: '31.8%',
    aspectRatio: 1,
    borderRadius: 6,
    backgroundColor: Colors.cardBackground,
  },
});
