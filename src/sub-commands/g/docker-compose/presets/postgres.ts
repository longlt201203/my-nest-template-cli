export default `

versions: '3.9
services:
  <%= projectName %>_db:
    image: postgres:14.13
    ports:
      - \${DB_PORT}:5432
    environment:
      POSTGRES_PASSWORD: \${DB_PASS}
      POSTGRES_DB: \${DB_NAME}
    volumes:
      - <%= projectName %>_db_vol:/var/lib/postgresql/data
    networks:
        - <%= projectName %>_net

networks:
  <%= projectName %>_net:
    name: <%= projectName %>_net
    driver: bridge

volumes:
  <%= projectName %>_db_vol:

`;
