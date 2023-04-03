const imutable = Object.freeze

const database = imutable({
  client: 'mysql2',
  connection: imutable({
    host: 'host_do_banco',
    port: 'porta_do_banco',
    user: 'usuario_do_banco',
    password: 'aqui_vai_a_senha_super_secreta',
    database: 'nome_do_banco'
  }),
  migrations: imutable({
    tableName: 'migrations',
  })
})

export default database
