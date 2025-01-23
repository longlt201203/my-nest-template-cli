export default `

version: '3.9'
services:
  <%= projectName %>_mssql:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      ACCEPT_EULA: Y
      MSSQL_SA_PASSWORD: \${DB_PASS}
    ports:
      - \${DB_PORT}:1433
    volumes:
      - <%= projectName %>_db_vol:/var/opt/mssql
    networks:
      - <%= projectName %>_net

volumes:
  <%= projectName %>_db_vol:

networks:
  <%= projectName %>_net:
    name: <%= projectName %>_net
    driver: bridge

`;
