export interface Proyecto { nombre:string; repositorio:string; descripcion:string; tipo:string; lenguaje?:string }
export const destacados: Proyecto[] = [
 {nombre:'Nodo',repositorio:'nodo-web-platform',tipo:'Plataforma web',lenguaje:'TypeScript',descripcion:'Gestión y seguimiento de reparaciones para servicios técnicos.'},
 {nombre:'FormoStock',repositorio:'formostock-pos',tipo:'Sistema de gestión',lenguaje:'PHP',descripcion:'Punto de venta y gestión de stock para insumos informáticos.'},
 {nombre:'BeautySystem',repositorio:'beauty-system',tipo:'Sistema de gestión',lenguaje:'PHP',descripcion:'Administración de e-commerce para cosméticos.'},
 {nombre:'FastFoodSystem',repositorio:'fast-food-system',tipo:'Sistema gastronómico',lenguaje:'PHP',descripcion:'Control de stock y ventas gastronómicas.'},
 {nombre:'Jack Motos Formosa',repositorio:'jack-motos-fsa',tipo:'Landing page',lenguaje:'Astro',descripcion:'Demo para un comercio de repuestos de motos.'},
 {nombre:'Plena Salud y Belleza',repositorio:'plena-salud-belleza',tipo:'Sitio web',lenguaje:'HTML',descripcion:'Sitio para un centro de estética y cuidado personal.'},
 {nombre:'CR Belleza Integral',repositorio:'cr-belleza-integral',tipo:'Landing page',lenguaje:'HTML',descripcion:'Landing page responsive para un centro de estética de Formosa.'},
 {nombre:'Digital Visibility',repositorio:'digital_visibility_project',tipo:'Desarrollo web',lenguaje:'CSS',descripcion:'Proyecto de visibilidad digital y adquisición de clientes en Formosa.'}
];
