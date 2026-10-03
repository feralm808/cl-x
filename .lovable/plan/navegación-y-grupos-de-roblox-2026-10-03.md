# Navegación y grupos de Roblox

## Resultado
- Mantener el perfil de Classix, pero dejar únicamente la etiqueta **Contenido**.
- Añadir una navegación centrada arriba con tres categorías: **Inicio**, **Grupos** y **Juegos**.
- Hacer que cada categoría cambie el contenido principal sin recargar la página.

## Contenido de cada categoría
- **Inicio:** mostrar un mensaje de bienvenida que presente a la comunidad como una comunidad unida de creadores de contenido de Roblox, acompañado del perfil existente.
- **Grupos:** mostrar inicialmente el grupo de Roblox con ID `70474731` en una tarjeta con su imagen, nombre y número actual de miembros.
- La tarjeta completa del grupo abrirá su página oficial de Roblox en una pestaña nueva.
- **Juegos:** dejar una vista preparada y vacía hasta que se proporcionen los juegos que deben aparecer.

## Datos reales de Roblox
- Consultar desde el servidor la información pública del grupo y su miniatura usando las APIs oficiales de Roblox.
- Actualizar esos datos automáticamente cada 15 minutos y conservar una presentación estable si Roblox responde temporalmente con error.
- Preparar la lista de IDs para que añadir más grupos después sea sencillo y use el mismo flujo automático.

## Diseño y comprobación
- Conservar el estilo nocturno y glassmorphism actual, adaptándolo a una página más amplia y legible en computadora y móvil.
- Comprobar la navegación, los datos del grupo, el enlace oficial, la carga del avatar y la adaptación móvil.
