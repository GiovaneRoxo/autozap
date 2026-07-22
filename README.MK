# 🤖 AutoZap - Roteador de Atendimento para WhatsApp

O **AutoZap** é uma solução construída em Node.js para automatizar e orquestrar atendimentos via WhatsApp. Ele atua como um gateway inteligente, recebendo as mensagens dos clientes e roteando-as para os atendentes humanos disponíveis.

## ✨ Arquitetura e Funcionalidades

A aplicação foi desenhada com separação de responsabilidades (SRP) e princípios de Domain Driven Design (DDD) em sua estrutura central:

* **Gerenciamento de Sessão (`auth.js`):** Autenticação isolada e persistência de sessão para conexões estáveis.
* **Roteamento Inteligente (`domain/Attendant.js`):** Regras de negócio focadas na distribuição de clientes para a equipe de atendimento.
* **Persistência de Dados (`DatabaseService.js`):** Camada de serviço desacoplada para conexão com banco de dados e auditoria de conversas.
* **Alta Disponibilidade (`install_service.js`):** Scripts integrados para transformar a aplicação em um serviço nativo rodando em background (focado em ambientes Windows Server).

---

## 🚀 Como Configurar e Rodar

### Pré-requisitos
* Node.js v16 ou superior instalado.
* Acesso à internet para geração do QR Code do WhatsApp.

### Instalação

1. Clone o repositório:
```bash
git clone [https://github.com/SEU_USUARIO/autozap.git](https://github.com/SEU_USUARIO/autozap.git)
cd autozap
