export type Tecnologia = { nombre:string; icono:string; color:string };
export type GrupoTecnologias = { nombre:string; descripcion:string; items:Tecnologia[] };
export const gruposTecnologias: GrupoTecnologias[] = [
  { nombre:'Desarrollo web', descripcion:'Interfaces, estructura y experiencias responsivas.', items:[
    {nombre:'HTML',icono:'html',color:'#e34f26'}, {nombre:'CSS',icono:'css',color:'#1572b6'}, {nombre:'JavaScript',icono:'javascript',color:'#f7df1e'}, {nombre:'TypeScript',icono:'typescript',color:'#3178c6'}, {nombre:'Astro',icono:'astro',color:'#ff5d01'}
  ]},
  { nombre:'Backend y datos', descripcion:'Lógica, persistencia y consultas para aplicaciones.', items:[
    {nombre:'PHP',icono:'php',color:'#777bb4'}, {nombre:'MySQL',icono:'mysql',color:'#4479a1'}, {nombre:'SQL',icono:'database',color:'#aeb2bc'}
  ]},
  { nombre:'Herramientas', descripcion:'Organización, versiones y comunicación visual.', items:[
    {nombre:'Git',icono:'git',color:'#f05032'}, {nombre:'GitHub',icono:'github',color:'#f1f0ed'}, {nombre:'Figma',icono:'figma',color:'#f24e1e'}
  ]}
];
