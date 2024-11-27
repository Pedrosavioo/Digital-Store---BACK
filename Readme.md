1. buildar o projeto
	```bash
	npx tsc
	```

2. criar banco de dados:
	- abrir terminal do container backend:
	```bash
		docker exec -it backend sh
	```
	
	- Aplicar comando para criar banco de dados:
	```bash
		npx sequelize db:create
	```

	- Criar tabelas usando migrations
	```bash
		npx sequelize db:migrate
	```

