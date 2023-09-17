echo "Starting deploy.sh"
export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh 

echo "Installing npm dependencies"
npm install --global pm2 
npm install --global next
cd /home/ubuntu/yosprecyclers.com && npm install --force


echo "Deleting old process"
pm2 delete yosp_prod_web

echo "Starting PM2"
cd /home/ubuntu/yosprecyclers.com/scripts && pm2 start ecosystem.json --only yosp_prod_web
