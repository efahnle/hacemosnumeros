# ¿Hacemos números?


`¿Hacemos números?` es una aplicación totalmente **gratuita** para dividir fácilmente los gastos de grupos y compartirlos por WhatsApp en un click. 

Esta aplicación busca resolver los gastos de una cena, un viaje o un regalo en el momento sin necesidad de tener una cuenta, bajar una aplicación o tener que pagar para hacerlo de manera cómoda.

## Funcionalidades
- Carga de gastos agrupados por juntadas
- Simplificar: función que elimina pagos intermedios
- Compartir en WhatsApp como texto en cualquier chat o grupo

> :warning: ¡Importante!

`Hacemos números` guarda todos los datos en tu browser / navegador de manera local. No utiliza base de datos ni usuarios, por lo que:
- Borrar las cookies perderá todas tus juntadas
- Entrar desde otro dispositivo o en modo incógnito no te permitirá ver juntadas anteriores. 

Para reportar un problema, mejora o sugerencia, podés abrir [una issue](https://github.com/efahnle/hacemosnumeros/issues/new).

## Desarrolladores y contribuciones

`Hacemos números` es un proyecto hecho con Next.js, React y TypeScript. No posee backend ni base de datos, la persistencia de los datos se realiza mediante el localStorage del browser. El objetivo es que sea lo más sencillo posible. 

### Ejecución local

Para levantar el proyecto de manera local:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

En [http://localhost:3000](http://localhost:3000) estará el sitio.

### Contribuciones

¡Las contribuciones son bienvenidas en cualquiera de sus formas! Algunas de las maneras en las que se puede contribuir:
- Reportar problemas o bugs: [Issue](https://github.com/efahnle/hacemosnumeros/issues/new)
- Reportar mejoras o sugerencias: [Issue](https://github.com/efahnle/hacemosnumeros/issues/new)
- Corregir o agregar funcionalidades nuevas:
1. Crear una branch con el nombre `feature-<nombre>` o `fix-<nombre>` partiendo desde `main`, dependiendo si es un nuevo feature o una corrección.
2. Realizar los cambios.
3. Verificar un buen funcionamiento de la aplicación completa y sobre todo en los componentes que se están modificando.
4. Ejecutar la suite de pruebas `npm test` y de ser necesario, agregar nuevos casos de prueba bajo el directorio `__tests__`.
5. Crear un [pull request](https://github.com/efahnle/hacemosnumeros/compare) de esa branch contra `main`para su revisión. Cuánto más completo esté el mismo, más fácil será su revision. Dejar evidencia de, cómo mínimo, la ejecución de los tests indicada en el paso anterior.
6. Mencionarme (@efahnle) para que revise y haga el merge.

