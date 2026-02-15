# Calculadora de Propinas y Consumo

Este proyecto consiste en una aplicación web de utilidad desarrollada con la librería **React** y el entorno de desarrollo **Vite**. La aplicación simula un sistema de facturación para restaurantes que permite a los usuarios seleccionar platillos de un menú, visualizar su consumo en tiempo real, calcular propinas basadas en porcentajes predefinidos y obtener los totales finales a pagar.

## Tecnologías Principales
* **React JS:** Librería de JavaScript para la construcción de interfaces de usuario interactivas.
* **Vite:** Herramienta de construcción (build tool) para un entorno de desarrollo rápido y optimizado.
* **Tailwind CSS:** Framework de utilidad (utility-first) para el diseño de la interfaz y estilos responsivos.

## Implementación Técnica y Conceptos Clave
El desarrollo de esta aplicación se centró en la implementación de conceptos fundamentales de React, manipulación de estado y lógica de programación moderna:

### 1. Componentización y Props
La arquitectura del proyecto se basa en la división de la interfaz en componentes reutilizables y modulares (`MenuItem`, `OrderContents`, `OrderTotals`, `TipPercentageForm`). La comunicación entre estos componentes y el componente principal (`App.jsx`) se realiza mediante el paso de **Props** y funciones, manteniendo un flujo de datos unidireccional.

### 2. Renderizado Dinámico (Mapping)
Para la visualización del menú, se utilizó el método `.map()` de JavaScript. La aplicación itera sobre una base de datos local (arreglo de objetos en `db.js`) para generar dinámicamente los elementos de la interfaz. Esto permite que el menú sea escalable y fácil de mantener sin modificar la estructura del componente.

### 3. Gestión de Estado Complejo (useState)
La interactividad principal reside en el manejo del estado mediante el Hook `useState`. Se gestionan dos estados críticos:
* **Order (La Orden):** Un arreglo que almacena dinámicamente los objetos seleccionados, controlando qué ítems se han añadido y en qué cantidad.
* **Tip (Propina):** Un valor numérico que almacena el porcentaje de propina seleccionado por el usuario.

### 4. Estado Derivado y Memorización (useMemo)
Para optimizar el rendimiento y evitar cálculos innecesarios en cada renderizado, se implementó el Hook `useMemo`.
* **Cálculos Automáticos:** El subtotal, el monto de la propina y el total final no se almacenan en el estado; se calculan "al vuelo" basándose en el estado actual de la orden y la propina.
* **Eficiencia:** `useMemo` asegura que estos cálculos matemáticos solo se ejecuten cuando las dependencias (`order` o `tip`) cambien, mejorando la eficiencia de la aplicación.

### 5. Inmutabilidad en la Actualización del Estado
Se aplicaron principios de inmutabilidad para manipular el arreglo de la orden:
* **Agregar Items:** Se utiliza lógica para verificar si un artículo ya existe. Si existe, se crea una copia del arreglo y se actualiza solo la cantidad (evitando duplicados); si no, se agrega el nuevo objeto.
* **Eliminar Items:** Se utiliza el método `.filter()` para devolver un nuevo arreglo que excluye el elemento seleccionado, sin mutar el estado original directamente.
