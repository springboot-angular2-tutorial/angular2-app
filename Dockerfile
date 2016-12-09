FROM nginx:alpine

COPY docker/default.conf /etc/nginx/conf.d

ADD dist /usr/share/nginx/html
