export default `
version: "3.9"
services:
  <%= projectName %>_mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: \${DB_PASS}
      MYSQL_DATABASE: \${DB_NAME}
    ports:
      - \${DB_PORT}:3306
    volumes:
      - <%= projectName %>_db_vol:/var/lib/mysql
    networks:
      - <%= projectName %>_net

networks:
  <%= projectName %>_net:
    name: <%= projectName %>_net
    driver: bridge

volumes:
  <%= projectName %>_db_vol:
`;
