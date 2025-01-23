export default `

version: "3.9"
services:
  db:
    image: mongo
    environment:
      MONGO_INITDB_ROOT_USERNAME: \${DB_USER}
      MONGO_INITDB_ROOT_PASSWORD: \${DB_PASS}
    ports:
      - \${DB_PORT}:27017
    volumes:
      - <%= projectName %>_db_vol:/data/db
    networks:
      - <%= projectName %>_net

networks:
  <%= projectName %>_net:
    name: <%= projectName %>_net
    driver: bridge

volumes:
  <%= projectName %>_db_vol:

`;
