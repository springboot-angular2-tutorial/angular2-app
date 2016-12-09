FROM nginx:alpine

ENV BUILD_PACKAGES .build-dependencies curl-dev ruby-dev build-base
ENV RUBY_PACKAGES ruby ruby-json

RUN apk update && \
    apk upgrade && \
    apk add --no-cache --virtual $BUILD_PACKAGES && \
    apk add --no-cache $RUBY_PACKAGES && \
    apk del .build-dependencies

COPY docker/default.conf /etc/nginx/conf.d

ADD dist /usr/share/nginx/html

WORKDIR /tmp

COPY docker/index.html.erb .
COPY docker/render_template.rb .
COPY dist/manifest.json .

CMD ruby render_template.rb > /usr/share/nginx/html/index.html && \
  nginx -g 'daemon off;'

