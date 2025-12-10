Projeto Final 
Instituto de Informática/UFG 
Disciplina: Software para Persistência de Dados 
Professor: Elias Ferreira 
Entrega: 
Data: 03 ou 10/12/2025 (Código + Vídeo de apresentação do projeto) 
Formato:  
● Código: link para o github 
● Vídeo de apresentação (10–20 min) - roteiro sugerido. 
■ Todos do grupo devem participar da apresentação. 
■ Explicar a interface do sistema: logar, cadastrar um ponto turístico, 
registrar uma avaliação, comentários e pesquisa.  
■ Informar a stack de tecnologia utilizada. 
■ Mostrar a implementação do cache e de algum outro tópico que julgar 
importante. 
Grupo: de 2 a 4 integrantes 
1. Grupo 1  
a. Aline Lima Martins Coelho 
b. Raquel Dias da Silva  
c. Taniele Rocha Madureira 
2. Grupo 2 
a. Aline Nunes  
b. Aline Ayumi 
3. Grupo 3 
a. Gabriel Borges Garcia 
b. João Vitor Alves dos Reis 
c. Mateus Henrique Gandi de Oliveira 
d. Aisha Neves de Andrade 
4. Grupo 4 
a. Ester Adaianne Oliveira Ferreira  
b. Pedro Paulo Oliveira Lopes  
5. Grupo 5 
a. Rafael Barbosa 
b. Isabella Oliveira 
c. Tayna Crisllen  
d. Phablo Tavares Paixão 
6. Grupo 6 
a. Arthur Nucada Félix de Souza 
b. Lucas Gabriel Nunes Alves 
c. Sophia Fernandes Magalhães Almeida 
d. Victor Martins Vieira 
e.  
7. Grupo 7 
a.  
Sistema Web sobre Turismo/Viagens 
Objetivo 
Construir um sistema web (backend + frontend) para cadastrar e consultar pontos turísticos, 
com suporte a: 
● CRUD de pontos turísticos (nome, descrição, localização, como chegar). 
● Upload de fotos por ponto turístico (armazenamento em disco). 
● Comentários e avaliações por usuários. 
● Informação de hospedagens. 
● Pesquisa com filtros (por cidade, avaliação, tipo). 
● Integração com banco relacional (dados estruturados) e NoSQL (ex.: comentários e 
fotos). 
Requisitos 
Funcionais (mínimos) 
● Autenticação básica de usuário (registro/login). 
● CRUD de pontos turísticos (admins ou usuários autorizados). 
● Visualização da lista de pontos com paginação e filtros. 
● Upload e listagem de fotos por ponto turístico. 
● Comentários e avaliações (1 a 5 estrelas) por usuário em cada ponto. 
● Cadastro de hospedagens relacionadas a um ponto (nome, endereço, preço médio). 
● Endpoint que retorna “como chegar” (lat/lng e texto) e opcionalmente integra com 
API de mapas. 
● Exportar/Importar dados: pontos turísticos, dando opção de escolha sobre o formato 
a ser utilizado, JSON, CSS ou XML. 
Não funcionais 
● Documentação (README) com instruções para executar localmente. 
● Persistência com PostgreSQL ou MySQL (relacional) + MongoDB (NoSQL) + Redis - 
sugerido. 
● Persistência com JPA (Hibernate) - sugerido; 
Tecnologias sugeridas 
Java, JPA, Hibernate, etc. 
Tomcat. 
Spring Boot, Spring Web, Spring Data JPA, Spring Security, Spring Data MongoDB, etc. 
Persistência:  
● PostgreSQL ou MySQL: entidades principais (PontosTuristicos, Usuários, 
Hospedagens, Avaliações agregadas, Reservas); 
● MongoDB: coleções para comentários e/ou fotos (metadados), ou para histórico; 
● Storage de fotos: local (filesystem); 
● Redis: para cache. 
Modelagem de dados  
Relacional 
Usuário 
● id (PK) 
● login 
● email 
● senha_hash 
● role (USER / ADMIN) 
● created_at 
PontoTuristico 
● id (PK) 
● nome 
● descricao 
● cidade 
● estado 
● pais 
● latitude (decimal) 
● longitude (decimal) 
● endereco 
● criado_por (FK, usuario.id) 
● created_at 
Observação: “Cidade/Estado/País” poderiam ser tabelas separadas - é opcional 
usá-las como campo ou tabelas separadas. 
Hospedagem 
● id (PK) 
● ponto_id (FK, PontoTuristico.id) 
● nome 
● endereco 
● telefone 
● preco_medio 
● tipo (hotel/pousada/hostel) 
● link_reserva (site: próprio, booking, hoteis.com, etc) 
Avaliacao 
● id (PK) 
● ponto_id (FK, PontoTuristico.id) 
● usuario_id (FK, usuario.id) 
● nota (int 1 a 5) 
● comentario (text)  //comentário explicando/justificando a nota 
● created_at 
 
Observação:  
● Se julgar necessário, a nota média do ponto turístico pode ser calculada e 
atualizada na tabela PontoTuristico sempre que uma nova nota for informada. 
● Comentários detalhados e fotos serão armazenados em MongoDB (NoSQL) 
como coleções flexíveis — útil para escalabilidade, consultas por texto e 
anexos. 
NoSQL 
Comentarios 
{ 
  "_id": ObjectId, 
  "pontoId": "<id_postgres>", 
  "usuarioId": "<id_postgres>", 
  "texto": "Muito bom para famílias...", 
  "createdAt": ISODate(), 
  "metadata": { "language":"pt", "device": "android" }, 
  "respostas": [ 
    { "usuarioId": 7, "texto": "Concordo!",  
  "data": "2025-11-04T11:00:00Z" } 
  ] 
} 
 
fotos 
{ 
  "_id": ObjectId, 
  "pontoId": "<id_postgres>", 
  "usuarioId": "<user>", 
  "filename": "praia1.jpg", 
  "titulo": "Vista ao pôr do sol", 
  "path": "/uploads/..", 
  "createdAt": ISODate() 
} 
 
Observação: as imagens não são gravadas diretamente no 
banco, iremos armazenar somente os metadados (nome do 
arquivo, URL) e deixá-las em disco. 
 
Regras do negócio 
As regras em cores claras devem ser avaliadas e, se julgar pertinentes, implementá-las. 
 
Categoria Regra 
Cadastro Um ponto turístico deve ter nome, cidade e descrição obrigatórios. 
Cadastro Cada cidade não pode ter dois pontos turísticos com o mesmo nome. 
Usuário E-mail do usuário deve ser único e validado. 
Avaliação O usuário só pode avaliar um ponto turístico uma vez, podendo editar 
depois. 
Avaliação A nota deve ser um número inteiro de 1 a 5. 
Comentário Comentários não podem ser vazios e devem ter no máximo 500 
caracteres. 
Avaliações O sistema calcula automaticamente a média de notas de cada ponto 
turístico. 
Fotos Cada ponto turístico pode ter até 10 fotos. 
Favoritos Usuário pode marcar pontos turísticos como “favoritos”. 
Comentários Exibir comentários mais recentes primeiro (ordenação por data). 
Localização Armazenar coordenadas (latitude/longitude) e permitir buscar pontos 
próximos. 
Recomendação O sistema deve recomendar pontos turísticos com base nas 
avaliações e localidade do usuário. 
Integração Sistema consome uma API externa (ex.: OpenWeather) para exibir 
previsão do tempo no local. 
Cache Dados de pontos turísticos mais acessados são armazenados em 
cache (ex.: Redis). 
Usuário Usuário deve estar autenticado para comentar ou avaliar. 
Usuário Usuário comum só pode editar/excluir seus próprios comentários. 
Usuário Usuário ADMIN pode excluir comentários de qualquer usuário. 
 
 
Critérios de Avaliação 
● Funcionalidades (40%) 
● Persistência (35%) 
● Qualidade do código (10%) 
● Apresentação (15%) 
Considerações 
1. O modelo de dados pode precisar de complementação, neste caso fica a cargo do 
grupo fazê-lo. 
2. Por padrão, as entradas de dados (CRUD, comentários, etc) só podem ser 
realizadas por usuários logados. 
3. Pesquisa por Pontos Turísticos, hospedagens, visualização de notas e comentários 
são públicos, ou seja, não precisa estar autenticado.