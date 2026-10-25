# 📱 SocialApp Mobile (React Native + TypeScript)

Aplicación móvil de red social construida con **React Native**, **TypeScript** y **Expo**, con soporte nativo (iOS/Android) y responsivo para Web.

---

## 🚀 Características Principales

1. **Feed / Timeline Virtualizado**:
   - `FlatList` con optimizaciones de rendimiento (`removeClippedSubviews`, `windowSize`, `maxToRenderPerBatch`).
   - Botón interactivo de "Me gusta" con animación y contador dinámico.
   - Componentes memoizados con `React.memo` para evitar re-renderizados innecesarios.

2. **Perfil de Usuario**:
   - Fotografía de perfil con indicador de estado en línea.
   - Métricas en tiempo real (Publicaciones, Seguidores, Siguiendo).
   - Botón interactivo para alternar entre *Seguir* y *Siguiendo*.
   - Cuadrícula responsiva de publicaciones.

3. **Subida de Archivos Multimedia (Upload)**:
   - Formulario de publicación con vista previa de archivos.
   - Validación de negocio estricta: rechaza archivos multimedia superiores a **50 MB**.
   - Simulación de progreso de subida y retroalimentación de éxito/error.

4. **Chat & Mensajería en Tiempo Real**:
   - Burbujas de mensajes contextuales (propios y recibidos).
   - Autoscroll automático al recibir o enviar mensajes.
   - Bot interactivo que simula respuestas en tiempo real con indicador de "escribiendo...".

5. **Buscador de Usuarios**:
   - Barra de búsqueda con filtrado instantáneo por nombre y usuario (`@handle`).
   - Botón de limpieza rápida y estado vacío cuando no hay resultados.

---

## 🛠️ Tecnologías Utilizadas

- **React Native** & **Expo SDK 51**
- **TypeScript 5.3**
- **React Native Web** (previsualización web con mockup responsivo)
- **Cypress** (pruebas de rendimiento E2E)

---

## 💻 Instalación y Ejecución

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd <CARPETA>

# 2. Instalar dependencias
npm install

# 3. Iniciar la aplicación
npx expo start
```

### Opciones de visualización:
- Presiona **`w`** para abrir en navegador web.
- Presiona **`a`** para emulador Android o dispositivo USB.
- Escanea el código QR con **Expo Go** en tu smartphone.
