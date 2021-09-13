. ./setetcdenv.sh

DOWNLOAD_URL=${GITHUB_URL}

rm -f /tmp/etcd-${ETCD_VER}-linux-amd64.tar.gz
rm -rf $ETCD_BIN
mkdir -p $ETCD_BIN

curl -L ${DOWNLOAD_URL}/${ETCD_VER}/etcd-${ETCD_VER}-linux-amd64.tar.gz -o /tmp/etcd-${ETCD_VER}-linux-amd64.tar.gz

tar xzvf /tmp/etcd-${ETCD_VER}-linux-amd64.tar.gz -C $ETCD_BIN --strip-components=1

