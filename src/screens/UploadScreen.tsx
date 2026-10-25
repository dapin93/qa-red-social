import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { UploadFile } from '../types';
import { Colors } from '../theme/colors';

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const UploadScreen: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<UploadFile | null>(null);
  const [caption, setCaption] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Validador de archivos según el requerimiento de negocio (< 50MB)
  const validateAndSetFile = (file: UploadFile) => {
    setUploadSuccess(false);
    if (file.fileSizeInBytes > MAX_FILE_SIZE_BYTES) {
      const sizeInMB = (file.fileSizeInBytes / (1024 * 1024)).toFixed(1);
      setErrorMessage(
        `El archivo (${sizeInMB} MB) excede el límite máximo permitido de ${MAX_FILE_SIZE_MB} MB.`
      );
      setSelectedFile(null);
    } else {
      setErrorMessage(null);
      setSelectedFile(file);
    }
  };

  // Simulación de selección: Archivo Válido (14.2 MB)
  const handleSelectValidFile = () => {
    validateAndSetFile({
      uri: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      fileName: 'modern_art_render.png',
      fileSizeInBytes: 14.2 * 1024 * 1024,
      type: 'image',
    });
  };

  // Simulación de selección: Archivo Inválido / Excedido (68.4 MB > 50 MB)
  const handleSelectOversizedFile = () => {
    validateAndSetFile({
      uri: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      fileName: '4k_drone_video.mp4',
      fileSizeInBytes: 68.4 * 1024 * 1024,
      type: 'video',
    });
  };

  // Simulación de subida
  const handleUploadSubmit = () => {
    if (!selectedFile) {
      Alert.alert('Atención', 'Por favor selecciona un archivo multimedia primero.');
      return;
    }

    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      setSelectedFile(null);
      setCaption('');
      Alert.alert('¡Éxito!', 'Tu publicación ha sido subida correctamente.');
    }, 1800);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.screenTitle}>Nueva Publicación</Text>
      <Text style={styles.subtitle}>
        Comparte fotos o videos con tu comunidad (Máximo {MAX_FILE_SIZE_MB}MB)
      </Text>

      {/* Selector de Multimedia */}
      <View style={styles.pickerSection}>
        <Text style={styles.label}>Seleccionar Multimedia</Text>
        <View style={styles.pickerButtonsRow}>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={handleSelectValidFile}
            activeOpacity={0.8}
          >
            <Text style={styles.pickerButtonIcon}>🖼️</Text>
            <Text style={styles.pickerButtonText}>Foto Válida</Text>
            <Text style={styles.pickerButtonSub}>(~14 MB)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.pickerButton, styles.pickerButtonWarning]}
            onPress={handleSelectOversizedFile}
            activeOpacity={0.8}
          >
            <Text style={styles.pickerButtonIcon}>🎥</Text>
            <Text style={styles.pickerButtonText}>Video Pesado</Text>
            <Text style={styles.pickerButtonSub}>(~68 MB - Rechazará)</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Banner de Error de Validación */}
      {errorMessage && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <View style={styles.errorTextContainer}>
            <Text style={styles.errorTitle}>Archivo no permitido</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
        </View>
      )}

      {/* Vista previa del archivo seleccionado válido */}
      {selectedFile && (
        <View style={styles.previewCard}>
          <Image source={{ uri: selectedFile.uri }} style={styles.previewImage} />
          <View style={styles.fileDetails}>
            <Text style={styles.fileName} numberOfLines={1}>
              📄 {selectedFile.fileName}
            </Text>
            <Text style={styles.fileSize}>
              Peso: {(selectedFile.fileSizeInBytes / (1024 * 1024)).toFixed(2)} MB
            </Text>
            <View style={styles.badgeSuccess}>
              <Text style={styles.badgeSuccessText}>✓ Tamaño permitido (&lt; 50MB)</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => setSelectedFile(null)}
          >
            <Text style={styles.removeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Campo de Pie de Foto / Caption */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>Descripción / Caption</Text>
        <TextInput
          style={styles.captionInput}
          placeholder="Escribe un pie de foto emocionante..."
          placeholderTextColor={Colors.textMuted}
          multiline
          numberOfLines={4}
          value={caption}
          onChangeText={setCaption}
        />
      </View>

      {/* Botón de Publicar */}
      <TouchableOpacity
        style={[
          styles.submitButton,
          (!selectedFile || isUploading) && styles.submitButtonDisabled,
        ]}
        onPress={handleUploadSubmit}
        disabled={!selectedFile || isUploading}
        activeOpacity={0.85}
      >
        {isUploading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color="#FFFFFF" size="small" />
            <Text style={styles.submitButtonText}>Procesando y Subiendo...</Text>
          </View>
        ) : (
          <Text style={styles.submitButtonText}>Publicar Contenido</Text>
        )}
      </TouchableOpacity>

      {uploadSuccess && (
        <View style={styles.successBanner}>
          <Text style={styles.successBannerText}>
            🎉 ¡Publicación compartida con éxito en el Feed!
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 24,
  },
  pickerSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 10,
  },
  pickerButtonsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  pickerButton: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    borderWidth: 1.5,
    borderColor: Colors.cardBorder,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerButtonWarning: {
    borderColor: '#78350F',
  },
  pickerButtonIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  pickerButtonText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  pickerButtonSub: {
    color: Colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  errorBanner: {
    flexDirection: 'row',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: Colors.danger,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    alignItems: 'center',
  },
  errorIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  errorTextContainer: {
    flex: 1,
  },
  errorTitle: {
    color: Colors.danger,
    fontSize: 14,
    fontWeight: '700',
  },
  errorMessage: {
    color: '#FECACA',
    fontSize: 13,
    marginTop: 2,
    lineHeight: 18,
  },
  previewCard: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  previewImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: Colors.inputBackground,
  },
  fileDetails: {
    flex: 1,
    marginLeft: 12,
  },
  fileName: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  fileSize: {
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  badgeSuccess: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 6,
  },
  badgeSuccessText: {
    color: Colors.success,
    fontSize: 11,
    fontWeight: '700',
  },
  removeBtn: {
    padding: 8,
  },
  removeBtnText: {
    color: Colors.textMuted,
    fontSize: 16,
    fontWeight: '700',
  },
  inputSection: {
    marginBottom: 24,
  },
  captionInput: {
    backgroundColor: Colors.cardBackground,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    textAlignVertical: 'top',
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.45,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  successBanner: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    padding: 14,
    borderRadius: 12,
    marginTop: 18,
    borderWidth: 1,
    borderColor: Colors.success,
    alignItems: 'center',
  },
  successBannerText: {
    color: Colors.success,
    fontSize: 14,
    fontWeight: '700',
  },
});
