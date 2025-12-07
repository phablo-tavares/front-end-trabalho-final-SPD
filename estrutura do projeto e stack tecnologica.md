## 🛠 Stack Tecnológica

* **Core & Build:**
    * React (via Vite)
    * JavaScript (ES6+)

* **UI & Estilização:**
    * Material UI (MUI) v5 (Componentes prontos para agilidade)
    * React Icons (Ícones para interface)

* **Navegação & Integração:**
    * React Router Dom v6 (Rotas públicas e privadas)
    * Axios (Cliente HTTP para integração com Backend)

* **Gerenciamento de Estado & Formulários:**
    * React Context API (Gerenciamento global de Autenticação)
    * React Hook Form (Validação rápida de formulários)
    * React-Toastify (Feedback visual de erros/sucesso)

* **Utilitários:**
    * file-saver

---

## 📂 Arquitetura de Pastas

```text
src/
├── assets/                  # Imagens estáticas e estilos globais
├── components/              # Componentes reutilizáveis
│   ├── Layout/              # Navbar, Footer, Container principal
│   └── Shared/              # Cards, Modais, Inputs genéricos
├── pages/                   # Telas da aplicação
│   ├── Auth/
│   ├── Home/
│   ├── PontosTuristicos/
│   └── Admin/
├── routes/
│   └── AppRoutes.jsx        # Definição das rotas (Public vs Private)
├── utils/
├── App.jsx                  # Ponto de entrada principal
└── main.jsx                 # Renderização do React