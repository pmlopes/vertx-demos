#!/bin/bash

#docker run --name cassandra -d cassandra:2.2 \
#bash -c "sed -i 's/^start_rpc.*$/start_rpc: true/' /etc/cassandra/cassandra.yaml; /docker-entrypoint.sh -f"
#docker run -t -i --link cassandra -e CASSANDRA_NODES=cassandra -p 8090:8080 -e TEST_MODE=true  hawkular/hawkular bash

#docker stop cassandra
#docker rm -f cassandra

docker run -t -i -p 8090:8080 jboss/hawkular-aio
