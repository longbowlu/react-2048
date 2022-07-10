## [Sui-2048](https://https://github.com/longbowlu/sui-2048)

A 2048 game built on top of [Sui Blockchain](https://sui.io/). A tile merge generates an smart contract transaction and creates an NFT on the Sui Blockchain. The transaction digests listed on the bottom table take you to the transaction details page on [Sui Explorer](https://explorer.devnet.sui.io/).

Use "Smash" mode to simulate random arrow keys and commit transactions on Sui consecutively (so yes, it may act as a mini Sui load generator.)

A fork of [kwrush's react-2048](https://github.com/kwrush/react-2048).

### Demo
[Demo](https://longbowlu.github.io/sui-2048)

### Dev

```shell
$ npm install
$ npm start
$ # you may need to relink @mysten/sui.js if there are SDK changes
# npm link @mysten/sui.js
# open http://localhost:3000
```

You can also access the local development server from mobile

```shell
$ npm install
$ npm run start:host
# open http://${your_computer_ip}:3000, for exmaple http://192.168.0.1:3000
```

#### Deploy to Github Pages
Follow [this instruction](https://github.com/gitname/react-gh-pages) to set up environment.

Run `npm rum deploy` to build and publish.

### Liscense

MIT
