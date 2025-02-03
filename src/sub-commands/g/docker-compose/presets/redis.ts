export default `
versions: '3.9
services:
  <%= projectName %>_redis:
    image: redis:latest
    ports:
      - \${REDIS_PORT}:6379
    networks:
      - <%= projectName %>_net

  <%= projectName %>_redisinsight:
    image: redis/redisinsight:latest
    ports:
      - \${REDIS_INSIGHT_PORT}:5540
    networks:
      - <%= projectName %>_net

networks:
  <%= projectName %>_net:
    name: <%= projectName %>_net
    driver: bridge
`;
