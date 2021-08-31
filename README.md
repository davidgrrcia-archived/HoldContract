# HoldContract

# The development process of smart contract

First I start coding with the REMIX IDE [https://remix.ethereum.org/](https://remix.ethereum.org/) due to his simplicity and easy testing of what we expect the methods have to do.  

In this IDE also I have familiarized myself with all Solidity data types, functions, and how the ERC20 tokens work.  

In order to build an improved IERC20 contract with Hold functionality, I followed the solidity docs about [common patterns](https://docs.soliditylang.org/en/v0.4.24/common-patterns.html) and used them to restrict access only to the contract owner, which will be needed in removeHold function. 

The approach followed is to implement the functions in this order from simple to more complex: hold > holdFrom > executeHold > removeHold.

When I finish coding and testing in Remix the first I pass to the next. 

Also for the testability, I used a simple function balanceOnHoldOf to know if the contract works as expected.

I have extended an IERC20 basic implementation with 5 variables: contractOwner, balanceOnHold, holdSender, holdRecipient, and holdAmount. 

Finally, I test every function adding some fixes to the contract necessary restrictions using the "require" solidity reserved word. 

A possible improvement to this contract implementation would be to reduce the number of variables used relatives to Hold by using a "mapping inside mapping"

# Ganache Mnemonic

```jsx
electric gift gold bitter boring surface stumble swift peanut adult horse dish
```

# Deploy contracts

```jsx
cd app
```

```jsx
truffle deploy --reset --network development
```

# Interacting with endpoints in postman

## [http://localhost:8080/register](http://localhost:8080/register)

```jsx
{
    "username": "david",
    "address": "0xdF9DA57E040A46A67b594e3E8507F78401521F4F"
}
```

```jsx
{
    "username": "maria",
    "address": "0x42A5cFd91831206d28212CED3A68488b1065920d"
}
```

```jsx
{
    "username": "sergio",
    "address": "0x604f96801FaED7C7D0Ce446daC600B622BDC869C"
}
```

```jsx
{
    "username": "andrea",
    "address": "0x4A5F5a8EC06Ee4f3A569e2CA2DDcB1AF7484Dc1c"
}
```

## [http://localhost:8080/my-balance](http://localhost:8080/my-balance)

```jsx
{
    "username": "david"
}
```

## [http://localhost:8080/newGame](http://localhost:8080/newGame)

```jsx
{
    "game_id": "23",
    "owner_username": "david"
}
```

## [http://localhost:8080/joinGame](http://localhost:8080/joinGame)

```jsx
{
    "game_id": "23",
    "username": "maria"
}
```

```jsx
{
    "game_id": "23",
    "username": "sergio"
}
```

```jsx
{
    "game_id": "23",
    "username": "andrea"
}
```
## [http://localhost:8080/my-bets](http://localhost:8080/my-bets)

```jsx
{
    "username": "david"
}
```
