import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import { User } from '../types';
import { MOCK_USERS } from '../data/mockData';
import { Colors } from '../theme/colors';

export const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [usersList, setUsersList] = useState<User[]>(MOCK_USERS);

  // Filtrado reactivo optimizado con useMemo
  const filteredUsers = useMemo(() => {
    const cleanQuery = searchQuery.trim().toLowerCase();
    if (!cleanQuery) return usersList;

    return usersList.filter(
      (user) =>
        user.fullName.toLowerCase().includes(cleanQuery) ||
        user.username.toLowerCase().includes(cleanQuery)
    );
  }, [searchQuery, usersList]);

  // Manejo de toggle de seguimiento por usuario en resultados
  const handleToggleFollow = (userId: string) => {
    setUsersList((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          const isFollowing = !user.isFollowing;
          return {
            ...user,
            isFollowing,
            followersCount: isFollowing ? user.followersCount + 1 : user.followersCount - 1,
          };
        }
        return user;
      })
    );
  };

  const renderUserItem = ({ item }: ListRenderItemInfo<User>) => (
    <View style={styles.userCard}>
      <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.fullName}>{item.fullName}</Text>
        <Text style={styles.username}>@{item.username}</Text>
        {item.bio && (
          <Text style={styles.bioSnippet} numberOfLines={1}>
            {item.bio}
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={[
          styles.followBtn,
          item.isFollowing ? styles.followingBtn : styles.notFollowingBtn,
        ]}
        onPress={() => handleToggleFollow(item.id)}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.followBtnText,
            item.isFollowing ? styles.followingBtnText : styles.notFollowingBtnText,
          ]}
        >
          {item.isFollowing ? 'Siguiendo' : 'Seguir'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Barra de Búsqueda */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre o @usuario..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
              <Text style={styles.clearBtnText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Contador de resultados */}
      <View style={styles.resultsInfoRow}>
        <Text style={styles.resultsInfoText}>
          {searchQuery
            ? `Resultados encontrados (${filteredUsers.length})`
            : 'Sugerencias para ti'}
        </Text>
      </View>

      {/* Lista de Usuarios Filtrados */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={renderUserItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>👤</Text>
            <Text style={styles.emptyTitle}>No se encontraron usuarios</Text>
            <Text style={styles.emptySubtitle}>
              Intenta buscar con otro nombre o nombre de usuario.
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchHeader: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: Colors.text,
    fontSize: 15,
    paddingVertical: 12,
  },
  clearBtn: {
    padding: 6,
  },
  clearBtnText: {
    color: Colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
  },
  resultsInfoRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  resultsInfoText: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  fullName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  username: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  bioSnippet: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 4,
  },
  followBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  notFollowingBtn: {
    backgroundColor: Colors.primary,
  },
  followingBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  followBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  notFollowingBtnText: {
    color: '#FFFFFF',
  },
  followingBtnText: {
    color: Colors.textMuted,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyIcon: {
    fontSize: 42,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
});
