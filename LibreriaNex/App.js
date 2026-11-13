import { useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SesionContext } from './src/sesion';
import Login from './src/pantalla/login';
import Registro from './src/pantallas/Registro';
import { colores } from './src/tema';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Pantallas provisionales; las construimos en la fase 2
const Pendiente = ({ route }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colores.fondo }}>
    <Text style={{ color: colores.texto, fontSize: 18 }}>{route.name}</Text>
  </View>
);

function Tabs() {
  const iconos = {
    Inicio: 'home-outline',
    Libros: 'book-outline',
    Favoritos: 'heart-outline',
    Perfil: 'person-circle-outline',
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colores.cafe,
        tabBarInactiveTintColor: colores.texto,
        tabBarStyle: { backgroundColor: colores.fondo },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={iconos[route.name]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Inicio" component={Pendiente} />
      <Tab.Screen name="Libros" component={Pendiente} />
      <Tab.Screen name="Favoritos" component={Pendiente} />
      <Tab.Screen name="Perfil" component={Pendiente} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [usuario, setUsuario] = useState(null);

  return (
    <SesionContext.Provider value={{ usuario, setUsuario }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {usuario ? (
            <Stack.Screen name="Tabs" component={Tabs} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Registro" component={Registro} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SesionContext.Provider>
  );
}