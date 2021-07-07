# Geo Payment Streams
Geolocation Payment Streams - An application that can open and close payment streaming channels, based on the user location.
This is project was created during [ETH Global Hackathon](https://showcase.ethglobal.co/hackmoney2021/geops).

**Demo Video**: 
<iframe width="560" height="315" src="https://www.youtube.com/embed/PM3CYstxX5o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Description
The aim of this project is to integrate the geolocation of the user with creating and managing payment streams. With this, the user is able to see open streams nearby and join them, for transferring value to creators.

For example, a street artist which is creating artwork in public, could use the Dapp for opening a first stream to them self, setting the minimum rate ETHx per sec, they consider their work value.
People who passes nearby and enjoys their artwork, could check if there is any stream open nearby for transferring value to this artist. As the artist would have open the 1st stream with their geolocation, this will appear on the streams list.

The user then can join this stream for transferring value to this artist and can cancel any time or when they leave the zone.

## Functionalities
- Get Geolocation using browser
- Upgrade ETH for ETHx Coins
- Start a new Stream
- List of Streams nearby (only frontend)
- Cancel current Streams
- Join existing Streams nearby

![](videos-demo/geops.png)

## How it's made
This project uses Superfluid as the corebase for its functionalities in the Ethereum environment. It uses Metamask for interacting with smart contracts. In further steps, ENS will be included for managing addresses.

The core functionality of streams is achieved by using Sueprfluid sdk, with functionalities such as create streams, getflow, getnetflow etc.

## Todo's
- Add Smart contract support for geo data
- Implement Google Maps Integration