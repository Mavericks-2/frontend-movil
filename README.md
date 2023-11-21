# ShelfMate Fontend - Móvil

## Equipo 1 - CEM
Integrantes: 
* A01751655 Cortés Olvera Gabriela 
* A01745865 García Gómez José Ángel 
* A01745096 González de la Parra Pablo 
* A01751580 Islas Montiel Zaide
* A01745371 Sánchez Bahnsen Elisa
* A01382889 Ana Martínez Barbosa
* A01706870 José María Ibarra Pérez
* A01745158 García Sánchez Erika Marlene

## Tecnologías utilizadas
* [React JS](https://reactjs.org/) - v17.0.2
* [React Native](https://reactnative.dev/) - v0.72.5
* [Expo](https://expo.dev/) - v49.0.13

## Requisitos del sistema
* [Node JS](https://nodejs.org/es/)  - v18.15.0
* [NPM](https://www.npmjs.com/) - v10.1.0
* [Git](https://git-scm.com/)
* [ShelfMate Node Backend](https://github.com/Mavericks-2/backend)
* [ShelfMate Flask Backend](https://github.com/Mavericks-2/model)
* Variables de entorno:
  * EXPO_PUBLIC_API_BASE_URL
  * EXPO_PUBLIC_MODEL_BASE_URL

## Instalación
1. Clonar el repositorio
```bash
git clone git@github.com:Mavericks-2/frontend-movil.git
```
2. Instalar las dependencias
```bash
npm install
```
3. Instalar globalmente Expo
```bash
npm install --global expo-cli
```
4. Correr el proyecto
```bash
npm expo start
```
5. Abrir la aplicación de Expo en el dispositivo móvil y escanear el código QR que se muestra en la terminal.

## Manual de usuario
### Diseño de pantallas
* [Figma](https://www.figma.com/file/GF0BDovG2IA125hhiF1YNs/Oxxo-Mobile-App?type=design&node-id=0%3A1&mode=design&t=k7hQlTUJ4rVCwzgI-1)

### Funcionalidades
* Onboarding
* Registro de usuario 
* Inicio de sesión
* Visualizar planograma actual
* Evaluar planograma
* Retroalimentación de planograma
* Datos de la cuenta

### Onboarding

#### Para ubicar la pantalla de onboarding:
* Se deberá de abrir la aplicación de ShelfMate en el dispositivo móvil.

#### Para avanzar en el onboarding:
* Se deberá de dar click en el botón de "Siguiente" para avanzar a la siguiente pantalla.
* Se deberá dar swipe hacia la izquierda para avanzar a la siguiente pantalla.
* Se deberá dar swipe hacia la derecha para regresar a la pantalla anterior.

#### Para salir del onboarding:
* Se deberá de dar click en el botón de "Comenzar" para ir a la pantalla de registro.

### Registro de usuario

#### Para ubicar la pantalla de registro:
* En la pantalla de "onboarding", se deberá de dar click en el botón de "Comenzar" para ir a la pantalla de registro.
* En la pantalla de "inicio de sesión", se deberá de dar click en el botón de "Registrarse" para ir a la pantalla de registro.

#### Para registrarse:
* Se debe de ingresar un correo electrónico válido.
* Se debe de ingresar una contraseña de mínimo 8 caracteres, 1 caracter especial, 1 número y 1 letra mayúscula.
* Se deberá ingresar un nombre.
* Se deberá ingresar un apellido.
* Una vez registrados, se deberá de confirmar el correo electrónico ingresando un código el cual se enviará al correo electrónico previamente ingresado.
* Si el código es incorrecto, se mantendrá en la misma pantalla de registro.
* Si el código es correcto, se redirigirá a la pantalla principal.

#### Para salir de la pantalla de registro:
* Se deberá de dar swipe hacia la derecha para regresar a la pantalla anterior.


### Inicio de sesión

#### Para ubicar la pantalla de inicio de sesión:
* En la pantalla de "onboarding", se deberá de dar click en el botón de "Comenzar" para ir a la pantalla de inicio de sesión.
* En la pantalla de "registro", se deberá de dar swipe hacia la derecha para regresar a la pantalla anterior.

#### Para iniciar sesión:
* Se debe de ingresar un correo electrónico válido.
* Se debe de ingresar una contraseña de mínimo 8 caracteres, 1 caracter especial, 1 número y 1 letra mayúscula.
* En caso de que el correo electrónico o la contraseña sean incorrectos, se mantendrá en la misma pantalla de inicio de sesión.
* En caso de que las credenciales sean correctas, se redirigirá a la pantalla principal.

#### Para salir de la pantalla de inicio de sesión:
* Se deberá de dar click en el botón de "Registrarse" para ir a la pantalla de registro.
* Se deberá de dar swipe hacia la derecha para regresar a la pantalla de "onboarding".

### Visualizar planograma actual

#### Para ubicar la pantalla de visualizar planograma actual:
* En la pantalla de "inicio de sesión", se deberá de dar click en el botón de "Iniciar sesión" para ir a la pantalla principal.
* En la pantalla de "Evalua tu planograma", se deberá de dar click en el botón de "Planograma actual".
* En la pantalla de "Retroalimentación", se deberá de dar click en el botón de "Planograma actual".
* En la pantalla de "Cuenta", se deberá de dar click en el botón de "Inspector" dentro de la barra de navegación inferior.

#### Para visualizar el planograma actual:
* El administrador deberá de haber subido un planograma previamente.
* En caso de que no haya un planograma actual, se mostrará un mensaje indicando que no hay un planograma registrado.

#### Para salir de la pantalla de visualizar planograma actual:
* Se deberá de dar click en el botón de "Evalua tu planograma" para ir a la pantalla de "Evalua tu planograma".
* Se deberá de dar click en el botón de "Retroalimentación" para ir a la pantalla de "Retroalimentación".
* Se deberá de dar click en el botón de "Cuenta" para ir a la pantalla de "Cuenta".

### Evaluar planograma

#### Para ubicar la pantalla de evaluar planograma:
* Para poder evaluar el planograma, el administrador deberá de haber subido un planograma previamente.
* En la pantalla de "inicio de sesión", se deberá de dar click en el botón de "Iniciar sesión" para ir a la pantalla principal, y posteriormente se deberá de dar click en el botón de "Evalua tu planograma".
* En la pantalla de "Retroalimentación", se deberá de dar click en el botón de "Evalua tu planograma".
* En la pantalla de "Cuenta", se deberá de dar click en el botón de "Inspector" dentro de la barra de navegación inferior, y posteriormente se deberá de dar click en el botón de "Evalua tu planograma".

#### Para evaluar el planograma:
* Se deberá de tomar una fotografía del planograma actual, asegurándose de que los productos se encuentren en el mismo lugar que en el planograma.
* Al tomar la fotografía, se deberá de dar click en el botón de "Retroalimentación" para que se muestre la evaluación del planograma.

#### Para salir de la pantalla de evaluar planograma:
* Se deberá de dar click en el botón de "Planograma actual" para ir a la pantalla de "Planograma actual".
* Se deberá de dar click en el botón de "Retroalimentación" para ir a la pantalla de "Retroalimentación".
* Se deberá de dar click en el botón de "Cuenta" para ir a la pantalla de "Cuenta".

### Retroalimentación de planograma

#### Para ubicar la pantalla de retroalimentación:
* Para poder evaluar el planograma, el administrador deberá de haber subido un planograma previamente.
* En la pantalla de "inicio de sesión", se deberá de dar click en el botón de "Iniciar sesión" para ir a la pantalla principal, posciionarse en la pestaña de "Evalua tu planograma", tomar una fotografía del planograma actual y posteriormente se deberá de dar click en el botón de "Retroalimentación".
* En la pantalla de "Cuenta", se deberá de dar click en el botón de "Inspector" dentro de la barra de navegación inferior, y posteriormente se deberá de dar click en el botón de "Evalua tu planograma", tomar una fotografía del planograma actual y posteriormente se deberá de dar click en el botón de "Retroalimentación".
* En la pantalla de "Planograma actual", se deberá de dar click en el botón de "Evalua tu planograma", tomar una fotografía del planograma actual y posteriormente se deberá de dar click en el botón de "Retroalimentación".
* En la pantalla de "Evalua tu planograma", se deberá tomar una fotografía del planograma actual y posteriormente se deberá de dar click en el botón de "Retroalimentación".

#### Para visualizar la retroalimentación:
* Se deberá de tomar una fotografía del planograma actual, asegurándose de que los productos se encuentren en el mismo lugar que en el planograma.
* Al tomar la fotografía, se deberá de dar click en el botón de "Retroalimentación" para que se muestre la evaluación del planograma.
* En caso de que se identifiquen productos mal colocados, se deberá de corregir la posición de los productos, e ir marcando los productos que se vayan corrigiendo, una vez que se hayan corregido todos los productos, se deberá de dar click en el botón de "Evaluar nuevamente" para que se vuelva a tomar una fotografía del planograma actual y se muestre la evaluación del planograma.
* En caso de que todos los productos se encuentren en la posición correcta, se mostrará una pantalla indicando que el planograma se encuentra correcto.

#### Para salir de la pantalla de retroalimentación:
* Se deberá de dar click en el botón de "Planograma actual" para ir a la pantalla de "Planograma actual".
* Se deberá de dar click en el botón de "Evalua tu planograma" para ir a la pantalla de "Evalua tu planograma".
* Se deberá de dar click en el botón de "Cuenta" para ir a la pantalla de "Cuenta".

### Datos de la cuenta

#### Para ubicar la pantalla de datos de la cuenta:
* En la pantalla de "inicio de sesión", se deberá de dar click en el botón de "Iniciar sesión" para ir a la pantalla principal, y posteriormente se deberá de dar click en el botón de "Cuenta".
* En la pantalla de "Evalua tu planograma", se deberá de dar click en el botón de "Cuenta".
* En la pantalla de "Retroalimentación", se deberá de dar click en el botón de "Cuenta".
* En la pantalla de "Planograma actual", se deberá de dar click en el botón de "Cuenta".

#### Para visualizar los datos de la cuenta:
* Se deberá de mostrar el nombre del usuario.
* Se deberá de mostrar el correo electrónico del usuario.
* Se deberá de mostrar metrícas de los planogramas evaluados por el usuario.
* Se tendrá un botón para cerrar sesión.

#### Para salir de la pantalla de datos de la cuenta:
* Se deberá de dar click en el botón de "Inspector" para ir a la pantalla de "Planograma actual".
* Se deberá de dar click en el botón de "Cerrar sesión" para ir a la pantalla de "inicio de sesión".