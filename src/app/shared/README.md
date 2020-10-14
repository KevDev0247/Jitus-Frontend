# ShareModule

**Must** include definition：

+ Application shared modules

**Must** export all shared modules

**Must Not** contain `providers` properties

## Custom module or command

Every module must have a clear documentation. A reasonable structure should look like this:

```
├── components
│   ├── comp1
│   │   ├── index.ts
│   │   ├── README.md
│   ├── comp2
│   │   ├── index.ts
│   │   ├── README.md
├── directives
│   ├── dire1
│   │   ├── index.ts
│   │   ├── README.md
│   ├── dire2
│   │   ├── index.ts
│   │   ├── README.md
```
