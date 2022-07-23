# SEKTA Discord bot
I started developing this bot for my friend's discord server. He needed a bot to organize people from his Lost Ark guild. Unfortunately he stopped playing so the bot lost its purpose before it was finished developing.

### This project is abandoned and will not be further updated. Feel free to use this code as a template for your discord bot.


# Developing
If you wish to start using this code as a base for your bot here are a few steps to get you started.

### Clone the repository
### Install necessary npm packages
Run
```
npm install
```
In the bots directory.
### Create .env file
**.env's** template is inside the **.env.d.ts** file

*SEKTA - discord guild id for slash commands*

*DATABASEURL - you can use it inside **mikro-config.ts** or fill it manually*

### Configure you database connection
This bot is using MikroORM to connect to external database. Configure your connection inside **mikro-config.ts**.

### Start the TS watcher
```
yarn watch
```
### Start the bot with nodemon using
Open new terminal and run
```
yarn dev
```

# Deploying slash commands
To deploy a Slash Command to discord fill commented places with token, application id and guild id inside the **Slash-Commands-Deployer.ts**. Then run
```
yarn deploy
```
# Creating migrations
Remember to add new Entities to "entities: []" inside **mikro-config.ts** before creating new migrations.

To create new migration simply run 
```
yarn create:migration
```
After that start the bot. Migrations are automatically pushed everytime bot is starting.

# Deploying the bot
I used Docker to deploy this bot to my Raspberry Pi. Feel free to use any method you like.
