import Web3 from "web3";
import tokenArtifact from "../../build/contracts/GeoCashFlow.json";
import "./styles.css";
import tokenABI from "./token-abi.json";

const App = {

  web3: null,
  account: null,
  meta: null,
  meta2: null,
  
  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = tokenArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        tokenArtifact.abi,
        deployedNetwork.address,
      );
      this.meta2 = new web3.eth.Contract(
        tokenABI,
        "0x5943F705aBb6834Cad767e6E4bB258Bc48D9C947",
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      this.refreshBalance();
      this.currentAddress();
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  currentAddress: async function() {
    const { balanceOf } = this.meta2.methods;
    const balance = await balanceOf(this.account).call();

    const balanceElement = document.getElementsByClassName("address")[0];
    balanceElement.innerHTML = balance;
  },

  refreshBalance: async function() {
    const { balanceOf } = this.meta2.methods;
    const balance = await balanceOf(this.account).call();

    const balanceElement = document.getElementsByClassName("balance")[0];
    balanceElement.innerHTML = balance;
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },

  upgradeEth: async function(amount) {
    try {
      const transactionHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: this.account,
            to: '0x5943F705aBb6834Cad767e6E4bB258Bc48D9C947', //SUPER Eth contract
            value: `${amount}000000000` //GWEI
          },
        ],
      });
      // Handle the result
      console.log(transactionHash);
      this.setStatus(transactionHash);
      this.getEthXBalance();
    } catch (error) {
      console.error(error);
    }
  },

  getEthXBalance: async function() {
    const { balanceOf } = this.meta2.methods;
    const ETHxBalance = await balanceOf(this.account).call();

    const balanceElement = document.getElementById("ethx-balance");
    balanceElement.innerHTML = ETHxBalance;
  }
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545"),
    );
  }
  geoFindMe();
  App.start();
});



function geoFindMe() {
  var output = document.getElementById("current-geolocation");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p><strong>Latitude</strong>: ' + latitude + '° <br><strong>Longitude</strong>: ' + longitude + '°</p>';

    /*var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);*/
  };

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  };

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}