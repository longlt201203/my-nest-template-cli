export default `

versions: '3.9
services:
  <%= projectName %>_zipkin:
    image: openzipkin/zipkin
    ports:
      - {ZIPKIN_PORT}:9411
    networks:
      - <%= projectName %>_net

networks:
  <%= projectName %>_net:
    name: <%= projectName %>_net
    driver: bridge

`;
