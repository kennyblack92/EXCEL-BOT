FROM quay.io/sampandey001/secktor
RUN git clone  https://github.com/kennyblack92/EXCEL-BOT /root/kennyblack92
WORKDIR /root/kennyblack92/
RUN npm install npm@latest
RUN yarn install --network-concurrency 1
EXPOSE 8000
CMD ["npm", "start"]
