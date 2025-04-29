# pix-integration

### Clonar repositório
 ```
    git clone https://github.com/pvillor/pix-integration.git
  ```

### Entrar no projeto
 ```
    cd pix-integration
  ```

### Instalação de pacotes
  ```
    npm install
  ```

### Variáveis de ambiente 
- Crie um arquivo na raiz com o nome ".env" e coloque no conteúdo dele:
   ```
    NEXT_PUBLIC_URL="http://localhost:3000"

    DATABASE_URL="mysql://root:root@localhost:33066/pixintegration"
    
    CANVI_CLIENT_ID="105F0B108954FF"
    CANVI_PRIVATE_KEY="F7DD2108954105F0BF765DFFDB210C880101B4D107363F7DD2"
   ```

### Rodar Banco de dados em Docker
  ```
  docker-compose up -d
  ```

### Rodar migrations
  ```
    npx prisma migrate dev
  ```

Para garantir o funcionamento do banco de dados, rode o comando abaixo:
```
    npx prisma generate
  ```

### Rodar o site
```
  npm run dev
```

O app estará rodando [aqui](http://localhost:3000)
