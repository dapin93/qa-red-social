import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ListRenderItemInfo,
  Dimensions,
} from 'react-native';
import { Post } from '../types';
import { MOCK_POSTS } from '../data/mockData';
import { Colors } from '../theme/colors';

const { width } = Dimensions.get('window');

interface PostCardProps {
  post: Post;
  onToggleLike: (postId: string) => void;
}

// Subcomponente memoizado para evitar re-renderizados innecesarios en la lista virtualizada
const PostCard: React.FC<PostCardProps> = React.memo(({ post, onToggleLike }) => {
  return (
    <View style={styles.cardContainer}>
      {/* Header del Post */}
      <View style={styles.headerRow}>
        <Image source={{ uri: post.author.avatarUrl }} style={styles.avatar} />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{post.author.fullName}</Text>
          <Text style={styles.authorUsername}>@{post.author.username} • {post.createdAt}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreButtonText}>•••</Text>
        </TouchableOpacity>
      </View>

      {/* Multimedia del Post */}
      <Image
        source={{ uri: post.mediaUrl }}
        style={styles.postImage}
        resizeMode="cover"
      />

      {/* Acciones e Interacciones */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => onToggleLike(post.id)}
          activeOpacity={0.7}
        >
          <Text style={[styles.actionIcon, post.isLiked && styles.likedIcon]}>
            {post.isLiked ? '❤️' : '🤍'}
          </Text>
          <Text style={[styles.actionCount, post.isLiked && styles.likedText]}>
            {post.likesCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionCount}>{post.commentsCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
          <Text style={styles.actionIcon}>↗️</Text>
        </TouchableOpacity>
      </View>

      {/* Pie de foto / Caption */}
      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>
          <Text style={styles.captionAuthor}>{post.author.username} </Text>
          {post.caption}
        </Text>
      </View>
    </View>
  );
});

export const FeedScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

  // Manejador optimizado para toggle de 'Me gusta'
  const handleToggleLike = useCallback((postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likesCount: isLiked ? p.likesCount + 1 : p.likesCount - 1,
          };
        }
        return p;
      })
    );
  }, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Post>) => (
      <PostCard post={item} onToggleLike={handleToggleLike} />
    ),
    [handleToggleLike]
  );

  const keyExtractor = useCallback((item: Post) => item.id, []);

  return (
    <View style={styles.container}>
      <View style={styles.screenHeader}>
        <Text style={styles.appTitle}>Feed Social</Text>
        <TouchableOpacity style={styles.notificationBtn}>
          <Text style={styles.headerIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Lista virtualizada optimizada */}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        // Optimizaciones de rendimiento de FlatList
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: 0.5,
  },
  headerIcon: {
    fontSize: 20,
  },
  notificationBtn: {
    padding: 6,
  },
  listContent: {
    paddingBottom: 24,
  },
  cardContainer: {
    backgroundColor: Colors.cardBackground,
    marginBottom: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.cardBorder,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  authorUsername: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  moreButton: {
    padding: 6,
  },
  moreButtonText: {
    color: Colors.textMuted,
    fontSize: 16,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: Colors.inputBackground,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 16,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionIcon: {
    fontSize: 20,
  },
  likedIcon: {
    transform: [{ scale: 1.1 }],
  },
  actionCount: {
    color: Colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  likedText: {
    color: Colors.secondary,
  },
  captionContainer: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  captionAuthor: {
    fontWeight: '700',
    color: Colors.text,
  },
  captionText: {
    color: Colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
});
