# O que é uma API?

API é uma interface de aplicação que tem seu conceito bastante genérico. Pode ser uma interface entre sistemas, pode ser uma interface de biblioteca, etc...

Basicamente uma API abstrai informações do usuário e disponibiliza apenas as funcionalidades essenciais.

## REST APIs

REST **não é** um protocolo de rede. Não é necessário utilizar HTTP para implementar uma REST API.

REST API é uma API que se comporta com os princípios de projeto do REST (Representational State Transfer).

### Princípios do REST

1. **Uniform Tnterface**

1.1. Identificação do que é um recurso. Um recurso é qualquer objeto relevante para a regra de negócio.

1.2. Manipulação de recursos através de representações. O cliente não manipula os recursos do servidor diretamente.

1.3. Mensagens auto-descritivas. Cada mensagem (requisição e resposta) deve incluir informação suficiente para ser processada isoladamente por quem a recebeu. Cada mensagem deve conter o _media type_.

1.4. HATEOAS. Significa _Hypermedia as the Engine of Application State_. O objetivo dessa restrição é ajudar o cliente a consumir o serviço sem a necessidade de conhecimento prévio.

---

2. **Client/Server**

2.1. Define que deve ocorrer uma separação entre os serviços de cliente e servidor, podendo, inclusiver serem desenvolvidas em repositórios separados.

---

3. **_Stateless_**.

3.1. Toda requisição enviada ao servidor deve conter toda a informação necessária para o servidor compreender e completar a requisição.

3.2. O servidor não deve aproveitar nenhuma informação armazenada anteriormente.

3.3. Se houver a necessidade de armazenamento de estado, como sessão, esse estado deve ser mantido pelo cliente. Por exemplo, login em rede social: após o login, o servidor não armazena quem é o usuário, cada ação realizada pelo usuário deve ser identificada pelo mesmo.

---

4. **_Cacheable_**

4.1. Significa que o servidor pode marcar uma resposta como _cacheável_, o que implica que o usuário pode reutilizar a mesma resposta por determinado tempo, sem a necessidade de realizar novas requisições. Por exemplo: _timeline_ de uma rede social, é um recurso que não muda com muita frequência, então o servidor pode marcar essa resposta como cacheável e, então, o cliente reutiliza o mesmo recurso durante os próximos 5 minutos, por exemplo.

---

5. **_Layed System_**

5.1. O cliente não deve saber de nenhum detalhe da infraestrutura da API.

---

6. **_Code on demand_**

6.1. Este princípio é opcional.

6.2. O servidor pode enviar código ao cliente. Por exemplo: em uma resposta, o servidor envia um bloco de código ao cliente que, quando o cliente executar esse, um _pop-up_ é exibido.
