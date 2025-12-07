### Descrição do Projeto
É um sistema web de turismo para cadastro, busca e avaliação de pontos turísticos e hospedagens.

### 🗺️ Fluxo de Navegação Macro
O usuário navega publicamente para ver os cards dos pontos turísticos. Ao tentar interagir (avaliar, comentar ou cadastrar), ele é redirecionado para o Login.

**Barra de Navegação (Navbar) - Global**
* **Itens:** Logo, Home (Listagem), Criar Ponto (se logado), Painel de Dados (Export/Import), Login/Logout.
* **Comportamento:** O botão "Login" vira um menu de perfil/Logout quando o token existe no `localStorage`.

### 📱 Detalhamento das Telas

#### 1. Tela de Login e Registro 
* **Descrição:** Tela única com tabs ou duas telas separadas para entrada no sistema.
* **Nível de Acesso:** Público.
* **Componentes:**
    * Formulário de Login (Email/Senha).
    * Formulário de Registro (Nome, Email, Senha).
    * Feedback de erro 
* **Funcionalidades:**
    * validação de email válido
    * Redirecionar para a Home após sucesso.
* **Comportamento:** Ao registrar, já pode redirecionar para home.

#### 2. Tela Inicial / Listagem de Pontos (Home)
* **Descrição:** Exibe os cards dos pontos turísticos com paginação e filtros laterais ou superiores.
* **Nível de Acesso:** Público (Qualquer um vê).
* **Componentes:**
    * **Barra de Pesquisa:** Input de texto (busca por nome/descrição).
    * **Filtros:** Select ou Checkbox para Cidade, Nota Mínima (estrelas) e Categoria.
    * **Grid de Cards:** Cada card tem foto de capa, nome, nota média e cidade.
    * **Paginação:** Botões "Anterior" e "Próximo".

#### 3. Tela de Detalhes do Ponto Turístico
* **Descrição:** Exibe todas as informações de um ponto específico.
* **Nível de Acesso:** Público (Visualização) / Logado (Interação).
* **Componentes:**
    * **Cabeçalho:** Nome, Descrição, Geolocalização (texto "Como chegar").
    * **Galeria de Fotos:** Carrossel ou Grid.
    * **Hospedagens:** Lista simples (Nome, Preço, Link).
    * **Avaliações (Ratings):** Média (estrelas grandes) + Botão "Avaliar".
    * **Comentários:** Lista cronológica + Input de novo comentário.
* **Funcionalidades:**
    * **Botão "Avaliar":** Abre modal. Só funciona se logado. Verifica se usuário já avaliou.
    * **Botão "Comentar":** Envia POST para MongoDB.
    * **Botão "Upload de Foto":** Input file para enviar foto (MultipartFile).
* **Comportamento:** Se o usuário não logado tentar comentar/avaliar, redirecionar para Login.

#### 4. Tela de Cadastro/Edição de Ponto (Admin/User)
* **Descrição:** Formulário para criar ou editar um ponto turístico.
* **Nível de Acesso:** Logado (Admin/User).
* **Componentes:**
    * Inputs de Texto: Nome, Descrição, Endereço.
    * Select: Cidade/Estado (Brasil).
* **Funcionalidades:**
    * Validação básica (campos obrigatórios).
    * Feedback de sucesso ("Ponto criado com sucesso").

#### 5. Painel de Integração (Importar/Exportar)
* **Descrição:** Uma área administrativa simples para lidar com arquivos em lote.
* **Nível de Acesso:** Logado (Admin).
* **Componentes:**
    * **Seção Exportar:** 3 Botões grandes (Exportar JSON, Exportar CSV, Exportar XML).
    * **Seção Importar:** Input `type="file"` + Botão "Enviar Arquivo".